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

    word-wrap: break-word;
    word-break: break-all;
}

.update-btc-wallet-address-grid{
    max-width: 100%;
    margin-top:1%;
    display: grid;
    border: 2px solid green;
    border-radius: 4px;
    text-align: center;
    grid-template-columns: 1fr;
    background-color: white;
}

.new-btc-wallet-address-label{
    margin-top:1%;
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
}

.new-btc-wallet-address-input{
    margin-left: 5%;
    margin-right: 5%;
    background-color: white;
    color: black;
    padding: 14px 20px;
    border: 2px solid black;
    border-radius: 4px;
    cursor: pointer;
    display: inline-block;
    font-size: 10px;
}

.change-btc-wallet-address-btn{
    background-color: black; /* Green */
    border: 1px solid white;
    margin: 10px;
    color: white;
    padding: 12px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    display: inline-block;
}

`;

