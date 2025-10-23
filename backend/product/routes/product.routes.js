import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controllers.js";
import { handleIdentification } from "../../middleware/identificationhandler.js";
import { limit } from "../../middleware/ratelimiting.js";
import { limiter } from "../../middleware/slowresponse.js";
import { handleCreatedProductData, handleUpdatedProductData } from "../../middleware/productDatahandler.js";

const router = express.Router();

router.route('/').get(limit,limiter,getProducts).post(handleCreatedProductData,createProduct);

router.route('/:id').all(handleIdentification).get(getProduct).put(handleUpdatedProductData,updateProduct).delete(deleteProduct);

export default router;