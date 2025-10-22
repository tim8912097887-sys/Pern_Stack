import { useParams } from "react-router-dom"
import ProductForm from "../components/ProductForm";

const Update = () => {
  
  const { id } = useParams();
  if(Number.isNaN(id) || !id) return <div>Not Found</div>
 
  return (
    <div>
      <ProductForm formType="update" id={parseInt(id)} />
    </div>
  )
}

export default Update
