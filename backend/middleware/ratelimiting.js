import rateLimit from "express-rate-limit";

export const limit = rateLimit({
    windowMs: 30*1000,
    limit: 10,
    message: "Exceed the request limit please try again after 30 second"
})
