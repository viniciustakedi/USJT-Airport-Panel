import * as jose from "jose";

export const decodeJwt = (token: string | null) => {
  if (!token) {
    return null;
  }
  return jose.decodeJwt(token) as any;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUsername = () => {
  return JSON.parse(localStorage.getItem("user") || "").name;
}

export const isJwtValid = async (token: string | null, isLogin?: boolean) => {
  try {
    if (!token) {
      throw false;
    }

    const publicKey = await jose.importSPKI(
      String(process.env.NEXT_PUBLIC_PUBLIC_KEY_JWT),
      String(process.env.NEXT_PUBLIC_ALG_JWT)
    );

    await jose.jwtVerify(token, publicKey, {
      issuer: process.env.NEXT_PUBLIC_ISSUER_JWT,
    });

    if (isLogin) {
      const tokenDecoded = decodeJwt(token);
      localStorage.setItem("user", JSON.stringify(tokenDecoded));
      localStorage.setItem("token", token);
    }

    console.log("👨🏻‍💻 On")
    return true;
  } catch (error) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    console.log("👨🏻‍💻 Off")
    return false;
  }
};

export const isUserAdmin = () => {
  const userLocalStorage = localStorage.getItem("user");  
  if (!userLocalStorage) { return false; }

  const user = JSON.parse(userLocalStorage);
  return user.roles.includes("admin");
}
