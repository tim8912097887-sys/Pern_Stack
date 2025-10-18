import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controllers.js";
import { handleData } from "../../middleware/datahandler.js";
import { handleIdentification } from "../../middleware/identificationhandler.js";
import { limit } from "../../middleware/ratelimiting.js";
import { limiter } from "../../middleware/slowresponse.js";

const router = express.Router();

router.route('/').get(limit,limiter,getProducts).post(handleData,createProduct);

router.route('/:id').all(handleIdentification).get(getProduct).put(handleData,updateProduct).delete(deleteProduct);

export default router;