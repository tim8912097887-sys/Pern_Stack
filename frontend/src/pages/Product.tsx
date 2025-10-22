import { Link } from "react-router-dom"
import type { ProductType } from "../schemas/product.schemas"
import { useProductStore } from "../stores/useProductStore"

type Product = {
  product: ProductType&{ id: number }
}

const Product = ({ product }:Product) => {
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  const handleDelete = async (id: number) => {
     await deleteProduct(id);
  }

  return (
    <div>
       <p>{product.name}</p>
       <button onClick={() => handleDelete(product.id)}>Delete</button>
       <Link to={`/update/${product.id}`}>Update</Link>
    </div>
  )
}

export default Product
