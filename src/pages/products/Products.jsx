import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ProductForm from "../../components/ui/form/ProductForm";
import {
  ProductItem,
  ProductList,
} from "../../components/ui/product/ProductUi";
import { db } from "../../configs/firebase.config";

const Products = () => {
  const colRef = collection(db, "products");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    onSnapshot(colRef, (res) => {
      let temp = [];
      res.docs?.length > 0 &&
        res.docs.map((doc) => temp.push({ id: doc.id, ...doc.data() }));

      setProducts(temp);
    });
  }, []);

  return (
    <div className="py-10">
      <div className="container">
        {/* products */}
        <div className="py-10">
          <h2 className="text-3xl text-slate-900 mb-6 font-bold">Sản phẩm</h2>
          <ProductList>
            {products?.length > 0 &&
              products.map((product) => (
                <ProductItem key={product.id} data={product} />
              ))}
          </ProductList>
        </div>
      </div>
    </div>
  );
};

export default Products;
