import { useEffect } from 'react'
import { useCallback } from 'react'
import { createContext, ReactNode, useState } from 'react'
import { database } from '../services/firebase'

export const ProductContext = createContext({} as ProductContextType )

interface IProducts {
    id?: string;
    name: string;
    description: string;
    price: string;
    created_date: string;
}

type ProductContextType = {
    products: IProducts[] | undefined
    getProducts: () => Promise<void>
    createProducts: (name: string, description: string, price: string, created_date: string) => Promise<void>
}

type ProductContextProps = {
    children: ReactNode
}

export function ProductContextProvider(props: ProductContextProps) {

    const [products, setProducts] = useState<IProducts[]>()

    const getProducts = async () => {
        const productsRef = await database.ref('products').get();
        
        const allProducts: IProducts = productsRef.val()

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
   
        console.log(parsedProducts)
    }


    const createProducts = useCallback( async(name: string, description: string, price: string, created_date: string) => {
        const productRef = database.ref('products')

    await productRef.push({
        name: name,
        description: description,
        price: price,
        created_date: created_date
    })  
    },[])

    useEffect(() => {
        getProducts();
    },[createProducts])

    return (
        <ProductContext.Provider value={{ products, createProducts, getProducts }}>
            {props.children}
        </ProductContext.Provider>
    )
    
}
