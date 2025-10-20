import { ZodError } from "zod";

export const handleError = (err,req,res,next) => {
     if(err instanceof ZodError) {
          return res.status(400).json({ success: false,message: err.issues.map(e => e.message).join("\n") });
     }
     if(res.statusCode === 200) {
          const statusCode = err.statusCode || err.status || 500;
          res.status(statusCode);
     } 
     res.json({ success: false,message: err.message });
}