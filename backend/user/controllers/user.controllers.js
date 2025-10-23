import { errorTransporter } from "../../utilities/errortransporter.js";
import { createUserService, deleteUserService, getUserService, getUsersService, updateUserService } from "../services/user.services.js";

export const getUsers = errorTransporter(async (req,res) => {
     const users = await getUsersService();
     return res.json({ success: true,data: users });
})

export const getUser = errorTransporter(async (req,res) => {
     const { id } = req.params;
     const user = await getUserService(id);
     return res.json({ success: true,data: user });
})

export const createUser = errorTransporter(async (req,res) => {
     const user = await createUserService(req.body);
     return res.status(201).json({ success: true,data: user });
})

export const updateUser = errorTransporter(async (req,res) => {
     const { id } = req.params;
     const user = await updateUserService(id,req.body);
     return res.json({ success: true,data: user });
})
export const deleteUser = errorTransporter(async (req,res) => {
     const { id } = req.params;
     await deleteUserService(id);
     return res.json({ success: true });
})