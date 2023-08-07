"use client";
import { useEffect, useState } from 'react';

export default function useDebounce<T>(element: T, callback: (element: T) => void, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState<T>(element)

    useEffect(() => {
        const handler = setTimeout(() => {
            callback(element)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [element, delay])

    return debouncedValue
}