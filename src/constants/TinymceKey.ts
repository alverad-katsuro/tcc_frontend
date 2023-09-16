if (process.env.NEXT_PUBLIC_TINY_MCE === undefined) {
    throw new Error("NEXT_PUBLIC_TINY_MCE NÃO INFORMADA.");
}

export const tinymceKey: string = process.env.NEXT_PUBLIC_TINY_MCE!;
