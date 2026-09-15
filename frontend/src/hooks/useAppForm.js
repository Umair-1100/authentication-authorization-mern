import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export const useAppForm = (schema, defaultValues = {}) => {
    return useForm({
        resolver: zodResolver(schema),
        mode: "onBlur",
        defaultValues: defaultValues,
    })
}