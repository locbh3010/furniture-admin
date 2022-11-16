import React from "react";
import ProductForm from "../../components/ui/form/ProductForm";
import {
  ProductItem,
  ProductList,
} from "../../components/ui/product/ProductUi";

const Products = () => {
  return (
    <div className="py-10">
      <div className="container">
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-3xl font-bold capitalize mb-6 text-gray-600">
            Quản lý sản phẩm
          </h1>
          <ProductForm />
        </div>

        {/* products */}
        <div className="py-10">
          <h2 className="text-3xl text-slate-900 mb-6 font-bold">Sản phẩm</h2>
          <ProductList>
            <ProductItem />
          </ProductList>
        </div>
      </div>
    </div>
  );
};

export default Products;
