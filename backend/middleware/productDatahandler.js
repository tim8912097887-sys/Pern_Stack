import { ApiError } from "../customerror/apierror.js";
import { CreatedProduct } from "../schema/createproduct.schema.js";
import { UpdatedProduct } from "../schema/updateproduct.schema.js";

export const handleCreatedProductData = (req,res,next) => {
    if(!req.body) throw new ApiError(400,'Please include request body');
    const validation = CreatedProduct.safeParse(req.body);
    if(!validation.success) {
      next(validation.error);
    }else {
      next();
    }
       
}

export const handleUpdatedProductData = (req,res,next) => {
    if(!req.body) throw new ApiError(400,'Please include request body');
    const validation = UpdatedProduct.safeParse(req.body);
    if(!validation.success) {
      next(validation.error);
    }else {
      next();
    }
       
}