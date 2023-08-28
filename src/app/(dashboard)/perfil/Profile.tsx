import { Button, Card } from "@/components/flowbite-components";
import { UserDataKeycloak } from "@/model/keycloak/UserDataKeycloak";
import Image from "next/image";
import Link from "next/link";
import { AiFillMail } from "react-icons/ai";
import LattesSVG from "./editar/LattesSVG";
interface Props {
    user: UserDataKeycloak;
}

export default function Profile({ user }: Props) {

    return (

        <Card className="justify-center w-fit mx-auto p-4">
            <div className="flex flex-row gap-4 place-items-center">
                <h1 className="text-xl font-bold leading-tight text-gray-900 dark:text-white flex-1">Perfil</h1>
                <Link href="/perfil/editar" className="">
                    <Button color={'blue'}>Edit</Button>
                </Link>
            </div>
            <div className="w-44 h-44 sm:w-72 sm:h-72 object-none relative justify-self-center">
                <Image fill src={user?.attributes?.picture?.[0] ?? ""} className="object-cover rounded-3xl" alt="foto de perfil" />
            </div>
            <div className=" flex flex-row gap-4">
                <div>
                    <h1 className="mb-3 text-xl font-bold leading-tight text-gray-900 dark:text-white">{`${user?.firstName} ${user?.lastName}`}</h1>

                    <div className="flex gap-4">
                        <AiFillMail className="text-lg" />
                        <p className="mb-3 text-base font-normal leading-tight text-gray-900 dark:text-white">{user?.email}</p>
                    </div>

                    <div className="flex gap-4">
                        <span className="relative w-[18px] text-lg">
                            <LattesSVG className="text-lg" />
                        </span>
                        <Link href={user?.attributes?.lattes?.[0] ?? ""} target="_blank" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            Lattes
                        </Link>
                    </div>
                </div>
            </div>
        </Card>

    )

}