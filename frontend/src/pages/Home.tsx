import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore"

const Home = () => {

  const getProducts = useProductStore((state) => state.getProducts);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);
  const products = useProductStore((state) => state.products);

  useEffect(() => {
      getProducts();
  },[])
  return (
    <div>
      {loading && <div>Loading...</div>}
      {(error !== "") && <div>{error}</div>}
      {!loading && (error !== "") && products.map(product => {
        return <p>{product.name}</p>
      })}
    </div>
  )
}

export default Home
