import React, { HTMLAttributes, useState, useEffect, FormEvent, useCallback } from 'react';
import { Container, Header, Content } from './styles'
import Button from '../ButtonForm';
import { IoIosClose } from 'react-icons/io'
import { useProduct } from '../../hooks/useProduct'
import { useClient } from '../../hooks/useClient'

import Input from '../Input'
import { database } from '../../services/firebase';
import { formatAllValue } from '../../utils/formatNumber'

type ViewOrderDetailedProps = HTMLAttributes<HTMLDivElement> & {
    idSelected: string;
    isOpen: boolean;
    onClose: () => void;
    typeModal: 'product' | 'client';
}

interface IParcels {
    id: string;
    id_order: string;
    due_date: string;
    qt_parcel: number;
    value: number;
    status_payment: boolean;
}


    const ModalUpdate: React.FC<ViewOrderDetailedProps> = ({idSelected, isOpen, ...props}: ViewOrderDetailedProps) => {

        const { typeModal ,onClose } = props

        const { products, updateProducts } = useProduct()
        const { clients, updateClients } = useClient()

    //Products
    const [nameSelected, setNameSelected] = useState('')
    const [descriptionSelected, setDescriptionSelected] = useState('')
    const [priceSelected, setPriceSelected] = useState<string | number>('')

    //Clients
    const [nameClientSelected, setNameClientSelected] = useState('')
    const [emailSelected, setEmailSelected] = useState('')
    const [adressSelected, setAdressSelected] = useState('')


    const getProductSelected = () => {
        const productFound = products?.find(product => product.id === idSelected)

        

        if(productFound){
            const { name, description, price } = productFound;

            setNameSelected(name)
            setDescriptionSelected(description)
            setPriceSelected(price)
        }
    }

    const getClientsSelected = () => {
        const clientFound = clients?.find(client => client.id === idSelected)

        

        if(clientFound){
            const { name, email, adress } = clientFound;

            setNameClientSelected(name)
            setEmailSelected(email)
            setAdressSelected(adress)
        }
    }

    const handleUpdateProduct = async (event: FormEvent) => {

        event.preventDefault()

        if(nameSelected.trim() === '' || descriptionSelected.trim() === ''){
            alert("É Necessário preencher os campos para atualizar.")
        }
        
        const dataUpdated = {
            id: idSelected,
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

    const handleUpdateClient = async (event: FormEvent) => {

        event.preventDefault()

        if(nameClientSelected.trim() === '' || emailSelected.trim() === '' || adressSelected.trim() === ''){
            alert("É Necessário preencher os campos para atualizar.")
        }
        
        const dataUpdated = {
            id: idSelected,
            name: nameClientSelected,
            email: emailSelected,
            adress: adressSelected,
        }

        try {
            await updateClients(dataUpdated);    
        } catch (error) {
            alert("Ocorreu um erro ao tentar atualizar, tente novamente.")
        }
        
        onClose();
    }

    useEffect(() => {
        if(typeModal === 'product')
            getProductSelected()
        else getClientsSelected()
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

                {typeModal === 'product' ? (
                    <form onSubmit={handleUpdateProduct}>
                    <Input title="Nome" hide={false} sizeWidth="S" name="Nome" value={nameSelected} onChange={ event => setNameSelected(event.target.value) } />
                    <Input title="Descrição" hide={false} sizeWidth="S" name="Descrição" value={descriptionSelected} onChange={ event => setDescriptionSelected(event.target.value) } />
                    <Input title="Preço" type="number" hide={false} sizeWidth="S" name="Preço" value={priceSelected} onChange={ event => setPriceSelected(event.target.value) } />
                    <div className="ButtonsUpdate" >
                        <Button name="Alterar" title="Alterar" colorBackground="green" type="submit" />
                        <Button name="Cancelar" title="Cancelar" colorBackground="red" type="button" onClick={() => onClose()} />
                    </div>
                </form>
                ) : (
                    <form onSubmit={handleUpdateClient}>
                    <Input title="Nome" hide={false} sizeWidth="S" name="Nome" value={nameClientSelected} onChange={ event => setNameClientSelected(event.target.value) } />
                    <Input title="E-mail" hide={false} sizeWidth="S" name="E-mail" value={emailSelected} onChange={ event => setEmailSelected(event.target.value) } />
                    <Input title="Endereço" hide={false} sizeWidth="S" name="Endereço" value={adressSelected} onChange={ event => setAdressSelected(event.target.value) } />
                    <div className="ButtonsUpdate" >
                        <Button name="Alterar" title="Alterar" colorBackground="green" type="submit" />
                        <Button name="Cancelar" title="Cancelar" colorBackground="red" type="button" onClick={() => onClose()} />
                    </div>
                </form>
                )
                    }  

            </Content>
        </Container>
        
    )
}

export default ModalUpdate