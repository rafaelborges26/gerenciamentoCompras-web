import { useEffect } from 'react'
import { useCallback } from 'react'
import { createContext, ReactNode, useState } from 'react'
import { database } from '../services/firebase'
import { format } from 'date-fns'

export const OrderContext = createContext({} as OrderContextType )

interface IOrders {
    id: string;
    client: string;
    price_total: number;
    quantity_parcels: string;
    type_payment: string;
    products: [],
    created_date: string;
}

interface IParcels {
    id: string;
    id_order: string,
    due_date: string,
    qt_parcel: number,
    value: number,
    status_payment: boolean,
}

interface IProductsList {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    created_date?: string;
    quantity?: number;
}


type OrderContextType = {
    orders: IOrders[] | undefined
    parcels: IParcels[] | undefined
    getOrders: () => Promise<void>
    createOrders: (price_total: number, type_payment: string, quantity_parcels: number, products: IProductsList[], client: string, parcelDue1: string, parcelDue2: string, parcelDue3: string, parcelDue4: string) => Promise<void>
    getParcels: () => Promise<void>
    payParcel: (idParcel: string) => Promise<void>
}

type OrderContextProps = {
    children: ReactNode
}

export function OrderContextProvider(props: OrderContextProps) {

    const [orders, setOrders] = useState<IOrders[]>()
    const [parcels, setParcels] = useState<IParcels[]>()

    const getOrders = async () => {
        const OrdersRef = await database.ref('orders').get();
        
        const allOrders: IOrders = OrdersRef.val()

           const parsedOrders = Object.entries(allOrders).map(([key, value]) => {
            return {
                id: key,
                client: value.client,
                price_total: value.price_total,
                quantity_parcels: value.quantity_parcels,
                type_payment: value.type_payment,
                products: value.products,
                created_date: value.created_date
            }
    })

    setOrders(parsedOrders)
   
        console.log(parsedOrders)
    }
    
    const getParcels = async () => {
        const OrdersRef = await database.ref('parcels').get();
        
        const allParcels: IParcels = OrdersRef.val()

           const parsedOrders = Object.entries(allParcels).map(([key, value]) => {
            return {
                id: key,
                id_order: value.id_order,
                due_date: value.due_date,
                qt_parcel: value.qt_parcel,
                value: value.value,
                products: value.products,
                created_date: value.created_date,
                status_payment: value.status_payment
            }
            
         })

    setParcels(parsedOrders)
   
        console.log(parsedOrders)
    }

    const payParcel = useCallback( async (parcelId: string) => {

        const parcelRef = database.ref(`parcels/${parcelId}`)
        
        await parcelRef.update({
            status_payment: true,
        })
    },[])
     

    const createOrders = useCallback( async(price_total: number, type_payment: string, quantity_parcels: number, products: IProductsList[], client: string, parcelDue1: string, parcelDue2: string, parcelDue3: string, parcelDue4: string ) => {
        
        const formattedDate = format(new Date(), 'dd/mm/yyyy');

        const valueParcel = price_total / quantity_parcels;


        const orderRef = database.ref('orders')

        const firebaseOrder = await orderRef.push({
            price_total,
            type_payment,
            quantity_parcels,
            products,
            client,
            created_date: formattedDate,
        })

        const idOrder = firebaseOrder.key

        const parcelsDue = [parcelDue1, parcelDue2, parcelDue3, parcelDue4]

        //criar parcels
        //add data de vencimento
        const parcelsRef = database.ref('parcels')

        for (let repeatParcel = 0; repeatParcel < quantity_parcels; repeatParcel++) {
            await parcelsRef.push({
                value: valueParcel,
                qt_parcel: repeatParcel + 1,
                due_date: parcelsDue[repeatParcel], 
                id_order: idOrder, 
                status_payment: false,
            })
        }


    },[])

    

    useEffect(() => {
       getOrders();
       getParcels();
    },[createOrders, payParcel])

    return (
        <OrderContext.Provider value={{ orders, parcels, createOrders, getOrders, getParcels, payParcel }}>
            {props.children}
        </OrderContext.Provider>
    )
    
}
