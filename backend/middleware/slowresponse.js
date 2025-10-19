import slowDown from "express-slow-down";

export const limiter = slowDown({
    windowMs: 30*1000,
    delayAfter: 2,
    delayMs: (current) => current*500,
    maxDelayMs: 3000
})