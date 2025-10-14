import { getProductsService } from "../services/product.services.js";

export const getProducts = async (req,res) => {
   getProductsService(req,res);
}