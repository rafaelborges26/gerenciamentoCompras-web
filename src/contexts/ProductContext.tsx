import { createContext, ReactNode, useState, useCallback, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

export const ProductContext = createContext({} as ProductContextType )

interface IProducts {
    id?: string;
    name: string;
    description: string;
    price: number;
    created_date: string;
    quantity?: number;
}

type ProductContextType = {
    products: IProducts[] | undefined
    getProducts: () => Promise<void>
    createProducts: (name: string, description: string, price: number, created_date: string) => Promise<void>
    updateProducts: ( data: {id:string, name: string, description: string, price: number} ) => Promise<void>
    deleteProduct: (id: string) => Promise<void>
}

type ProductContextProps = {
    children: ReactNode
}

export function ProductContextProvider(props: ProductContextProps) {

    const { user } = useAuth();

    const [products, setProducts] = useState<IProducts[]>()

    const getProducts = async () => {
        const productsRef = await database.ref('products').get();
        
        const allProducts: IProducts = productsRef.val()

        if(allProducts) {

           const parsedProducts = Object.entries(allProducts).map(([key, value]) => {
            return {
                id: key,
                name: value.name,
                description: value.description,
                price: value.price,
                created_date: value.created_date
            }
    })

    setProducts(parsedProducts)
    } else {
        setProducts(undefined)
    }
            
    }


    const createProducts = useCallback( async(name: string, description: string, price: number, created_date: string) => {
        const productRef = database.ref('products')

    await productRef.push({
        name: name,
        description: description,
        price: price,
        created_date: created_date
    })  
    },[])
    
    const updateProducts = useCallback( async (data) => {
        
        const productRef = database.ref(`products/${data.id}`)

        await productRef.update({
            name: data.name,
            description: data.description,
            price: data.price,
        })

    },[])

    const deleteProduct = useCallback( async (id: string) => {
        
        await database.ref(`/products/${id}`).remove()        

    },[])

    useEffect(() => {
        if(user) {
            getProducts();
        }
    },[createProducts, user])

    return (
        <ProductContext.Provider value={{ products, createProducts, getProducts, updateProducts, deleteProduct }}>
            {props.children}
        </ProductContext.Provider>
    )
    
}
