import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controllers.js";
import { handleData } from "../../middleware/datahandler.js";
import { handleIdentification } from "../../middleware/identificationhandler.js";
import { rateLimiter } from "../../middleware/ratelimiting.js";

const router = express.Router();

router.route('/').get(rateLimiter,getProducts).post(handleData,createProduct);

router.route('/:id').all(handleIdentification).get(getProduct).put(handleData,updateProduct).delete(deleteProduct);

export default router;