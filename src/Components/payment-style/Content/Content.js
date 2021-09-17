import { ContentWrap } from "./Content.styles";

function Content(props) {
    // check if account type is local
    if (props.bankInfo.type === "local"){
        return returnLocal(props)
    }else{
        return returnInternational(props)
    }
}

function returnInternational({bankInfo, paymentInfo}){
    return (
        <ContentWrap>
            Information about send the correct amount of bitcoin 
            <div className="title">Information about sending Bitcoin</div>
            <div className="info">The price of bitcoin can change quite a lot within a day and the purchase and sending of it can incur fees. 
            It is your responsability to ensure that the correct amount of Bitcoin is actually sent to the provided wallet address.
            Here is a <a 
                rel="noopener noreferrer" target="_blank" href="https://www.coingecko.com/en/coins/bitcoin/gbp">website</a> that 
                converts GBP to BTC (Bitcoin), use this to determine how much you need to send. 
                Make sure you look at the actual Bitcoin you will be sending after the fees and check this website to see if it equals the amount due.
                Don't worry if it is a little off due to the price always changing.</div>
            {/* Payment info showing how much they owe for what month */}
            <div className="title">Payment Due</div>
            <div className="infoGrid">
                {/* Month Due */}
                <div className="infoItemLeft">Month</div>
                <div className="infoItemRight">{paymentInfo.month}</div>
                {/* Month Due */}
                <div className="infoItemLeft">Amount</div>
                <div className="infoItemRight">£{paymentInfo.amount}</div>
            </div>
            <div className="info">The amount will be 0 if you have paid for the corresponding month</div>
            <div className="info">The next month will show a few days before the end of the month to give you time to send the payment and guarantee access to the app.</div>
            <br></br>
            <div className="title">Bank Information</div>
            {/* All the left hand side info */}
            <div className="infoGrid">
                {/* Account Type */}
                <div className="infoItemLeft">Account Type</div>
                <div className="infoItemRight">{bankInfo.type}</div>
                {/* Sort Code */}
                <div className="infoItemLeft">IBAN</div>
                <div className="infoItemRight">{bankInfo.IBAN}</div>
                {/* Account Number */}
                <div className="infoItemLeft">BAC</div>
                <div className="infoItemRight">{bankInfo.BAC}</div>
                {/* Name */}
                <div className="infoItemLeft">Name</div>
                <div className="infoItemRight">{bankInfo.beneficiary}</div>
                {/* Reference */}
                <div className="infoItemLeft">Reference</div>
                <div className="infoItemRight">{bankInfo.ref}</div>
                {/* Email */}
                <div className="infoItemLeft">Email</div>
                <div className="infoItemRight">{bankInfo.email}</div>
            </div>
            <div className="info">Please send an email when you have sent the payment.</div>
            <div className="info"><b>If you do not wish to use the app for the corresponding month, then no action is required.</b></div>
        </ContentWrap>
    );
}

function returnLocal({bankInfo, paymentInfo}){
    return (
        <ContentWrap>
            {/* Information about send the correct amount of bitcoin  */}
            <div className="title">Information about sending Bitcoin</div>
            <div className="info">The price of bitcoin can change quite a lot within a day and the purchase and sending of it can incur fees. 
            It is your responsability to ensure that the correct amount of Bitcoin is actually sent to the provided wallet address.
            Here is a <a 
                rel="noopener noreferrer" target="_blank" href="https://www.coingecko.com/en/coins/bitcoin/gbp">website</a> that 
                converts GBP to BTC (Bitcoin), use this to determine how much you need to send. 
                Make sure you look at the actual Bitcoin you will be sending after the fees and check this website to see if it equals the amount due.
                Don't worry if it is a little off due to the price always changing.</div>
            {/* Payment info showing how much they owe for what month */}
            <div className="title">Payment Due</div>
            <div className="infoGrid">
                {/* Month Due */}
                <div className="infoItemLeft">Month</div>
                <div className="infoItemRight">{paymentInfo.month}</div>
                {/* Month Due */}
                <div className="infoItemLeft">Amount</div>
                <div className="infoItemRight">£{paymentInfo.amount}</div>
            </div>
            <div className="info">The amount will be 0 if you have paid for the corresponding month</div>
            <div className="info">The next month will show a few days before the end of the month to give you time to send the payment and guarantee access to the app.</div>
            <br></br>
            <div className="title">Bank Information</div>
            {/* All the left hand side info */}
            <div className="infoGrid">
                {/* Account Type */}
                <div className="infoItemLeft">Account Type</div>
                <div className="infoItemRight">{bankInfo.type}</div>
                {/* Sort Code */}
                <div className="infoItemLeft">Sort Code</div>
                <div className="infoItemRight">{bankInfo.sortCode}</div>
                {/* Account Number */}
                <div className="infoItemLeft">Account Number</div>
                <div className="infoItemRight">{bankInfo.accountNumber}</div>
                {/* Name */}
                <div className="infoItemLeft">Name</div>
                <div className="infoItemRight">{bankInfo.beneficiary}</div>
                {/* Reference */}
                <div className="infoItemLeft">Reference</div>
                <div className="infoItemRight">{bankInfo.ref}</div>
                {/* Email */}
                <div className="infoItemLeft">Email</div>
                <div className="infoItemRight">{bankInfo.email}</div>
            </div>
            <div className="info">Please send an email when you have sent the payment.</div>
            <div className="info"><b>If you do not wish to use the app for the corresponding month, then no action is required.</b></div>
        </ContentWrap>
    );
}

export default Content;
