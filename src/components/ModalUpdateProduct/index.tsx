import React, { HTMLAttributes, useState, useEffect, FormEvent, useCallback } from 'react';
import { Container, Header, Content } from './styles'
import Button from '../ButtonForm';
import { IoIosClose } from 'react-icons/io'
import { useProduct } from '../../hooks/useProduct'

import Input from '../Input'
import { database } from '../../services/firebase';
import { formatAllValue } from '../../utils/formatNumber'

type ViewOrderDetailedProps = HTMLAttributes<HTMLDivElement> & {
    productId: string;
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


    const ViewOrderDetailed: React.FC<ViewOrderDetailedProps> = ({productId, isOpen, ...props}: ViewOrderDetailedProps) => {

        const { onClose } = props

        const { products, updateProducts } = useProduct()

    const [nameSelected, setNameSelected] = useState('')
    const [descriptionSelected, setDescriptionSelected] = useState('')
    const [priceSelected, setPriceSelected] = useState<string | number>('')

    const getProductSelected = () => {
        const productFound = products?.find(product => product.id === productId)

        

        if(productFound){
            const { name, description, price } = productFound;

            setNameSelected(name)
            setDescriptionSelected(description)
            setPriceSelected(price)
        }
    }

    const handleUpdateProduct = async (event: FormEvent) => {

        event.preventDefault()

        if(nameSelected.trim() === '' || descriptionSelected.trim() === ''){
            alert("É Necessário preencher os campos para atualizar.")
        }
        
        const dataUpdated = {
            id: productId,
            name: nameSelected,
            description: descriptionSelected,
            price: Number(priceSelected),
        }

        try {
            await updateProducts(dataUpdated);    
        } catch (error) {
            alert("Ocorreu um erro ao tentar atualizar, tente novamente.")
        }
        
        onClose();
    }

    useEffect(() => {
        getProductSelected()
    },[isOpen])

    return (
        <Container
        {...props}
        isOpen={isOpen}
        >
            <Header>
                <IoIosClose size={30} onClick={() => onClose()} />
            </Header>
            <Content>
                <form onSubmit={handleUpdateProduct}>
                    <Input title="Nome" hide={false} sizeWidth="S" name="Nome" value={nameSelected} onChange={ event => setNameSelected(event.target.value) } />
                    <Input title="Descrição" hide={false} sizeWidth="S" name="Descrição" value={descriptionSelected} onChange={ event => setDescriptionSelected(event.target.value) } />
                    <Input title="Preço" type="number" hide={false} sizeWidth="S" name="Preço" value={priceSelected} onChange={ event => setPriceSelected(event.target.value) } />
                    <div className="ButtonsUpdate" >
                        <Button name="Alterar" title="Alterar" colorBackground="green" type="submit" />
                        <Button name="Cancelar" title="Cancelar" colorBackground="red" type="button" onClick={() => onClose()} />
                    </div>
                </form>
            </Content>
        </Container>
        
    )
}

export default ViewOrderDetailed