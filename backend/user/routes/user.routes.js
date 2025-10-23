import express from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/user.controllers.js";
import { handleUserData } from "../../middleware/userDataHandler.js";
import { handleIdentification } from "../../middleware/identificationhandler.js";

export const userRouter = express.Router();

userRouter.route('/').get(getUsers).post(handleUserData,createUser);

userRouter.route('/:id').all(handleIdentification).get(getUser).put(updateUser).delete(deleteUser);