import styled from "styled-components";

export const HeaderWrap = styled.div`
    width: 100%;
    height: 30%;
    // border: 1px solid blue;
    padding: 0%;
    background-color: white;



    h1 {
        text-align: center;
        color: #0;
    }

    img {
        width: 50%;
        margin: 10%;
        // margin-left: 20%;
        // margin-right:20%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .headerGrid {
        width: 100%;
        height: 100%;
        display: inline-grid;
        // background-color: green;
        grid-template-columns: 1fr 5fr 1fr 1fr;
        grid-gap: 3%;
    }

    .grid-item-text {
        font-size: 8vw;
        color: black;
        // display: flex;
        justify-content: center;
        align-items: center;

        white-space: nowrap; 
        overflow: hidden;
        text-overflow: ellipsis; 

        // border: 2px solid black;
    }

    .grid-item {
        display: flex;
        justify-content: center;
        align-items: center;

        // border: 2px solid black;
    }

    .grid-item-arrow {
        display: flex;
        justify-content: center;
        align-items: center;
    }

`;