import { create } from "zustand"
import { productAxios } from "../config/axiosInstance"
import type { ProductType } from "../schemas/product.schemas"

type State = {
    products: (ProductType&{id: number})[]
    error: string
    loading: boolean
}
type CrudAction = {
   createProduct: (product: ProductType) => Promise<void>
   getProduct: (id: number) => Promise<ProductType&{ id: number }>
   deleteProduct: (id: number) => Promise<void>
   updateProduct: (id: number,product: ProductType) => Promise<void>
   getProducts: () => Promise<void>
}

export const useProductStore = create<State & CrudAction>(
    (set,get) => ({
       products: [],
       error: "",
       loading: true,
       createProduct: async (product: ProductType) => {
        set({ loading: true });
        try {
          const response = await productAxios({ method: 'post',url: "/",data: product });

           set((state) => (
            {
               products: [...state.products,response.data?.data],
               error: ""
            }
           ))   
        } catch (error: any) {
            if(error.response) {
               set({ error: error.response.data?.message });
            } else {
               set({ error: error?.message });
            }
        } finally {
            set({ loading: false });
        }
       }, 
       getProducts: async () => {
        set({ loading: true });
        try {
          const response = await productAxios({ url: "/" });

           set({
               products: response.data?.data,
               error: ""
            })   
        } catch (error: any) {
            if(error.response) {
               set({ error: error.response.data?.message });
            } else {
               set({ error: error?.message });
            }
        } finally {
            set({ loading: false });
        }
       }, 
       getProduct: async (id: number) => {
        set({ loading: true });
        try {
          const response = await productAxios({ url: `/${id}` });
          return response.data.data; 
        } catch (error: any) {
            if(error.response) {
               set({ error: error.response.data?.message });
            } else {
               set({ error: error?.message });
            }
        } finally {
            set({ loading: false });
        }
       }, 
       deleteProduct: async (id: number) => {
        set({ loading: true });
        try {
          await productAxios({ method: 'delete', url: `/${id}` });
          
          set((state) => ({
             products: state.products.filter(product => product.id !== id)
          }))
        } catch (error: any) {
            if(error.response) {
               set({ error: error.response.data?.message });
            } else {
               set({ error: error?.message });
            }
        } finally {
            set({ loading: false });
        }
       }, 
       updateProduct: async (id: number,product: ProductType) => {
        set({ loading: true });
        try {
          const response = await productAxios({ method: 'put', url: `/${id}`,data: product });
          
          set((state) => ({
             products: state.products.map(product => {
                if(product.id === id) return response.data.data;
                return product;
             })
          }))
        } catch (error: any) {
            if(error.response) {
               set({ error: error.response.data?.message });
            } else {
               set({ error: error?.message });
            }
        } finally {
            set({ loading: false });
        }
       } 
    })
)