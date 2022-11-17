import { onSnapshot, collection, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { db, storage } from "../../../configs/firebase.config";
import { useAddDoc, useUpdateDoc } from "../../../hooks/firesotre-hooks";
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

const ProductForm = ({ type = "add" }) => {
  const { control, setValue, watch, handleSubmit, getValues } = useForm({
    mode: onchange,
  });
  const { id } = type === "update" && useParams();

  // state
  const [projects, setProjects] = useState([]);
  const [images, setImages] = useState({});
  const [product, setProduct] = useState({});

  const watchCateId = watch("cateId");
  const watchSlug = watch("slug");

  // hooks custom
  const [handleAddDoc] = useAddDoc();
  const [handleUpdateDoc] = useUpdateDoc();

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
  useEffect(() => {
    if (type === "update" && id) {
      const productRef = doc(collection(db, "products"), id);

      onSnapshot(productRef, (res) =>
        setProduct({ id: res.id, ...res.data() })
      );
    }
  }, [id]);
  useEffect(() => {
    if (type === "update" && product) {
      for (const key in product) {
        setValue(key, product[key]);
      }
    }
  }, [product]);

  const handleInputChange = (e) => {
    const files = e.target.files;

    let tempImages = [];
    if (files?.length > 0) {
      [...files].map((file) => {
        const path = getValues("slug");
        const storageRef = ref(storage, `images/${path}/${file.name}`);
        uploadBytes(storageRef, file).then(async (snapshot) => {
          const downloadURL = await getDownloadURL(snapshot.ref);
          tempImages.push(downloadURL);
          setValue(`${e.target.dataset.type}Images`, tempImages);
          setImages({
            ...images,
            [e.target.dataset.type]: tempImages,
          });
        });
      });
    }
  };
  const handleAddProduct = (value) => {
    handleAddDoc("products", value);
  };
  const handleUpdateProduct = (value) => {
    const updateData = {
      path: "products",
      id,
      data: value,
    };

    handleUpdateDoc(updateData);
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
                disabled={type === "update" && input.name === "slug"}
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
                <div className="grid grid-cols-3 gap-4 w-full py-4 grid-flow-row auto-rows-fr relative duration-300 origin-top">
                  {images[desc.name]?.map((img) => (
                    <div
                      key={img}
                      className="w-full h-full aspect-video overflow-hidden"
                    >
                      <img src={img} alt="" />
                    </div>
                  ))}
                </div>
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

export default React.memo(ProductForm);
