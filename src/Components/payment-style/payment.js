import Navigation from "../navigation-style/Navigation";
import { AppWrap } from "../../App.styles";
import Content from "./Content/Content";

export default function Payment({routes, onClickRoute, paymentInfo, bankInfo, BTCAmount}){
    return (
        <AppWrap>
           <Navigation
                routes = {routes}
                onClickRoute = {(idx) => {onClickRoute(idx)}}
           />
          <Content 
            paymentInfo = {paymentInfo}
            bankInfo = {bankInfo}
            BTCAmount = {BTCAmount}
          />
        </AppWrap>
    );
}