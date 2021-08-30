import styled from "styled-components";

export const ContentWrap = styled.div`
    width: 100%;
    // border: 1px solid green;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    h3 {
        width: 100%;
        align-self: flex-center;
    }

    .boxWrap {
        width: 90%;
        margin-top: 8%;
        .icon_code {
            width: 100%;
            // background-color: gray;
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
            font-size: 22vw;
            color: #FFFFFFFF ;
            }

        }

        .timeGrid {
            width: 80%;
            margin-left: 10%;
            margin-right: 10%;
            display: inline-grid;
            // background-color: green;
            grid-template-columns: 1fr 1fr 1fr;
            margin-top: 40px;
            text-align: center;
            
        }

        .grid-item_text {
            font-size: 4vw;;
            color: white;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            // border: 2px solid black;
            // padding: 0%
          }

        .grid-item_patch {
            // margin will determine the shape of the
            // patch
            margin: 22%;
            // margin-left: 15%;
            // margin-right: 15%;

            border-radius: 25%;
            background-color: gray;
            color: white;
            font-size: 6vw;
            display: flex;
            justify-content: center;
            align-items: center;
            // border: 2px solid black;
        }

        .grid-item-seconds{
            margin: 20%;
            // margin-left: 10%;
            // margin-right: 50%;
            text-align: center;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            // border: 2px solid black;

            .second_text {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 6vw;
                color: white;
            }

        }
        .grid-item-seconds img {
            max-width: 100%;
            max-height: 100%;
        }

        .date {
            width: 100%;
            margin-top: 2%;
            text-align: center;
            // background-color: green;
            font-size: 5vw;;
            color: white;
        }

        .ticket{
            width: 100%;
            background-color: #2F5E8A;
            margin-top: 10%;
            padding: 4%;
            text-align: center;
            font-size: 9vw;
            color: white;
        }

        .infoGrid {
            width: 100%;
            display: grid;
            background-color: #2F5E8A;
            grid-template-columns: 1fr 1fr;
            margin-top: 5%;
            color: white;
            margin-bottom: 5%;
            font-size: 4vw;
        }

        .grid-info-item-left {
            color: white;
            text-align: right;
            margin-right: 10%;
        }

        .grid-info-item-right {
            color: white;
            margin-bottom: 5%;
        }

    }

`;