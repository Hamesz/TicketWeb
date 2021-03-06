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

export const ContentWrap = styled.div`
width: 100%;
// height: 100vh;
// center everything within
display: flex;
flex-flow: column nowrap;
justify-content: center;
align-items: center;
background-color: #30323E;
// border: 1px solid green;
// padding-bottom: 100%;

.boxWrap {
    width: 90%;
    margin-top: 5%;
    height: 100%;

    // center everything within
    display: flex;
    flex-flow: column nowrap;
    flex: 1 1 auto;
    justify-content: center;
    align-items: center;
}

h3 {
    width: 100%;
    align-self: flex-center;
}
// -- Icon Code ---
.icon_code {
    width: 90%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;

    // Icon
    .icon {
        width: 30%;
    }
    .icon .static {
        width: 100%;
        height: 100%;
        transition: transform 0.5s linear;
    }
    
    .icon_code:hover .icon .static {
      transform: translateX(100%) translateY(100%) scale(150%);
    }
    
    .overlap-container {
      width: 30%;
      position: relative;
      top: 0;
      left: 0;
      border: 3px purple solid;
    }
    
    .image1 {
        position: relative;
        top: 0;
        left: 0;
        border: 1px red solid;
        z-index: 1;
        transition: transform 0.5s linear;
        width: 100%;
        height: 100%;
    }
    
    .image2 {
        position: absolute;
        top: 0px;
        left: 0px;
        border: 1px green solid;
        width: 100%;
        height: 100%;
    }
    
    .overlap-container:hover .image1 {
        transform: translateX(120%) translateY(200%) scale(150%);
    }

    // Code
    .code_gif {
        width: 70%;
        text-align: center;
        position: relative;
    }
    .code_gif img {
        width: 100%;
        height: 100%;
    }

    /* Centered Code */
    .code_text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        // font-size: 90px;
        font-size: 20vw;
        color: #FFFFFFFF ;
    }
}


// --- Time
table {
  border-collapse: collapse;
}

th,td {
}

table.a {
  table-layout: fixed;
  width: 70%;
  margin-top: 10%;

    .grid-item-text {
        font-size: 3vw;
        color: white;
        font-weight: normal;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 2%
        padding-right: 2%;
    }

    .grid-item-patch {
        margin-top: 0%;
        margin-left: 10%;
        margin-right: 10%;
        height: 10vw;
        border-radius: 10%;
        color: white;
        font-weight: normal;
        font-size: 5vw;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #6f7077;
        box-shadow: inset 2px 2px 5px #30323E;  //inset brings the shadow into the box
//        border: 1px solid black;
    }

    .grid-item-seconds {
        text-align: center;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        
        margin-top: 0%;
        margin-left: 10%;
        margin-right: 10%;
        height: 10vw;
        border-radius: 10%;
        color: white;
        font-weight: normal;
        font-size: 5vw;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #30323E;
        box-shadow: inset 2px 2px 5px #30323E;  //inset brings the shadow into the box
       // border: 1px solid black;

        .second-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 5vw;
            color: white;
            font-weight: normal;
        }

        .img {
            animation: rotation 8s infinite linear;
        }
    }
}

.rotate {
  animation: rotation 2s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

// --- Date
.date {
    width: 100%;
    margin-top: 0%;
    text-align: center;
    // background-color: green;
    font-size: 6vw;;
    color: white;
}

// --- Ticket
.ticket{
    width: 100%;
    background-color: #255681;
    margin-top: 10%;
    padding: 5%;
    text-align: center;
    font-size: 10vw;
    color: white;
}

// --- Passenger Info
.infoGrid {
    width: 100%;
    display: grid;
    background-color: #255681;
    grid-template-columns: 2fr 3fr;
    margin-top: 5%;
    color: white;
    margin-bottom: 5%;
    font-size: 4vw;
    border: red;
}

.grid-info-item-left {
    color: white;
    text-align: right;
    margin-right: 2%;
}

.grid-info-item-right {
    color: white;
    margin-bottom: 2%;
    word-wrap: break-word;
    word-break: break-all;
}

}

`;