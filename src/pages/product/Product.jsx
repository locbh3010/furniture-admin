import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  documentId,
} from "firebase/firestore";
import { db } from "../../configs/firebase.config";
import ProductForm from "../../components/ui/form/ProductForm";
import {
  ProductItem,
  ProductList,
} from "../../components/ui/product/ProductUi";

const Product = () => {
  const { id } = useParams();
  const [similars, setSimilars] = useState([]);

  useEffect(() => {
    const productRef = doc(collection(db, "products"), id);

    onSnapshot(productRef, (res) => {
      const cateId = res.data().cateId;
      const similarQuery = query(
        collection(db, "products"),
        where("cateId", "==", cateId),
        where(documentId(), "!=", id)
      );
      onSnapshot(similarQuery, (similarSnapshot) => {
        let temp = [];
        similarSnapshot.docs?.length > 0 &&
          similarSnapshot.map((similar) =>
            temp.push({ id: similar.id, ...similar.data() })
          );

        setSimilars(temp);
      });
    });
  }, [id]);

  return (
    <div className="py-10">
      <div className="container">
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-3xl font-bold capitalize mb-6 text-gray-600">
            Cập nhật sản phẩm
          </h1>
          <ProductForm type="update" />
        </div>

        {/* products */}
        <div className="py-10">
          <h2 className="text-3xl text-slate-900 mb-6 font-bold">
            Sản phẩm liên quan
          </h2>
          <ProductList>
            {similars?.length > 0 &&
              similars.map((product) => (
                <ProductItem key={product.id} data={product} />
              ))}
          </ProductList>
        </div>
      </div>
    </div>
  );
};

export default Product;
