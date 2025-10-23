import * as z from "zod";

export const User = z.object({
    name: z.string().min(2,"Name at least 2 character").max(255),
    email: z.email(),
    password: z.string().min(6,"Password at least length of six").max(10,"Password at most length of ten")
})