"use client";
import Iframe from "react-iframe";

export interface IframeProps {
    url: string;
}

export default function IframeCustom({ url }: IframeProps) {


    return (
        <Iframe url={url}
            id=""
            className="w-full h-full"
            display="block"
            position="relative" />

    )

}