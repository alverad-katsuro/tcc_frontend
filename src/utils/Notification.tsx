"use client";
import { VariantType, enqueueSnackbar } from "notistack";

export function notification(mensagem: string, variant: VariantType): void {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(mensagem, { variant });
};