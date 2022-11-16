import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/ui/input/Input";
import { auth } from "../../configs/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { control, handleSubmit } = useForm({
    mode: onchange,
  });
  const navigate = useNavigate();

  const handleSignIn = (value) => {
    signInWithEmailAndPassword(auth, value.email, value.password).then(() =>
      navigate("/")
    );
  };
  return (
    <div>
      <div className="container py-20">
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="flex flex-col gap-4 mx-auto max-w-2xl"
        >
          <h1 className="text-4xl text-slate-900 font-bold capitalize text-center">
            Admin Site
          </h1>
          <Input
            control={control}
            name="email"
            display="Email"
            placeholder="Nhập email"
          />
          <Input
            control={control}
            name="password"
            type="password"
            display="Password"
            placeholder="Nhập password"
          />
          <input type="submit" value="Đăng nhập" className="btn-primary mt-7" />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
