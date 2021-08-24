import styled from "styled-components";

export const ContentWrap = styled.div`
    width: 100%;
    // border: 1px solid green;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    .ticketView {
        width: 80%;
        margin: 10%;
        margin-bottom: 3%;
        // border-radius: 10px;
        border: 1px solid black;
        background-color: black;

        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;

        h1 {
            color: white
        }

        .bodyBox{
            width: 100%;
            border: 1px solid black;
            background-color: white;

            .times{
                color: grey;
                font-size: 3vw;
                font-weight: bold;
            }

            .info {
                color: black;
                font-size: 3vw;
            }
        }



    }
`;

