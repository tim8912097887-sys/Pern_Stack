import { useEffect, useReducer } from "react"
import { useProductStore } from "../stores/useProductStore";
import type { ProductType } from "../schemas/product.schemas";

type Action = { type: 'name',name: string } | { type: 'price',price: number } | { type: 'image',image: string } | { type: 'reset' }

const reducer = (state: ProductType,action: Action) => {
   switch (action.type) {
    case "name":
        return { ...state,name: action.name };
    case "price":
        return { ...state,price: action.price };
    case "image":
        return { ...state, image: action.image };
    case "reset":
        return { name: "",image: "",price: 0 };
    default:
        return state;
   }
}

const Create = () => {

  const createProduct = useProductStore((state) => state.createProduct);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);
  const [state,dispatch] = useReducer(reducer,{ name: "",price: 0,image: "" });
  
  const setName = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'name',name: e.target.value });
  const setPrice = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'price',price: Number.isNaN(e.target.value)?0:parseInt(e.target.value) });
  const setImage = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'image',image: e.target.value });
  const reset = () => dispatch({ type: 'reset' });
  const handleClick = async () => {
    await createProduct(state);
  }
  useEffect(() => {
    if(error === "") reset();
  },[error])
  return (
    <div>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" onChange={setName} value={state.name} />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input type="number" min={0} id="price" onChange={setPrice} value={String(state.price)} />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input type="text" id="image" onChange={setImage} value={state.image} />
      </div>
      <button onClick={handleClick}>{(loading)?"Loading...":"Create"}</button>
      { error!=="" && error }
    </div>
  )
}

export default Create
