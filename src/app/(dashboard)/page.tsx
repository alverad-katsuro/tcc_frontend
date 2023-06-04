'use client';

import RequireAuth from "@/util/RequireAuth";
import Iframe from "react-iframe";


export default async function Home() {

  return (
    <Iframe url="https://dgp.cnpq.br/dgp/espelhogrupo/2864417251425584"
      id=""
      className="w-full h-full"
      display="block"
      position="relative" />
  )
}
