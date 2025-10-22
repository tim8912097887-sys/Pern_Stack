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
    </div>
  )
}

export default Product
