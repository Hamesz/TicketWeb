import React from 'react';
import { ContentWrap } from "./Content.styles";

import {determineBTCAmount} from "../Logic/determineBTCAmount";
import {determineMonthAndAmount} from "../Logic/determineMonthAndAmount";
import {fetchAndSetPaymentDetails} from "../Logic/determinePaymentDetails";

import {PAYMENT_DETAILS_PLACEHOLDER} from "../../../config"

/*
Displays the Month and Amount the user needs to pay.
Also displays the details for where they pay (Crypto or bank details)
*/
function Content({userPayment, reference, userBTCWallet, onBTCWalletAddresClick}) {
    const [paymentDetails, setPaymentDetails] = React.useState(PAYMENT_DETAILS_PLACEHOLDER);

    React.useEffect(() => {
        fetchAndSetPaymentDetails(userPayment.type, setPaymentDetails);
    }, [userPayment]);

    const {month, amount} = determineMonthAndAmount(userPayment);
    return (
        <ContentWrap>
            <AmountAndMonth
                month = {month}
                amount = {amount}
            />
            {/* Check which payment info to show */}
            {paymentDetails.type === "local" && < Local paymentDetails={paymentDetails} reference={reference}/>}
            {paymentDetails.type === "crypto" && < Crypto paymentDetails={paymentDetails} />}
            {paymentDetails.type === "international" && < International paymentDetails={paymentDetails} reference={reference}/>}
            <br></br>
            <UsersBTCWallet 
                userBTCWallet = {userBTCWallet}
                onBTCWalletAddresClick = {(address) => {onBTCWalletAddresClick(address)}}
            />
            {/* Extra info */}
            <div className="info">Please send an email when you have sent the payment and if using crypto then include your Bitcoin Wallet Address.</div>
            <div className="info"><b>If you do not wish to use the app for the corresponding month, then no action is required.</b></div>
        </ContentWrap>
    );
}

/*
Returns the section showing the user what month to pay for
and for how much
*/
function AmountAndMonth({month, amount}){
    const [BTCAmount, setBTCAmount] = React.useState("");

    React.useEffect(() => {
        determineBTCAmount(amount, setBTCAmount);
    }, [amount]);

    return (
        <div>
            {/* Payment info showing how much they owe for what month */}
            <div className="title">Payment Due</div>
            <div className="infoGrid">
                {/* Month Due */}
                <div className="infoItemLeft">Month</div>
                <div className="infoItemRight">{month}</div>
                {/* Amount Due in GDP */}
                <div className="infoItemLeft">Amount</div>
                <div className="infoItemRight">£{amount}</div>
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
function International({paymentDetails, reference}){
    return (
        <div>
            <div className="title">Bank Information</div>
            {/* All the left hand side info */}
            <div className="infoGrid">
                {/* Account Type */}
                <div className="infoItemLeft">Transfer Type</div>
                <div className="infoItemRight">{paymentDetails.type}</div>
                {/* Sort Code */}
                <div className="infoItemLeft">IBAN</div>
                <div className="infoItemRight">{paymentDetails.IBAN}</div>
                {/* Account Number */}
                <div className="infoItemLeft">BAC</div>
                <div className="infoItemRight">{paymentDetails.BAC}</div>
                {/* Name */}
                <div className="infoItemLeft">Name</div>
                <div className="infoItemRight">{paymentDetails.beneficiary}</div>
                {/* Reference */}
                <div className="infoItemLeft">Reference</div>
                <div className="infoItemRight">{reference}</div>
                {/* Email */}
                <div className="infoItemLeft">Email</div>
                <div className="infoItemRight">{paymentDetails.email}</div>
            </div>
        </div>
    );
}

/*
Returns the crypto details for paying in Bitcoin
*/
function Crypto({paymentDetails}){
    return (
        <div>
            <div className="title">Crypto Information</div>
            {/* All the left hand side info */}
            <div className="infoGrid">
                {/* Account Type */}
                <div className="infoItemLeft">Crypto Type</div>
                <div className="infoItemRight">{paymentDetails.cryptoType}</div>
                {/* Sort Code */}
                <div className="infoItemLeft">Bitcoin Wallet Address</div>
                <div className="infoItemRight">{paymentDetails.BTCWalletAddress}</div>
                {/* Email */}
                <div className="infoItemLeft">Email</div>
                <div className="infoItemRight">{paymentDetails.email}</div>
            </div>
        </div>
    )
}

/*
Returns the bank details for paying a local 
bank account
*/
function Local({paymentDetails, reference}){
    return (
        <ContentWrap>
            <div className="title">Bank Information</div>
            {/* All the left hand side info */}
            <div className="infoGrid">
                {/* Account Type */}
                <div className="infoItemLeft">Transfer Type</div>
                <div className="infoItemRight">{paymentDetails.type}</div>
                {/* Sort Code */}
                <div className="infoItemLeft">Sort Code</div>
                <div className="infoItemRight">{paymentDetails.sortCode}</div>
                {/* Account Number */}
                <div className="infoItemLeft">Account Number</div>
                <div className="infoItemRight">{paymentDetails.accountNumber}</div>
                {/* Name */}
                <div className="infoItemLeft">Name</div>
                <div className="infoItemRight">{paymentDetails.beneficiary}</div>
                {/* Reference */}
                <div className="infoItemLeft">Reference</div>
                <div className="infoItemRight">{reference}</div>
                {/* Email */}
                <div className="infoItemLeft">Email</div>
                <div className="infoItemRight">{paymentDetails.email}</div>
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
