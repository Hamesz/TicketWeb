import styled from "styled-components";

export const ContentWrap = styled.div`
width: 100%;
// center everything within
display: flex;
flex-flow: column nowrap;
justify-content: center;
align-items: center;

.boxWrap {
    width: 90%;
    margin-top: 5%;

    // center everything within
    display: flex;
    flex-flow: column nowrap;
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
    .icon img {
        width: 100%;
        height: 100%;
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

    .grid-item-seconds{
        // margin-left: 10%;
        // margin-right: 50%;
        text-align: center;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

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