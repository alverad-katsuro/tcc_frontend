"use client";
import { useEffect, useState } from 'react';

export default function useDebounce<T extends Record<string, any>>(element: T, callback: (element: T) => void, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState<T>(element)

    function saoConteudosIguais(obj1: T, obj2: T): boolean {
        if (Array.isArray(obj1) && Array.isArray(obj2)) {
            if (obj1.length !== obj2.length) {
                return false;
            }

            for (let i = 0; i < obj1.length; i++) {
                if (!saoConteudosIguais(obj1[i], obj2[i])) {
                    return false;
                }
            }

            return true;
        } else if (typeof obj1 === 'object' && typeof obj2 === 'object') {
            const keys1 = Object.keys(obj1);
            const keys2 = Object.keys(obj2);

            if (keys1.length !== keys2.length) {
                return false;
            }

            for (const key of keys1) {
                if (!saoConteudosIguais(obj1[key], obj2[key])) {
                    return false;
                }
            }

            return true;
        } else {
            return obj1 === obj2;
        }
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            if (!saoConteudosIguais(element, debouncedValue)) {
                setDebouncedValue(element);
                callback(element)
            }
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [element, delay])

    return debouncedValue
}