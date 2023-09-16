if (process.env.TINYMCE_KEY === undefined) {
    throw new Error("TINYMCE_KEY NÃO INFORMADA.");
}

export const tinymceKey: string = process.env.TINYMCE_KEY!;
