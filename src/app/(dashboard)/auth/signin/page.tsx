"use client";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function Signin() {

  useEffect(() => {
    signIn('keycloak', { callbackUrl: '/' })
  })

  return (
    <div>
      Redirecionando login no keycloak...
    </div>
  );
}
