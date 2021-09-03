import styled from "styled-components";

export const ContentWrap = styled.div`
.infoGrid {
    width: 100vw;
    margin-top:1%;
    display: grid;
    // background-color: silver;
    grid-template-columns: 1fr 1fr;
    // text-align: center;
    // grid-column-gap: 2%;
}

.infoItem {
    border: 1px solid black;
    background-color: white;
    // margin-left:1%;
    // margin-right:1%;
    padding:10%;
    // font-weight: bold;
    color: black;
    // padding: 14px 28px;
    font-size: 12px;
    cursor: pointer;
    display: inline-block;
    max-width: 100%;
    
    img {
        border: 1px solid black;
        max-width: 100%;
    }
}


`;

