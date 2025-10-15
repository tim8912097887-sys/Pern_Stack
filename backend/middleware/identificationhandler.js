import { ApiError } from "../customerror/apierror.js";

export const handleIdentification = (req,res,next) => {
    const { id } = req.params;
    if(isNaN(id)) throw new ApiError(400,'Id is number');
    next();
}