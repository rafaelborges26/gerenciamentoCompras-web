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
        
        .ButtonsProducts {
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