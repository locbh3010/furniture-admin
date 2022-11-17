import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "../../configs/firebase.config";
import ProductForm from "../../components/ui/form/ProductForm";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const productRef = doc(collection(db, "products"), id);

    onSnapshot(productRef, (res) => setProduct({ id: res.id, ...res.data() }));
  }, []);

  return (
    <div className="py-10">
      <div className="container">
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-3xl font-bold capitalize mb-6 text-gray-600">
            Cập nhật sản phẩm
          </h1>
          <ProductForm type="update" />
        </div>
      </div>
    </div>
  );
};

export default Product;
