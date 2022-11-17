import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BlogItem, BlogList } from "../../components/ui/blog/BlogUi";
import {
  ProductItem,
  ProductList,
} from "../../components/ui/product/ProductUi";
import {
  ProjectItem,
  ProjectList,
} from "../../components/ui/project/ProjectUi";
import { db } from "../../configs/firebase.config";
import { collection, onSnapshot } from "firebase/firestore";

const ShowItem = ({ color, slug, total }) => {
  return (
    <Link
      className={`rounded bg-white shadow-md w-full h-36 relative ${color} cursor-pointer duration-300 hover:shadow-lg`}
      to={slug}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-current rounded-l"></div>
      <div className="text-2xl font-bold  w-full h-full px-4 py-6">
        <p className="text-gray-700">
          Quản lý{" "}
          {slug === "products"
            ? "sản phẩm"
            : slug === "projects"
            ? "dự án"
            : "blogs"}
        </p>
        <span className="text-sm text-current font-bold">
          Tổng số{" "}
          {slug === "products"
            ? "sản phẩm"
            : slug === "projects"
            ? "dự án"
            : "blogs"}
          : {total}
        </span>
      </div>
    </Link>
  );
};

const Home = () => {
  const projectRef = collection(db, "projects");
  const productRef = collection(db, "products");
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    onSnapshot(projectRef, (res) => {
      let temp = [];
      res.docs?.length > 0 &&
        res.docs.map((doc) => temp.push({ id: doc.id, ...doc.data() }));
      setProjects(temp);
    });
    onSnapshot(productRef, (res) => {
      let temp = [];
      res.docs?.length > 0 &&
        res.docs.map((doc) => temp.push({ id: doc.id, ...doc.data() }));
      setProducts(temp);
    });
  }, []);

  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-3 gap-6">
          <ShowItem
            color="text-blue-500"
            slug="products"
            total={products?.length}
          />
          <ShowItem
            color="text-orange-500"
            slug="projects"
            total={projects?.length}
          />
          <ShowItem color="text-pink-400" slug="blogs" />
        </div>
        {/* project */}
        <div className="py-10">
          <h2 className="text-3xl text-slate-900 mb-6 font-bold">Dự án</h2>
          <ProjectList>
            {projects?.length > 0 &&
              projects.map((project) => (
                <ProjectItem key={project.id} data={project} />
              ))}
          </ProjectList>
        </div>
        {/* products */}{" "}
        <div className="py-10">
          <h2 className="text-3xl text-slate-900 mb-6 font-bold">Sản phẩm</h2>
          <ProductList>
            {products?.length > 0 &&
              products.map((product) => (
                <ProductItem key={product.id} data={product} />
              ))}
          </ProductList>
        </div>
        {/* Blogs */}
        <div className="py-10">
          <h2 className="text-3xl text-slate-900 mb-6 font-bold">Sản phẩm</h2>
          <BlogList>
            <BlogItem />
          </BlogList>
        </div>
      </div>
    </div>
  );
};

export default Home;
