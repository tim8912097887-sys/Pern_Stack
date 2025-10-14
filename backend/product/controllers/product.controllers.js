import { getProductsService } from "../services/product.services.js";

export const getProducts = (req,res) => {
   getProductsService(req,res);
}