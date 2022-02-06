import React from "react";
import "./payment.css";

import AmountAndMonth from "./AmountAndMonth";
import Local from "./PaymentMethods/Local";
import International from "./PaymentMethods/International";
import Crypto from "./PaymentMethods/Crypto";
import UsersBTCWallet from "./UsersBTCWallet";

// data querying from dynamoDDB
import { API, graphqlOperation } from "aws-amplify"
import {getPaymentDetails, getUserPayment} from "../graphql/queries"

/*
Displays the Month and Amount the user needs to pay.
Also displays the details for where they pay (Crypto or bank details)
*/
export default function Payment({user}) {
  const [paymentMethod, setPaymentMethod] = React.useState();
  const [userPaymentInformation, setUserPaymentInformation] = React.useState();
  
  const reference = calculateReference(user);

  const paymentMethodType = paymentMethod 
    ? paymentMethod.type
    : undefined;

  const userPaymentInformationType = userPaymentInformation 
    ? userPaymentInformation.type
    : undefined;

  React.useEffect(() => {
    fetchAndSetPaymentMethod(userPaymentInformationType, setPaymentMethod);
    return () => {

    }
  }, [userPaymentInformation]);

  React.useEffect(() => {
    fetchUserPayment(user);
  }, [user]);

  /*
  Gets the user payment info
  */
  const fetchUserPayment = async (user) => {
    try {
        let userPaymentData =  await API.graphql(graphqlOperation(getUserPayment,{"id":user.attributes.sub}));//listCodes));//getCode,{"id":"2021-08-30"}));
        userPaymentData = userPaymentData.data.getUserPayment
        setUserPaymentInformation(userPaymentData);
    }catch(error){
        console.error(error);
    }
  }

  return (
      <div className="wrap">
        <AmountAndMonth
          userPaymentInformation={userPaymentInformation} />
        {/* Check which payment info to show */}
        {paymentMethodType === undefined && <div>Loading...</div>}
        {paymentMethodType === "local" && < Local paymentMethod={paymentMethod} reference={reference}/>}
        {paymentMethodType === "crypto" && < Crypto paymentMethod={paymentMethod} />}
        {paymentMethodType === "international" && < International paymentMethod={paymentMethod} reference={reference}/>}
      
        <br></br>
        <UsersBTCWallet 
            user = {user} />
        {/* Extra info */}
        <div className="info">Please send an email when you have sent the payment and if using crypto then include your Bitcoin Wallet Address.</div>
        <div className="info"><b>If you do not wish to use the app for the corresponding month, then no action is required.</b></div>
      </div>
  );

  async function fetchAndSetPaymentMethod(userPaymentInformationType, setPaymentMethod) {
    if (userPaymentInformationType === undefined) {
      setPaymentMethod(undefined);
      return;
    }

    if (userPaymentInformationType === null){
      userPaymentInformationType = "crypto";
    }
    try {
      // const allPaymentDetails = await API.graphql(graphqlOperation(listPaymentDetails));
      const payment_details = await API.graphql(graphqlOperation(getPaymentDetails,{"id":userPaymentInformationType}));
      setPaymentMethod(payment_details.data.getPaymentDetails);
    }catch(error){
      console.error(error);
    }
  }

  function calculateReference(user) {
    return user.username.substring(0,18);
  }

}