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
            {/* Payment info showing how much they owe for what month */}
            <div className="title">Payment Due</div>
            <h3>The amount will be updated if you have paid for the corresponding month.</h3>
            
            <div className="infoGrid">
                {/* Month Due */}
                <div className="infoItemLeft">Month</div>
                <div className="infoItemRight">{paymentInfo.month}</div>
                {/* Month Due */}
                <div className="infoItemLeft">Amount</div>
                <div className="infoItemRight">£{paymentInfo.amount}</div>
            </div>
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
                <div className="infoItemRight">{bankInfo.benificiary}</div>
                {/* Reference */}
                <div className="infoItemLeft">Reference</div>
                <div className="infoItemRight">{bankInfo.ref}</div>
                {/* Email */}
                <div className="infoItemLeft">Email</div>
                <div className="infoItemRight">{bankInfo.email}</div>
            </div>
        </ContentWrap>
    );
}

function returnLocal({bankInfo, paymentInfo}){
    return (
        <ContentWrap>
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
            
            <div className="info">If the month shown is the current month then you need to pay to use the app.</div>
            <div className="info">If the month shown is the next month then you need to pay before the start of the next month to guarantee access. The earlier the better!</div>
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
                <div className="infoItemRight">{bankInfo.benificiary}</div>
                {/* Reference */}
                <div className="infoItemLeft">Reference</div>
                <div className="infoItemRight">{bankInfo.ref}</div>
                {/* Email */}
                <div className="infoItemLeft">Email</div>
                <div className="infoItemRight">{bankInfo.email}</div>
            </div>
            <div className="info">Please send an email when you have sent the payment.</div>
            <div className="info">If you do not wish to use the app for the corresponding month, then no action is required.</div>
        </ContentWrap>
    );
}

export default Content;
