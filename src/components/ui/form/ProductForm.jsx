import { onSnapshot, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../../configs/firebase.config";
import Editor from "../input/Editor";
import Input from "../input/Input";
import InputFile from "../input/InputFile";
import Select from "../input/Select";

const inputs = [
  {
    display: "Đường dẫn",
    placeholder: "Nhập đường dẫn",
    name: "slug",
    type: "text",
  },
  {
    display: "Tên sản phẩm",
    placeholder: "Nhập tên sản phẩm",
    name: "name",
    type: "text",
  },
  {
    display: "Tên khách hàng",
    placeholder: "Nhập tên khách hàng",
    name: "client",
    type: "text",
  },
  {
    display: "Tên designer",
    placeholder: "Nhập tên designer",
    name: "designer",
    type: "text",
  },
  {
    display: "Diện tích",
    placeholder: "Nhập diện tích",
    name: "area_size",
    type: "number",
  },
  {
    display: "Phong cách thiết kê",
    placeholder: "Nhập phong cách thiết kế",
    name: "style",
    type: "text",
  },
];
const descriptions = [
  {
    name: "yeuCauThietKe",
    display: "Yêu cầu thiết kế",
  },
  {
    name: "khongGianNoiThat",
    display: "Không gian nội thất",
  },
  {
    name: "camHungThietKe",
    display: "Cảm hứng thiết kế",
  },
  {
    name: "yKienKhachHang",
    display: "Ý kiến khách hàng",
  },
];

const handleAddProduct = (value) => {
  console.log(value);
};
const handleUpdateProduct = (value) => {};

const ProductForm = ({ type = "add" }) => {
  const { control, setValue, watch, handleSubmit } = useForm({
    mode: onchange,
  });
  const [projects, setProjects] = useState([]);
  const watchCateId = watch("cateId");
  const watchSlug = watch("slug");

  useEffect(() => {
    const projectRef = collection(db, "projects");

    onSnapshot(projectRef, (res) => {
      let temp = [];

      res.docs?.length > 0 &&
        res.docs.map((doc) => temp.push({ id: doc.id, ...doc.data() }));

      setProjects(temp);
    });
  }, []);
  useEffect(() => {
    if (watchCateId) {
      projects.map((project) => {
        if (project.id === watchCateId) {
          setValue("cateName", project.name);
        }
      });
    }
  }, [watchCateId]);

  const handleInputChange = (e) => {
    console.log(e.target.dataset.type);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(
          type === "add" ? handleAddProduct : handleUpdateProduct
        )}
      >
        <div className="grid grid-cols-2 gap-4 mb-4 grid-flow-row auto-rows-fr items-end">
          <Select name="cateId" control={control} display="Chọn danh mục">
            <option>Chọn dự án</option>
            {projects?.length > 0 &&
              projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
          </Select>
          {inputs?.length > 0 &&
            inputs.map((input) => (
              <Input
                key={input.display}
                placeholder={input.placeholder}
                name={input.name}
                control={control}
                display={input.display}
              />
            ))}
        </div>

        <div className="flex flex-col gap-6 mt-14">
          {descriptions?.length > 0 &&
            descriptions.map((desc) => (
              <div className="flex flex-col gap-4" key={desc.name}>
                <Editor
                  name={desc.name}
                  display={desc.display}
                  control={control}
                />
                {watchSlug && (
                  <InputFile
                    multiple
                    hiddenLabel
                    onChange={handleInputChange}
                    data-type={desc.name}
                  />
                )}
              </div>
            ))}
        </div>

        <div className="flex-center mt-8">
          <input
            type="submit"
            value={type === "add" ? "Thêm sản phẩm" : "Cập nhật sản phẩm"}
            className="btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default ProductForm;