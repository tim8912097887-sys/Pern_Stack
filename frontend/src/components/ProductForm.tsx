import { useEffect, useReducer, useState } from "react";
import { Product, type ProductType } from "../schemas/product.schemas";
import { useProductStore } from "../stores/useProductStore";

type ProductFormProps = { 
    formType: 'update' | 'create',
    id?: number 
}

type Action = { type: 'name',name: string } | { type: 'price',price: number } | { type: 'image',image: string } | { type: 'reset' } | { type: 'all',product: ProductType }

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
    case "all":
        return action.product;
    default:
        return state;
   }
}

const ProductForm = ({ formType,id }:ProductFormProps) => {
    const createProduct = useProductStore((state) => state.createProduct);
    const updateProduct = useProductStore((state) => state.updateProduct);
    const getProduct = useProductStore((state) => state.getProduct);
    const loading = useProductStore((state) => state.loading);
    const error = useProductStore((state) => state.error);
    const setError = useProductStore((state) => state.setError);

    // local state
    const [hasFetch,setHasFetch] = useState(formType==="create");
    const [state,dispatch] = useReducer(reducer,{ name: "",price: 0,image: "" });
    
    const setName = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'name',name: e.target.value });
    const setPrice = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'price',price: Number.isNaN(e.target.value)?0:parseInt(e.target.value) });
    const setImage = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'image',image: e.target.value });
    const setAll = (product: ProductType) => dispatch({ type: 'all',product });
    const reset = () => dispatch({ type: 'reset' });
    const handleCreate = async () => {
      await createProduct(state);
    }

    const handleUpdate = async () => {
        if(id) await updateProduct(id,state);
    }

    const handleClick = async () => {
        const result = Product.safeParse(state);
        if(!result.success) {
            setError(result.error.issues[0].message);
            return;
        }
        if(formType === 'create') {
           await handleCreate();
        } else {
           await handleUpdate();
        }
    }

    useEffect(() => {
      if(error === "" && formType === 'create') reset();
    },[error])

    useEffect(() => {
      const fetchProduct = async () => {
         if(id) {
            const product = await getProduct(id);
            setAll(product);
            setHasFetch(true);
         }
      }
      if(formType === 'update') fetchProduct();
    },[])

    if(formType === 'update' && !hasFetch) return <div>Loading...</div>;
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
        <button onClick={handleClick}>{(loading)?"Loading...":(formType === 'create')?"Create":"Update"}</button>
        { error!=="" && error }
      </div>
    )
}

export default ProductForm
