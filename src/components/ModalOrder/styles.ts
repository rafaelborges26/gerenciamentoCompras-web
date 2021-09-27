import styled from 'styled-components'

export const Container = styled.div`
    max-width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 50px;

    align-items: center;
    justify-content: center;
    
    form {
        padding: 20px 60px;
        
        .ButtonsOrders {
            display: flex;
            flex-direction: row;
            gap: 12px;
        }
    }

    .headerTable {
        align-items: flex-end;
        justify-content: flex-end;
        width: 100%;
    }
    
`

export const TableCllient = styled.table`
    width: 100%;
    height: 100%;

    justify-content: center;

    margin-top: 20px;

    border-top: 8px solid #cedee7;
    border-bottom: 1px solid #ccc;

    background: #fff;

    span {
        font-size: 18px;

        @media (max-width: 660px) {
            font-size: 13px;
        }
    }

    p {
        font-size: 16px;

        @media (max-width: 660px) {
            font-size: 10px;
        }
    }

    table {
        overflow-x: auto;
        width: 100%;
    }

    td {
        padding: 15px;
        text-align: left;
        
        gap: 10px;

        svg + svg {
            margin-left: 12px;
        }

        svg {
            cursor: pointer;
        }

        @media (max-width: 660px) {
            padding: 5px;
        }
    }


    th {
        height: 40px;
        padding: 15px;
        text-align: left;
    }


`

export const ListProductsSelected = styled.div`
    display: flex;
    flex-direction: column;

    h4 {
        opacity: 0.7;
        font-weight: 500;
    }
    
    margin: 20px;
    
`;

export const ValueTotal = styled.div`
    display: flex;
    
    align-items: center;
    justify-content: end;
    gap: 5px;
    padding: 5px;
    margin-bottom: 10px;

    span {
        font-size: 16px;
    }

    h5 {
        font-size: 20px;
        color: #fc7825;
    }
    
`;

export const EditProducts = styled.div`
    display: flex;
    gap: 10px;
    align-items: flex-end;
    justify-content: space-between;

    border: 1px solid #ccc;
    margin: 5px;
    padding: 5px;



    svg {
        align-items: center;
        color: black;
        cursor: pointer;
        
    }
`;

export const QuantityProducts = styled.div`
    display: flex;
    flex-direction: row;
    
    gap: 5px;
    svg {
        color: #228B22;
        cursor: pointer;
    }
`