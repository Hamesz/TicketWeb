import Payment from "../Components/payment-style/payment";

export function PaymentState(user, routes, handleOnClickRoute, handleBTCWalletAddresClick, userPayment){
    console.log('User: ', user);
    // console.log("Payment Details info within PaymentState: ", paymentDetails);
    // check if auth data is undefined (just logged out)
    let user_BTC_Wallet;
    let reference = "";
    if (!user){
        // console.debug(`User is undefined, setting wallet to ...`)
        user_BTC_Wallet = "";
    }else{
        reference = user.username.substring(0,18);
        if ("attributes" in user && "custom:btc_wallet_address" in user.attributes){
            // console.debug(`User has attribute: custom:btc_wallet_address, setting wallet to that value`);
            user_BTC_Wallet = user.attributes["custom:btc_wallet_address"];
        }else{
            // console.debug(`User does not have attribute: custom:btc_wallet_address, setting wallet to ...`);
            user_BTC_Wallet = "";
        }
    }

    return (
    <div>
        <Payment 
            routes = {routes}
            onClickRoute = {(i) => {handleOnClickRoute(i)}}
            userPayment = {userPayment}
            reference = {reference}
            userBTCWallet = {user_BTC_Wallet}
            onBTCWalletAddresClick = {(address) => {handleBTCWalletAddresClick(address)}}
        />
    </div>
    );
}