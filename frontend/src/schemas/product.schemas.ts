import * as z from "zod"

export const Product = z.object({
    name: z.string().min(2),
    image: z.url({
        protocol: /^https?$/,
        hostname: z.regexes.domain
    }).max(255),
    price: z.number().gte(0)
})

export type ProductType = z.infer<typeof Product>;