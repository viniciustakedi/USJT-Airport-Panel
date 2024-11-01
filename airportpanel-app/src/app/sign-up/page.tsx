"use client";
import Link from "next/link";
import { ImageIcon, LockKeyholeIcon, MailIcon, UserIcon } from "lucide-react";
import { UserDataType } from "@/services/models/post";
import { SubmitHandler, useForm } from "react-hook-form";
import { newUser } from "@/services/post";
import { useRouter } from 'next/navigation';
import "./styles/singup.css";

export default function SingUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDataType>();

  const router = useRouter();

  const onSubmit: SubmitHandler<UserDataType> = async (data) => {
    const response = await newUser(data);

    if (response.statusCode === 201) {
      router.push("/sign-in");
    } else {

    }
  };

  return (
    <main className="main__container singup__bg">
      <div className="box__singup__content">
        <div className="sing__in">
          <h1 className="title">Olá novamente!</h1>
          <p className="text lg:px-2 lg:w-3/4 text-white  text-center">
            Para acessar a plataforma, faça seu login.
          </p>
          <div className="w-2/4 mt-8">
            <Link
              href="/sign-in"
              className="button__default__outline w-full inline-block"
            >
              Login
            </Link>
          </div>
        </div>
        <div className="sing__up">
          <h1 className="title fade__text">Criar conta</h1>
          <p className="text text-black lg:w-1/2 w-full text-center mb-4">
            Se cadastre para acessar todas as funcionalidades da plataforma.
          </p>
          <form
            className="form__sing__up"
            onSubmit={handleSubmit(onSubmit)}
            method="post"
          >
            <div className="input">
              <div className="input__icon__default">
                <ImageIcon size={24} color="#FF8E00" />
              </div>
              <input
                placeholder="Link avatar"
                className="input__default"
                type="text"
                id="avatar"
                {...register("avatar", {
                  required: true,
                })}
              />
            </div>
            <div className="input">
              <div className="input__icon__default">
                <UserIcon size={24} color="#FF8E00" />
              </div>
              <input
                placeholder="Nome"
                className="input__default"
                type="text"
                id="name"
                {...register("name", {
                  required: true,
                })}
              />
            </div>
            <div className="input">
              <div className="input__icon__default">
                <MailIcon size={24} color="#FF8E00" />
              </div>
              <input
                placeholder="Email"
                className="input__default"
                type="email"
                id="email"
                {...register("email", {
                  required: true,
                })}
              />
            </div>
            <div className="input">
              <div className="input__icon__default">
                <LockKeyholeIcon size={24} color="#FF8E00" />
              </div>
              <input
                placeholder="Senha"
                className="input__default"
                type="password"
                id="password"
                {...register("password", {
                  required: true,
                })}
              />
            </div>
            <input type="submit" className="button__default" value="Pronto!" />
          </form>
          <p className="text-black lg:hidden flex mt-2 mb-2 text-center ">ou</p>
          <div className="lg:hidden flex w-full">
            <Link href="/sing-in" className="button__default">
              Logar
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
