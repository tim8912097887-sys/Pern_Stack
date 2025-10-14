import { createProductService, deleteProductService, getProductService, getProductsService, updateProductService } from "../services/product.services.js";

export const getProducts = async (req,res) => {
   await getProductsService(req,res);
}

export const getProduct = async (req,res) => {
   await getProductService(req,res);
}

export const createProduct = async (req,res) => {
   await createProductService(req,res);
}

export const deleteProduct = async (req,res) => {
   await deleteProductService(req,res);
}

export const updateProduct = async (req,res) => {
   await updateProductService(req,res);
}