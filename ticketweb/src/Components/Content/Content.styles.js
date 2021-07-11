import styled from "styled-components";

export const ContentWrap = styled.div`
    width: 100%;
    border: 1px solid green;
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

        .icon_code {
            width: 100%;
            background-color: gray;
            margin-top: 5px;
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
            font-size: 90px;
            font-size: 22vw;
            color: #FFFFFFFF ;
            }

        }

        .timeGrid {
            width: 80%;
            margin-left: 10%;
            margin-right: 10%;
            display: grid;
            // background-color: green;
            grid-template-columns: 1fr 1fr 1fr;
            margin-top: 40px;
            text-align: center;
        }

        .grid-item_text {
            font-size: 5hh;
            color: white;
            font-weight: bold;
          }

        .grid-item_patch {
            margin: 10px;
            margin-left: 20px;
            margin-right: 20px;
            padding: 10px;
            border-radius: 10px;
            background-color: gray;
            color: white;
            font-size: 20px;
        }

        .grid-item-seconds{
            margin: 10px;
            margin-left: 20px;
            margin-right: 20px;
            text-align: center;
            position: relative;

            .second_text {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 20px;
                color: white;
            }

        }
        .grid-item-seconds img {
            max-width: 100%;
            max-height: 100%;
        }

        .date {
            width: 100%;
            margin-top: 5px;
            text-align: center;
            // background-color: green;
            font-size: 2.5vh;
            color: white;
        }

        .ticket{
            width: 100%;
            // height: 100px;
            background-color: #2F5E8A;
            margin-top: 30px;
            text-align: center;
            font-size: 5vh;
            color: white;
        }

        .infoGrid {
            width: 100%;
            // margin-left: 10%;
            // margin-right: 10%;
            display: grid;
            background-color: #2F5E8A;
            grid-template-columns: 1fr 1fr;
            margin-top: 20px;
            color: white;
            // text-align: center;
        }

        .grid-info-item-left {
            font-size: 5hh;
            color: white;
            font-weight: bold;
            text-align: right;
            margin-right: 10px;
        }

        .grid-info-item-right {
            font-size: 5hh;
            color: white;
            
        }

    }

`;