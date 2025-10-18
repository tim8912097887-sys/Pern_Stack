import expressAsyncHandler from "express-async-handler";
import { ApiError } from "../customerror/apierror.js";
import { sql } from "../config/db.js";

const { RATE_LIMIT,LIMIT_INTERVAL } = process.env;

export const rateLimiter = expressAsyncHandler(async (req,res,next) => {
   
    if(!req.ip) throw new ApiError(404,"Invalid Ip Address");
     const ipObject = await sql`
        SELECT * FROM limits
        WHERE ip=${req.ip}
     `
     if(!ipObject.length) {
        await sql`
          INSERT INTO limits (ip,count,expireat)
          VALUES (${req.ip},${0},${Date.now()})
        `
     }
     console.log(ipObject[0].expireat);
     console.log(Date.now());
     if(ipObject.length && ipObject[0].expireat > Date.now()) {
        const accumulatedCount = ipObject[0].count+1;
        if(accumulatedCount > RATE_LIMIT) throw new ApiError(429,'Rate limit exceed');
        await sql`
         UPDATE limits
         SET count=${accumulatedCount}
         WHERE id=${ipObject[0].id}
        ` 
     } else {
        await sql`
         UPDATE limits
         SET count=0,
             expireat=${Date.now()+parseInt(LIMIT_INTERVAL)}
         WHERE id=${ipObject[0].id}
        `
     }
     next();

})