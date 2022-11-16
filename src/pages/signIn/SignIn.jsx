import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/ui/input/Input";
import { auth, db } from "../../configs/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { control, handleSubmit } = useForm({
    mode: onchange,
  });
  const navigate = useNavigate();

  const handleAdd = (value) => {
    createUserWithEmailAndPassword(auth, value.email, value.password).then(
      (currentUser) => {
        const userRef = doc(db, "users", currentUser.user.uid);

        setDoc(userRef, {
          email: value.email,
          password: value.password,
          role: "admin",
        }).then(navigate("/"));
      }
    );
  };
  return (
    <div>
      <div className="container py-20">
        <form onSubmit={handleSubmit(handleAdd)}>
          <Input control={control} name="email" />
          <Input control={control} name="password" type="password" />
          <input type="submit" value="dang nhap nhap" className="btn-primary" />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
