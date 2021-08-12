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
        
        .ButtonsClient {
            display: flex;
            flex-direction: row;
            gap: 12px;
        }
    }
    
`

export const Table = styled.table`
    width: 100%;
    height: 100%;

    justify-content: center;

    //display: flex;

    margin-top: 20px;

    border-top: 8px solid #cedee7;
    border-bottom: 1px solid #ccc;

    background: #fff;

    span {
        font-size: 18px;
    }

    p {
            font-size: 16px;
    }

    .headerTable {
        display: flex;
        justify-content: space-between;
    }



    tr {
        border-top: 3px solid #ccc;
        
    }


`