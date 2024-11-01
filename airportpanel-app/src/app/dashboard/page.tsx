"use client";
import { getToken, getUsername, isJwtValid } from "@/configs";
import { IsUserAuthenticatedAtom } from "@/contexts";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [isUserAuthorized, setIsUserAuthorized] = useAtom(
    IsUserAuthenticatedAtom
  );

  useEffect(() => {
    if (isUserAuthorized || getToken()) {
      Promise.resolve().then(async () => {
        if (!(await isJwtValid(getToken()))) {
          router.push("/sign-in");
          return;
        }
        
        setIsUserAuthorized(true);
        return;
      });
    }
  }, []);

  if (!isUserAuthorized) {
    return (
      <main className="main__container bg-white h-screen">
        <h1>Carregando...</h1>
      </main>
    );
  }

  return (
    <main className="main__container bg-white h-screen">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="title fade__text">Olá {getUsername()}</h1>
        <div className="flex w-1/5 mt-8">
          <Link href="/dashboard/register-flight" className="button__default">
            Registrar um voo
          </Link>
        </div>
      </div>
    </main>
  );
}
