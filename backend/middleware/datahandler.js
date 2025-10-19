import { ApiError } from "../customerror/apierror.js";
import { Product } from "../schema/product.schema.js";

export const handleData = (req,res,next) => {
    if(!req.body) {
        res.status(400);
        throw new Error('Please include request body');
    }
    const validation = Product.safeParse(req.body);
    if(!validation.success) {
      next(validation.error);
    }else {
      next();
    }
       
}