import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import 'dotenv/config';
import productRouter from "./product/routes/product.routes.js";
import { sql } from "./config/db.js";
import { handleError } from "./middleware/errorhandler.js";
import { userRouter } from "./user/routes/user.routes.js";
//import expressAsyncHandler from "express-async-handler";
// import { aj } from "./lib/arcjet.js";
//import { ApiError } from "./customerror/apierror.js";
const app = express();
const port = process.env.BACKENDPORT || 5001;

// handle cross origin access
app.use(cors());
// handle json data
app.use(express.json());
// helmet is a middleware that help protect your app by setting various http header
app.use(helmet());
// log the request
app.use(morgan("dev"));

// app.use(expressAsyncHandler(async (req,res,next) => {
//       const decision = await aj.protect(req,{ requested: 1 });
      
//       if(decision.isDenied()) {
//             if(decision.reason.isRateLimit()) {
//             throw new ApiError(429,'Too many requests');
//         } else if(decision.reason.isBot()) {
//             throw new ApiError(403,'No bots allowed');
//         } else {
//             throw new ApiError(403,'Forbidden');
//         }
//       }
      
//     check for spoofed bot
//     if(decision.results.some(result =>  result.reason.isBot() && result.reason.isSpoofed())) {
//         throw new ApiError(403,'Spoofed bot detected');
//     }
//     next();
// }))

// route
app.use('/api/products',productRouter);
app.use('/api/users',userRouter);

const initDB = async () =>{
    try {
       await sql`
          CREATE TABLE IF NOT EXISTS users (
             id SERIAL PRIMARY KEY,
             name VARCHAR(255) NOT NULL,
             email VARCHAR(255) NOT NULL UNIQUE,
             password VARCHAR(255) NOT NULL,
             create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
           );
        `

        await sql`
           CREATE TABLE IF NOT EXISTS products (
             id SERIAL PRIMARY KEY,
             name VARCHAR(255) NOT NULL,
             image VARCHAR(255) NOT NULL,
             price DECIMAL(10,2) NOT NULL,
             userId INTEGER NOT NULL,
             create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
             FOREIGN KEY (userId) REFERENCES users (id)
           );
        `
        console.log('Database schema successfully checked/created.');
    } catch (error) {
        console.error(error);
    }
}

if (process.env.NODE_ENV !== 'test') {
    initDB().then(() => {
        // Start server only after database initialization is complete
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    });
}

// handle error
app.use(handleError);

// test
app.get('/',(req,res) => {
    res.json({ msg: "hello world" });
})

export default app;