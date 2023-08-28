"use client";
import { atualizarPerfil } from "@/api/api";
import { Button, Card, FileInput, Label, TextInput } from "@/components/flowbite-components";
import { AtibutosUser, UserDataKeycloak } from "@/model/keycloak/UserDataKeycloak";
import { notification } from "@/utils/Notification";
import { useFormik } from "formik";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { AiFillMail } from "react-icons/ai";
import { array, object, string } from "yup";
import LattesSVG from "./LattesSVG";

interface Props {
    userKeycloak: UserDataKeycloak;
}
export default function PerfilForm({ userKeycloak }: Props) {

    const [fotoUrl, setFotoUrl] = useState<string | undefined>(userKeycloak.attributes?.picture?.[0])
    const [foto, setFoto] = useState<File | undefined>(undefined);

    const validationSchema = object<{ userDataKeycloak: UserDataKeycloak, foto: File | undefined }>({
        id: string().required("Campo obrigatório."),
        username: string().required("Campo obrigatório."),
        firstName: string().required("Campo obrigatório."),
        lastName: string().required("Campo obrigatório."),
        email: string().required("Campo obrigatório."),
        attributes: object<AtibutosUser>({
            lattes: array().of(string().required("Campo Obrigatorio")).min(1, "Campo Obrigatorio").required("Campo obrigatório."),
            pictureId: array(),
            picture: array(),
        }),
    })

    function uploadArquivo(e: ChangeEvent<HTMLInputElement>) {
        if (!e.currentTarget.files) {
            // A propriedade files é nula, então nenhum arquivo válido foi selecionado
            if (fotoUrl) {
                URL.revokeObjectURL(fotoUrl)
            }
            setFoto(undefined)
            setFotoUrl(undefined);
            return;
        }

        const file = e.currentTarget.files[0];
        if (!file) {
            // Nenhum arquivo foi selecionado, ou seja, o array de arquivos está vazio
            if (fotoUrl) {
                URL.revokeObjectURL(fotoUrl)
            }
            setFoto(undefined)
            setFotoUrl(undefined);
            return;
        }
        setFotoUrl(URL.createObjectURL(file));
        // Um arquivo válido foi selecionado, então atualizamos o estado da inscrição
        setFoto(file)
    }


    const formik = useFormik({
        initialValues: userKeycloak,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            atualizarPerfil(values, foto).then((resp) => {
                notification("Atualizado com sucesso", 'success');
                window.location.href = `/perfil`
            });
        }
    })

    return (
        <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }}>

            <Card className="justify-center w-full mx-auto p-4">
                <h1 className="text-xl font-bold leading-tight text-gray-900 dark:text-white flex-1">Editar Perfil</h1>
                <div className="w-44 h-44 sm:w-72 sm:h-72 object-none relative justify-self-center">
                    {fotoUrl !== undefined ?
                        <Image priority fill src={fotoUrl} className="object-cover rounded-3xl" alt="foto de perfil" /> : <></>
                    }
                </div>
                <div className="space-y-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <div className="mb-2 block">
                            <Label
                                value="Foto de Perfil"
                                htmlFor="foto"
                                className="block mb-2 text-sm font-medium"
                            />
                        </div>
                        <FileInput
                            id="foto"
                            accept="image/*"
                            multiple
                            onChange={uploadArquivo}
                        />
                    </div>

                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4">
                        <div className="flex-1">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="firstName"
                                    value="Nome"
                                    color={formik.errors.firstName ? "failure" : undefined}
                                />
                            </div>
                            <TextInput
                                id="firstName"
                                type="text"
                                sizing="md"
                                placeholder="Nome"
                                onChange={formik.handleChange}
                                helperText={formik.errors.firstName}
                                defaultValue={formik.values?.firstName}
                                color={formik.errors.firstName ? "failure" : undefined}
                                required
                            />

                        </div>

                        <div className="flex-1">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="lastName"
                                    value="Sobrenome"
                                    color={formik.errors.lastName ? "failure" : undefined}
                                />
                            </div>
                            <TextInput
                                id="lastName"
                                type="text"
                                sizing="md"
                                placeholder="Nome"
                                onChange={formik.handleChange}
                                helperText={formik.errors.lastName}
                                defaultValue={formik.values?.lastName}
                                color={formik.errors.lastName ? "failure" : undefined}
                                required
                            />

                        </div>

                    </div>


                    <div >
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email"
                                value="Email"
                                color={formik.errors.email ? "failure" : undefined}
                            />
                        </div>
                        <TextInput
                            icon={AiFillMail}
                            id="email"
                            type="text"
                            sizing="md"
                            placeholder="Nome"
                            onChange={formik.handleChange}
                            helperText={formik.errors.email}
                            defaultValue={formik.values?.email}
                            color={formik.errors.email ? "failure" : undefined}
                            required
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="attributes.lattes[0]"
                                value="Lattes"
                                color={(formik.errors.attributes?.lattes?.[0] || formik.errors.attributes?.lattes) ? "failure" : undefined}
                            />
                        </div>
                        <TextInput
                            icon={LattesSVG}
                            id="attributes.lattes[0]"
                            type="url"
                            sizing="md"
                            placeholder="Link do lattes"
                            onChange={formik.handleChange}
                            helperText={formik.errors.attributes?.lattes?.[0]}
                            defaultValue={formik.values?.attributes?.lattes?.[0]}
                            color={formik.errors.attributes?.lattes?.[0] ? "failure" : undefined}
                            required
                        />
                    </div>
                </div>
                <Button type="submit" color="green" className="w-fit mx-auto">Salvar</Button>
            </Card>
        </form>
    )

}