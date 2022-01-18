import React from "react";
import './AmountAndMonth.css';

import { DAYS_FOR_ALERT_PAYMENT_NEXT_MONTH, MONTHLY_FEE } from "../config";

/*
Returns the section showing the user what month to pay for
and for how much
*/
export default function AmountAndMonth({userPaymentInformation}){
  const [BTCAmount, setBTCAmount] = React.useState("");  
  const {month, amount} = determineMonthAndAmount(userPaymentInformation);

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

  async function determineBTCAmount(amount, setBTCAmount){
    const currency="GBP";
    if(amount === ""){
        setBTCAmount("...");
        return;
    }
    fetch(`https://blockchain.info/tobtc?currency=${currency}&value=${amount}`)
    .then(async response => {
        const data = await(response.json());
        setBTCAmount(data);
    })
    .catch(error => {
        console.error("There was an error fetch BTC price:", error);
    })
  }
}


/*
Determines the month payment is due and for how much.
If the user has not paid for the current month then that is returned with PAYMENT_FEE as amount.
If they have paid then amount is 0.00, unless its DAYS_FOR_ALERT_PAYMENT_NEXT_MONTH before the end of
the month. At which we tell the user to pay for the next month (in advance so they are guaranteed access).
Again if they have paid for the next month then they will be shown amount of 0.
*/
function determineMonthAndAmount(userPaymentInformation){
  if (!userPaymentInformation) {
    const month_amount = {month:'', amount:'0.00'}; 
    return month_amount;
  }

  const date = new Date();
  const date_next_month = new Date(date.getTime());
  date_next_month.setMonth(date.getMonth() + 1);

  const current_month = date.toLocaleString('default', { month: 'long' });
  const next_month = date_next_month.toLocaleString('default', { month: 'long' });
  const userPaidForCurrentMonth = userPaymentInformation[current_month];

  let month_to_pay;
  let amount;

  // check if user has paid for current month
  if (userPaidForCurrentMonth === true){
    // check if date is 5 days before month end
    const days_left = getRemainingDaysUntilEndOfMonth(date);
    // check if user has paid for next month and set amount appropriatly
    if (days_left < DAYS_FOR_ALERT_PAYMENT_NEXT_MONTH){
      // check if the month is december in which the next month is Januray but for the next year
      let userPaidForNextMonth;
      if (current_month === 12){
        userPaidForNextMonth = userPaymentInformation["JanuaryNextYear"];
      }else{
        userPaidForNextMonth = userPaymentInformation[next_month];
      }
      month_to_pay = next_month;
      if (userPaidForNextMonth === true){
        amount = "0.00";
      }else if (userPaidForNextMonth === false){
        amount = MONTHLY_FEE;
      }else{
        amount = "";
      }
    }else{
      // user has paid for current month but it is too soon to tell them
      // to pay for next month
      month_to_pay = current_month;
      amount = "0.00";
    }
  }else if (userPaidForCurrentMonth === false){
    // user has not paid for current month
    month_to_pay = current_month;
    amount = MONTHLY_FEE;
  }else{
    month_to_pay = "";
    amount = "";
  }
  const month_amount = {month:month_to_pay, amount:amount};
  return month_amount;
}

/*
Get the number of days remaining within the current month
*/
function getRemainingDaysUntilEndOfMonth(date){
  // const date = new Date();
  let time = new Date(date.getTime());
  time.setMonth(date.getMonth() + 1);
  time.setDate(0);
  const days = time.getDate() > date.getDate() ? time.getDate() - date.getDate() : 0;
  return days;
}


