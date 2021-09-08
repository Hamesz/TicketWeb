import styled from "styled-components";

export const ContentWrap = styled.div`
.title{
    color: white;
    text-align: center;
    font-weight: bold;
    font-size: 30px;
}

.info{
    color: white;
    text-align: center;
    font-size: 16px;
    padding: 5px;
    // border: 1px solid black;
}

.infoGrid {
    max-width: 100vw;
    margin-top:1%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: white;
}

.infoItemLeft {
    border-right: 1px solid black;
    font-weight: 500;
    border-bottom: 1px solid black;
    background-color: white;
    padding:5px;
    color: black;
    font-size: 20px;
    display: inline-block;
}

.infoItemRight {
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    background-color: white;
    color: black;
    padding: 10px 0;
    font-size: 16px;
    display: inline-block;
    padding-left:5px;
}



`;

