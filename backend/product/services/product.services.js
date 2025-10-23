import { sql } from "../../config/db.js";
import { ApiError } from "../../customerror/apierror.js";
import { getUserService } from "../../user/services/user.services.js";

export const getProductsService = async () => {
    const products = await sql`
      SELECT * FROM products
      ORDER BY create_at DESC
    `
    return products;
}
export const getProductService = async (id) => {
    const product = await sql`
      SELECT * FROM products
      WHERE id=${id}
    `
    if(product.length < 1) throw new ApiError(404,`Product with id: ${id} not found`);
     return product[0];
}
export const createProductService = async (product) => {
  
    const { name,image,price,userId } = product;
    // check user existense
    await getUserService(userId);

    const createdProduct = await sql`
      INSERT INTO products (name,image,price,userId)
      VALUES (${name},${image},${price},${userId})
      RETURNING *
    `
    return createdProduct[0];
}

export const updateProductService = async (id,updateValue) => {
    // check if exist
    await getProductService(id);
    const { name,image,price } = updateValue;
    const updatedProduct = await sql`
      UPDATE products
      SET name=${name},
          image=${image},
          price=${price}
      WHERE id=${id}
      RETURNING *
    `
    return updatedProduct[0];
}

export const deleteProductService = async (id) => {
    // check if exist
    await getProductService(id);
    
    await sql`
      DELETE FROM products 
      WHERE id=${id}
    `
}
