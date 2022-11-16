import { db } from "../configs/firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export function useAddDoc() {
  const handleAddDoc = (path, data) => {
    const colRef = collection(db, path);
    addDoc(colRef, data).then(() => {
      toast.success("Thêm thành công");
    });
  };

  return [handleAddDoc];
}
