// constants from config
import { DAYS_FOR_ALERT_PAYMENT_NEXT_MONTH, MONTHLY_FEE } from "../../../config";

/*
  Determines the month payment is due and for how much.
  If the user has not paid for the current month then that is returned with PAYMENT_FEE as amount.
  If they have paid then amount is 0.00, unless its DAYS_FOR_ALERT_PAYMENT_NEXT_MONTH before the end of
  the month. At which we tell the user to pay for the next month (in advance so they are guaranteed access).
  Again if they have paid for the next month then they will be shown amount of 0.
  */
export function determineMonthAndAmount(userPayment){
  const date = new Date();
  const date_next_month = new Date(date.getTime());
  date_next_month.setMonth(date.getMonth() + 1);

  const current_month = date.toLocaleString('default', { month: 'long' });
  const next_month = date_next_month.toLocaleString('default', { month: 'long' });
  const userPaidForCurrentMonth = userPayment[current_month];

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
        userPaidForNextMonth = userPayment["JanuaryNextYear"];
      }else{
        userPaidForNextMonth = userPayment[next_month];
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