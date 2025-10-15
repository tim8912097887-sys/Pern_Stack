import expressAsyncHandler from "express-async-handler";
import { createProductService, deleteProductService, getProductService, getProductsService, updateProductService } from "../services/product.services.js";

export const getProducts = expressAsyncHandler(async (req,res) => {
   const products = await getProductsService();
   res.json({ success: true,data: products });
})

export const getProduct = expressAsyncHandler(async (req,res) => {
   const { id } = req.params;
   const product = await getProductService(parseInt(id));
   res.json({ success: true,data: product });
})

export const createProduct = expressAsyncHandler(async (req,res) => {
   const createdProduct = await createProductService(req.body);
   res.status(201).json({ success: true,data: createdProduct });
})

export const deleteProduct = expressAsyncHandler(async (req,res) => {
   const { id } = req.params;
   await deleteProductService(parseInt(id));
   res.json({ success: true });
})

export const updateProduct = expressAsyncHandler(async (req,res) => {
   const { id } = req.params;
   const updatedProduct = await updateProductService(parseInt(id),req.body);
   res.json({ success: true,data: updatedProduct });
})