import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import 'dotenv/config';
import productRouter from "./product/routes/product.routes.js";
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
app.listen(port,() => console.log(`Server is running on port ${port}`));

// test
app.get('/',(req,res) => {
    res.json({ msg: "hello world" });
})