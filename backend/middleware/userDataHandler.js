import { User } from "../schema/user.schema.js";

export const handleUserData = (req,res,next) => {
      if(!req.body) throw new ApiError(400,'Please include request body');
      const validation = User.safeParse(req.body);
      if(!validation.success) {
        next(validation.error);
      } else {
        next();
      }
}