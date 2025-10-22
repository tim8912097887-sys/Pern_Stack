import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore"
import Product from "./Product";

const Home = () => {

  const getProducts = useProductStore((state) => state.getProducts);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);
  const products = useProductStore((state) => state.products);

  useEffect(() => {
      getProducts();
  },[products])
  return (
    <div>
      {loading && <div>Loading...</div>}
      {(error !== "") && <div>{error}</div>}
      {!loading && (error !== "") && products.map(product => {
        return <Product key={product.id} product={product} />
      })}
    </div>
  )
}

export default Home
