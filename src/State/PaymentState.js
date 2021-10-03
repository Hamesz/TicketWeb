import Payment from "../Components/payment-style/payment";

export function PaymentState(USER_PAYMENT_PLACEHOLDER, PAYMENT_DETAILS_PLACEHOLDER, BTCAmount, user, routes, 
        handleOnClickRoute, paymentDetails, userPaymentPageInfo, handleBTCWalletAddresClick, userPayment){
    let message = "";
    if (userPayment === USER_PAYMENT_PLACEHOLDER || paymentDetails === PAYMENT_DETAILS_PLACEHOLDER){
        message = "Data still waiting to be retrieved...";
        console.log("User payment or Payment Details data still waiting to be recieved...");
    }
    console.log(`BTC amount: ${BTCAmount}`);
    console.log("Payment Details info within PaymentState: ", paymentDetails);
    // check if auth data is undefined (just logged out)
    let user_BTC_Wallet;
    if (!user){
        console.debug(`User is undefined, setting wallet to ...`)
        user_BTC_Wallet = "";
    }else{
        if ("attributes" in user && "custom:btc_wallet_address" in user.attributes){
            console.debug(`User has attribute: custom:btc_wallet_address, setting wallet to that value`);
            user_BTC_Wallet = user.attributes["custom:btc_wallet_address"];
        }else{
            console.debug(`User does not have attribute: custom:btc_wallet_address, setting wallet to ...`);
            user_BTC_Wallet = "";
        }
    }
    return (
    <div>
        <div>
        <Payment 
            routes = {routes}
            onClickRoute = {(i) => {handleOnClickRoute(i)}}
            bankInfo = {{type:paymentDetails.type, sortCode:paymentDetails.sortCode, 
            accountNumber:paymentDetails.accountNumber, beneficiary:paymentDetails.beneficiary, 
            ref:"bus app", email:paymentDetails.email, BTCWalletAddress:paymentDetails.BTCWalletAddress,
            cryptoType:paymentDetails.cryptoType}}
            paymentInfo = {userPaymentPageInfo}
            BTCAmount = {BTCAmount}
            userBTCWallet = {user_BTC_Wallet}
            onBTCWalletAddresClick = {(address) => {handleBTCWalletAddresClick(address)}}
        />
        </div>
        <div className="message">
        {message}
        </div>
    </div>
    );
    }