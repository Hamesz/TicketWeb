import styled from "styled-components";

export const NavigationWrap = styled.div`
.navigationGrid {
    width: 100vw;
    display: grid;
    background-color: green;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
}


/* Button */
.navigationItem {
    border: 1px solid white;
    background-color: black;
    font-weight: bold;
    color: white;
    // padding: 14px 28px;
    font-size: 14px;
    cursor: pointer;
    display: inline-block;
}
  
/* On mouse-over */
.navigationItem:hover {background: grey;}

`;