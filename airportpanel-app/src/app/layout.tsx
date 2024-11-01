"use client";
import "./globals.css";
import "../assets/styles/react-datepicker.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "jotai";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const inter = Inter({ subsets: ["latin"] });
// export const metadata: Metadata = {
//   title: "USJT - Aeroporto Internacional",
//   description:
//     "Exemplificando um painel de aeroporto para listagem e checagem de voos.",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Provider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
