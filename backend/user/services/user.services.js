import { sql } from "../../config/db.js"
import { ApiError } from "../../customerror/apierror.js";
import bcrypt from "bcrypt";

export const getUsersService = async () => {
    const users = await sql`
       SELECT id,name,email FROM users
    `
    return users;
}

export const getUserService = async (id) => {
   const user = await sql`
      SELECT id,name,email FROM users
      WHERE id=${id}
    `
    if(!user.length) throw new ApiError(404,`User with id: ${id} is not found`);
    return user[0];
}

export const createUserService = async (user) => {
    const { name,email,password } = user;
    const existUser = await sql`
      SELECT * FROM users
      WHERE email=${email}
    `
    if(existUser.length) throw new ApiError(409,'Email already been use')
    const hashedPassword = await bcrypt.hash(password,parseInt(process.env.SALT));
    console.log(hashedPassword);
    const createdUser = await sql`
        INSERT INTO users (name,email,password)
        VALUES (${name},${email},${hashedPassword})
        RETURNING *
    `
    return createdUser[0];
}

export const updateUserService = async (id,userData) => {
  if(!userData || !userData.password) throw new ApiError(400,'Please provide password');
  const { password } = userData;
  
    if(password.length > 10 || password.length < 6) {
      res.status(400);
      throw new Error('Password must within 6 to 10');
    }
    // check if exist
    await getUserService(id);
    const hashedPassword = await bcrypt.hash(password,parseInt(process.env.SALT));
    console.log(hashedPassword);

    const updatedUser = await sql`
        UPDATE users
        SET password=${hashedPassword}
        WHERE id=${id}
        RETURNING *
    `
    return updatedUser[0];
}
export const deleteUserService = async (id) => {
    // check if exist
    await getUserService(id);
    const product = await sql`
      SELECT * FROM products
      WHERE userId=${id}
    `
    if(product.length) {
        await sql`
          DELETE FROM products
          WHERE userId=${id}
        `
    }
    await sql`
        DELETE FROM users 
        WHERE id=${id}
    `
}