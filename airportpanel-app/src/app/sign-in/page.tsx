"use client";
import Link from "next/link";
import "./styles/singup.css";
import { LockKeyholeIcon, MailIcon } from "lucide-react";
import { LoginDataType } from "@/services/models/post";
import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "@/services/post";
import { useRouter } from "next/navigation";
import { getToken, isJwtValid } from "@/configs";
import { useAtom } from "jotai";
import { IsUserAuthenticatedAtom } from "@/contexts";
import { useEffect } from "react";

export default function SingIn() {
  const [isUserAuthorized, setIsUserAuthorized] = useAtom(IsUserAuthenticatedAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataType>();

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginDataType> = async (data) => {
    const response = await login(data);

    if (response.statusCode === 200) {
      if (await isJwtValid(response.data, true)) {
        setIsUserAuthorized(true);
        router.push("/dashboard");
      }
      return;
    } else {

    }
  };

  useEffect(() => {
    if (isUserAuthorized || getToken()) {
      Promise.resolve().then(async () => {
        if ((await isJwtValid(getToken()))) {
          router.push("/dashboard");
          return;
        }
        
        setIsUserAuthorized(false);
        return;
      });
    }
  }, []);

  return (
    <main className="main__container singup__bg">
      <div className="box__singup__content">
        <div className="sing__in">
          <h1 className="title">Olá viajante!</h1>
          <p className="text lg:px-2 lg:w-3/4 text-white text-center">
            Caso não possua um cadastro, clique no botão abaixo.
          </p>
          <div className="w-2/4 mt-8">
            <Link
              href="/sign-up"
              className="button__default__outline w-full inline-block"
            >
              Cadastro
            </Link>
          </div>
        </div>
        <div className="sing__up">
          <h1 className="title fade__text">Entrar</h1>
          <p className="text text-black lg:w-1/2 w-full text-center mb-4">
            Logue para acessar todas as funcionalidades da plataforma.
          </p>
          <form
            className="form__sing__up"
            onSubmit={handleSubmit(onSubmit)}
            action=""
            method="post"
          >
            <div className="input">
              <div className="input__icon__default">
                <MailIcon size={24} color="#FF8E00" />
              </div>
              <input
                placeholder="Email"
                className="input__default"
                type="email"
                id="email"
                {...register("email", { required: true })}
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
                {...register("password", { required: true })}
              />
            </div>
            <button className="button__default">Entrar!</button>
          </form>
          <p className="text-black lg:hidden flex mt-2 mb-2  text-center ">
            ou
          </p>
          <div className="lg:hidden flex w-full">
            <Link href="/sing-up" className="button__default">
              Cadastro
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
