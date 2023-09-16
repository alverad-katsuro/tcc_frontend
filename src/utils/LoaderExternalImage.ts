import { ImageLoaderProps } from "next/image";

export function loaderExternalImage({ src }: ImageLoaderProps) {
    return src;
}