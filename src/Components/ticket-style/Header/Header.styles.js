import styled from "styled-components";

export const HeaderWrap = styled.div`
width: 100%;
//padding: 5%;
background-color: white;

.grid {
    width: 100%;
    display: flex;
    display: flex;
//    border: 1px solid #000;
    align-items: center;

    .grid-item-text {
        font-size: 6vw;
        color: #7a1a1f;
        font-weight: bold;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 12;
        text-align: center;
    }

    img {
        max-width:10%;
        max-height:10%;
        z-index:1;
        flex: 1;
        text-align: center;
    }
}

.grid:after {
  content: " ";
  display: block;
  flex: 1;
}

`;