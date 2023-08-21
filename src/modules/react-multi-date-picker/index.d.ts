// next-auth/core/types.ts

// Importe a interface DefaultSession original
import { Value } from "react-multi-date-picker";
import { DateObject } from "react-multi-date-picker";

type numberArray = number[];

// Sobrescreva a interface DefaultSession adicionando/modificando as propriedades conforme necessário
declare module "react-multi-date-picker" {
    type Value =
        | Date
        | string
        | number
        | DateObject
        | Date[]
        | numberArray[]
        | string[]
        | number[]
        | DateObject[]
        | null;
}
