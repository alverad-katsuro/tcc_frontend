"use client";

import { loginAuth } from "@/api/api";
import { UserLogin } from "@/model/UserLogin";
import { GITHUB_AUTH_URL, GOOGLE_AUTH_URL, KEYCLOAK_AUTH_URL } from "@/service/oauth";
import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { object, string } from "yup";
export default function login() {

    const router = useRouter();

    const schemaExperienciaTrabalho = object<UserLogin>({
        username: string().required("Obrigatório").min(5, "Campo muito curto"),
        password: string().required("Campo Obrigatório"),
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: schemaExperienciaTrabalho,
        onSubmit: (values, { resetForm }) => {
            loginAuth(values).then((e) => { router.push("/"); })
                .catch(e => { formik.setFieldError("username", e.response?.data.message); })
        }
    })

    return (
        <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900" >
            <div className="text-center grid gap-4 mb-8 text-2xl font-semibold lg:mb-10 dark:text-white">
                <a href="/" className="mx-auto">
                    <Image alt="Logo sistema" src={"https://flowbite.com/docs/images/logo.svg"} width={50} height={50} />
                </a>
                <span>Meu Bolsista</span>
            </div>
            <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                    Bem vindo de Volta
                </h2>
                <div className="grid grid-cols-2">
                    <Button href={GITHUB_AUTH_URL} className="rounded-lg text-xl px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2" color={"dark"}>
                        <AiFillGithub className="w-4 h-4 mr-2 -ml-1" />
                        Log in with Github
                    </Button>
                    <Button href={GOOGLE_AUTH_URL} className="rounded-lg text-xl px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2" color={"dark"}>
                        <FcGoogle className="w-4 h-4 mr-2 -ml-1" />
                        Log in with Google
                    </Button>
                    <Button href={KEYCLOAK_AUTH_URL} className="rounded-lg text-xl px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2" color={"dark"}>
                        <FcGoogle className="w-4 h-4 mr-2 -ml-1" />
                        Log in with Google
                    </Button>
                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }}>
                    <div className="sm:col-span-2">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="username"
                                value="Login"
                                color={formik.errors.username ? "failure" : undefined}
                            />
                        </div>
                        <TextInput
                            id="username"
                            type="text"
                            sizing="md"
                            placeholder="example@example.com"
                            onChange={formik.handleChange}
                            helperText={formik.errors.username}
                            defaultValue={formik.values.username}
                            color={formik.errors.username ? "failure" : undefined}
                            required
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password"
                                value="Senha"
                                color={formik.errors.password ? "failure" : undefined}
                            />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            sizing="md"
                            placeholder="••••••••"
                            onChange={formik.handleChange}
                            helperText={formik.errors.password}
                            defaultValue={formik.values.password}
                            color={formik.errors.password ? "failure" : undefined}
                            required
                        />
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="font-medium text-gray-900 dark:text-white">Lembre-me</label>
                        </div>
                        <a href="#" className="ml-auto font-medium text-blue-600 dark:text-blue-500 hover:underline">Esqueceu sua senha?</a>
                    </div>
                    <Button type="submit" className="w-full mx-auto text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</Button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Não registrado? <a href="/registro" className="text-primary-700 hover:underline dark:text-primary-500">Crie sua conta</a>
                    </div>
                </form>
            </div>
        </div>

    )

}
