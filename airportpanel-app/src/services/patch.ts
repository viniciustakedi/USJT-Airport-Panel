import { getToken } from "@/configs";

export const patchFlightStatus = async (id: string, status: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/flights/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        status,
      }),
    }
  );

  return response.json();
};
