import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controllers.js";
import { handleData } from "../../middleware/datahandler.js";
import { handleIdentification } from "../../middleware/identificationhandler.js";

const router = express.Router();

router.route('/').get(getProducts).post(handleData,createProduct);

router.route('/:id').all(handleIdentification).get(getProduct).put(updateProduct).delete(deleteProduct);

export default router;