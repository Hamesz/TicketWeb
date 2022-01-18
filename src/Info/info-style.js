import styled from "styled-components";

export const InfoWrap = styled.div`
.title{
    color: white;
    text-align: center;
    font-weight: bold;
    font-size: 30px;
}

.title-black{
    color: black;
    text-align: center;
    font-weight: bold;
    font-size: 30px;
}

.instructions{
    color: black;
    font-size: 12px;
    text-align: center;
    ol {
        text-align: left;
        padding-left: 10%;
    }

    li {
        margin: 10px 0;
    }
}

.info{
    color: white;
    text-align: center;
    font-size: 16px;
    padding: 5px;
    // border: 1px solid black;
}

.info-black{
    color: black;
    text-align: center;
    font-size: 12px;
}

.infoGrid {
    border: 1px solid black;
    max-width: 100vw;
    padding-bottom:1%;
    display: grid;
    grid-template-columns: 1fr;
    background-color: white;
}

.infoGrid-no-border {
    // border: 1px solid black;
    max-width: 100vw;
    padding-bottom:1%;
    display: grid;
    grid-template-columns: 1fr;
    background-color: white;
}

.infoGridDevices {
    width: 100vw;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.infoItem {
    .ol {
        padding-left: 10px;
    }
    border: 1px solid black;
    border-top: 0px solid black;
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