import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import 'dotenv/config';
import productRouter from "./product/routes/product.routes.js";
import { sql } from "./config/db.js";
import { handleError } from "./middleware/errorhandler.js";
const app = express();
const port = process.env.BACKENDPORT || 5001;

// handle json data
app.use(express.json());
// helmet is a middleware that help protect your app by setting various http header
app.use(helmet());
// log the request
app.use(morgan("dev"));

// route
app.use('/api/products',productRouter);

const initDB = async () =>{
    try {
        await sql`
           CREATE TABLE IF NOT EXISTS products (
             id SERIAL PRIMARY KEY,
             name VARCHAR(255) NOT NULL,
             image VARCHAR(255) NOT NULL,
             price DECIMAL(10,2) NOT NULL,
             create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
           )
        `
        console.log('database successfully created');
    } catch (error) {
        console.error(error);
    }
}

initDB().then(() => {
   app.listen(port,() => console.log(`Server is running on port ${port}`));
})

// handle error
app.use(handleError);

// test
app.get('/',(req,res) => {
    res.json({ msg: "hello world" });
})