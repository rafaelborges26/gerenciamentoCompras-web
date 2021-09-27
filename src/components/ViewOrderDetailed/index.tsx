import React, { HTMLAttributes, useState, useEffect } from 'react';
import { Container, Table } from './styles'
import Button from '../ButtonForm';
import { IoIosClose } from 'react-icons/io'
import { useOrder } from '../../hooks/useOrder'

import formatReal from '../../utils/formatReal'

type ViewOrderDetailedProps = HTMLAttributes<HTMLDivElement> & {
    orderId: string;
    isOpen: boolean;
    onClose: () => void;
}

interface IParcels {
    id: string;
    id_order: string;
    due_date: string;
    qt_parcel: number;
    value: number;
    status_payment: boolean;
}


    const ViewOrderDetailed: React.FC<ViewOrderDetailedProps> = ({orderId, isOpen, ...props}: ViewOrderDetailedProps) => {
    const { parcels, getParcels, payParcel } = useOrder()

    const [parcel, setParcel] = useState<IParcels[]>([])
    
        const filterParcels = () => {
            const parcelFound: IParcels[] | undefined = parcels?.filter(parce => parce.id_order === orderId)

            if(parcelFound){
                setParcel(parcelFound)
            }
        }

        const handlePayParcel = async (payId: string) => {
            await payParcel(payId)

            getParcels();
            props.onClose();
        }


    useEffect(() => {      
        filterParcels()
    },[isOpen])

    useEffect(() => {
        getParcels()
    },[])
    

    return (
        <Container
        {...props}
        isOpen={isOpen}
        >
            < IoIosClose size={30} onClick={() => props.onClose()} />
            <Table>
                        <thead>
                        <tr key={"header"}>
                            <th><span>Valor da parcela</span></th>
                            <th><span>Vencimento das Parcelas</span></th>
                            <th><span>Pagamento</span></th>
                        </tr>
                        </thead>
                <tbody>
                    {parcel.map(parc => 
                        (
                            <tr>
                        <>
                            <td><p>{formatReal(parc.value)}</p></td>
                            <td><p>{parc.due_date}</p></td>
                            <td><p>{parc.status_payment ? 'Pago' : (<Button title="pay" name="Realizou Pagamento" onClick={() => handlePayParcel(parc.id)} colorBackground="red" />)}</p></td>
                        </>
                        </tr>
                        )
                    )}
                        
                    </tbody>
                    </Table>

        </Container>
        
    )
}

export default ViewOrderDetailed