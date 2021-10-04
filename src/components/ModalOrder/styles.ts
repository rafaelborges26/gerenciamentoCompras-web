import styled from 'styled-components'

export const Container = styled.div`
    max-width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 50px;

    align-items: center;
    justify-content: center;
    
    form {
        padding: 20px 30px;
        
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
        margin-left: 12px;
    }
    
`

export const EmptyList = styled.h2`
    margin-top: 300px;
`;

export const TableContainer = styled.div`
    height: 80%;
    width: 100%;
     
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }

`

export const TableCllient = styled.table`
    height: 100%;
    width: 100%;
    padding: 0 5px;

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
        width: 100%;
        overflow-x: auto;

        &::-webkit-scrollbar {
          width: 2px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 2px;
          background: #ccc;
        }

    }

    td {
        padding: 15px;
        text-align: left;
        
        gap: 10px;

        svg {
            margin-left: 12px;
            cursor: pointer;
        }

        @media (max-width: 660px) {
            padding: 5px;
            gap: 12px;

            svg {
                width: 15px;
                height: 15px;
            }
        }
    }


    th {
        height: 40px;
        padding: 10px;
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