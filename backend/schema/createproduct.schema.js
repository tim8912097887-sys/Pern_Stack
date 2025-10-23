import * as z from "zod";

export const CreatedProduct = z.object({
    name: z.string("Please include name").min(2,"Name at least length of two").max(255),
    image: z.url({
        protocol: /^https?$/,
        hostname: z.regexes.domain
    },"Invalid url").max(255),
    price: z.number("Price should be a number").gt(0,"Price should greater than zero dollar"),
    userId: z.number("UserId should be a number")
})