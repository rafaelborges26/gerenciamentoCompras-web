import styled from 'styled-components'

export const Container = styled.div`
    position: relative;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 50px;

    align-items: center;
    justify-content: center;

    form {
        padding: 20px 30px;
        
        .ButtonsClient {
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
        padding: 10px 5px 10px 5px;
        text-align: left;

        gap: 10px;

        svg {
            margin-left: 12px;
            cursor: pointer;

            width: 20px;
            height: 20px;
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
        padding: 15px;
        text-align: left;
    }
`