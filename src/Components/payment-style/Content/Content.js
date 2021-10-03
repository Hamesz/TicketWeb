import { ContentWrap } from "./Content.styles";

/*
Displays the Month and Amount the user needs to pay.
Also displays the details for where they pay (Crypto or bank details)
*/
function Content({bankInfo, paymentInfo, BTCAmount, userBTCWallet, onBTCWalletAddresClick}) {
    console.log("Bank Info:", bankInfo);
    return (
        <ContentWrap>
            <AmountAndMonth
                paymentInfo = {paymentInfo}
                BTCAmount = {BTCAmount}
            />
            {/* Check which payment info to show */}
            {bankInfo.type === "local" && < Local bankInfo={bankInfo} />}
            {bankInfo.type === "crypto" && < Crypto bankInfo={bankInfo} />}
            {bankInfo.type === "international" && < International bankInfo={bankInfo} />}
            <br></br>
            <UsersBTCWallet 
                userBTCWallet = {userBTCWallet}
                onBTCWalletAddresClick = {(address) => {onBTCWalletAddresClick(address)}}
            />
            {/* Extra info */}
            <div className="info">Please send an email when you have sent the payment.</div>
            <div className="info"><b>If you do not wish to use the app for the corresponding month, then no action is required.</b></div>
        </ContentWrap>
    );
}

/*
Returns the section showing the user what month to pay for
and for how much
*/
function AmountAndMonth({paymentInfo, BTCAmount}){
    return (
        <div>
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
                    <a rel="noopener noreferrer" target="_blank" href="https://www.coingecko.com/en/coins/bitcoin/gbp">Amount in Bitcoin</a>
                </div>
                <div className="infoItemRight">{BTCAmount}</div>
            </div>
            <div className="info">The amount will be 0 if you have paid for the corresponding month</div>
            <div className="info">The next month will show a few days before the end of the month to give you time to send the payment and guarantee access to the app.</div>
            <br></br>
        </div>
    );
}

/*
Returns the bank details for paying an international 
bank account
*/
function International({bankInfo}){
    return (
        <div>
            <div className="title">Bank Information</div>
            {/* All the left hand side info */}
            <div className="infoGrid">
                {/* Account Type */}
                <div className="infoItemLeft">Transfer Type</div>
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
        </div>
    );
}

/*
Returns the crypto details for paying in Bitcoin
*/
function Crypto({bankInfo}){
    return (
        <div>
            <div className="title">Crypto Information</div>
            {/* All the left hand side info */}
            <div className="infoGrid">
                {/* Account Type */}
                <div className="infoItemLeft">Crypto Type</div>
                <div className="infoItemRight">{bankInfo.cryptoType}</div>
                {/* Sort Code */}
                <div className="infoItemLeft">Bitcoin Wallet Address</div>
                <div className="infoItemRight">{bankInfo.BTCWalletAddress}</div>
                {/* Email */}
                <div className="infoItemLeft">Email</div>
                <div className="infoItemRight">{bankInfo.email}</div>
            </div>
        </div>
    )
}

/*
Returns the bank details for paying a local 
bank account
*/
function Local({bankInfo}){
    return (
        <ContentWrap>
            <div className="title">Bank Information</div>
            {/* All the left hand side info */}
            <div className="infoGrid">
                {/* Account Type */}
                <div className="infoItemLeft">Transfer Type</div>
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
            </ContentWrap>
    );
}

function UsersBTCWallet({userBTCWallet, onBTCWalletAddresClick}){
    return (
        <ContentWrap>
            <div className="title">
                Your Bitcoin Wallet Address
            </div>
            <div className="infoGrid">
                {/* Account Type */}
                <div className="infoItemLeft">Your Bitcoin Wallet Address</div>
                <div className="infoItemRight">{userBTCWallet}</div>
            </div>
            <div className="info">
                If this is incorrect then please update it, otherwise you may not be registered as payed.
            </div>
            <div className="update-btc-wallet-address-grid">
                <label htmlFor="new_btc_wallet_address" className="new-btc-wallet-address-label">New Bitcoin Wallet Address:</label>
                <br></br>
                <input type="text" id="new_btc_wallet_address" name="new_btc_wallet_address" className="new-btc-wallet-address-input"></input>
                <br></br>
                <button className="change-btc-wallet-address-btn" onClick= {() => {onBTCWalletAddresClick(document.getElementById('new_btc_wallet_address').value)}}>Submit</button>
            </div>
        </ContentWrap>
    );
}

export default Content;
