import { ContentWrap } from "./Content.styles";

function Content({bankInfo, paymentInfo, BTCAmount}) {
    // check if account type is local
    // console.log("BTC amount: ", BTCAmount);
    return (
        <ContentWrap>
            {/* Payment info showing how much they owe for what month */}
            <div className="title">Payment Due</div>
            <div className="infoGrid">
                {/* Month Due */}
                <div className="infoItemLeft">Month</div>
                <div className="infoItemRight">{paymentInfo.month}</div>
                {/* Amount Due in GDP */}
                <div className="infoItemLeft">Amount</div>
                <div className="infoItemRight">£{paymentInfo.amount}</div>
                {/* Amount Due in crypto */}
                <div className="infoItemLeft">
                    <a rel="noopener noreferrer" target="_blank" href="https://blockchain.info/api/exchange_rates_api">Amount in Bitcoin</a>
                </div>
                <div className="infoItemRight">{BTCAmount}</div>
            </div>
            <div className="info">The amount will be 0 if you have paid for the corresponding month</div>
            <div className="info">The next month will show a few days before the end of the month to give you time to send the payment and guarantee access to the app.</div>
            <br></br>
        
            {bankInfo.type === "local" && < Local bankInfo={bankInfo} />}
            {bankInfo.type === "crypto" && < Crypto bankInfo={bankInfo} />
            }
            {bankInfo.type === "international" && < International bankInfo={bankInfo} />}
        </ContentWrap>
    );
}

function International({bankInfo}){
    return (
        <ContentWrap>
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

function Crypto({bankInfo}){
    return (
        <ContentWrap>
        <div className="title">Crypto Information</div>
            {/* All the left hand side info */}
            <div className="infoGrid">
                {/* Account Type */}
                <div className="infoItemLeft">Crypto Type</div>
                <div className="infoItemRight">{bankInfo.crpyoType}</div>
                {/* Sort Code */}
                <div className="infoItemLeft">Bitcoin Wallet Address</div>
                <div className="infoItemRight">{bankInfo.BTCWalletAddress}</div>
                {/* Email */}
                <div className="infoItemLeft">Email</div>
                <div className="infoItemRight">{bankInfo.email}</div>
            </div>
            <div className="info">Please send an email when you have sent the payment.</div>
            <div className="info"><b>If you do not wish to use the app for the corresponding month, then no action is required.</b></div>
            </ContentWrap>
    )
}

function Local({bankInfo}){
    return (
        <ContentWrap>
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
