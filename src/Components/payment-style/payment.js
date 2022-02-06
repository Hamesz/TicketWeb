import Navigation from "../navigation-style/Navigation";
import { AppWrap } from "../../App.styles";
import Content from "./Content/Content";

// export default function Payment({routes, onClickRoute, userPayment, reference, userBTCWallet, onBTCWalletAddresClick}){
//   return (
//     <AppWrap>
//       <Navigation
//         routes = {routes}
//         onClickRoute = {(idx) => {onClickRoute(idx)}}
//       />
//       <Content 
//         userPayment = {userPayment}
//         reference = {reference}
//         userBTCWallet = {userBTCWallet}
//         onBTCWalletAddresClick = {(address) => {onBTCWalletAddresClick(address)}}
//       />
//     </AppWrap>
//   );
// }

export default function Payment({userPayment, reference, userBTCWallet, onBTCWalletAddresClick}){
  return (
    <AppWrap>
      <Content 
        userPayment = {userPayment}
        reference = {reference}
        userBTCWallet = {userBTCWallet}
        onBTCWalletAddresClick = {(address) => {onBTCWalletAddresClick(address)}}
      />
    </AppWrap>
  );
}