// import { API, graphqlOperation } from "aws-amplify"
// import {listUserPayments, getUserPayment} from "../graphql/queries"

// export const fetchUserPayment = async () => {
//     console.group(`Fetching user payment for user: ${user.username}`);
//     try {
//         const userPaymentData =  await API.graphql(graphqlOperation(getUserPayment,{"id":user.attributes.sub}));//listCodes));//getCode,{"id":"2021-08-30"}));
//         console.group("Proccessing user payment", userPaymentData);
//         const user_payment = userPaymentData.data.getUserPayment;
//         const date = new Date();
//         const current_month = date.toLocaleString('default', { month: 'long' });
//         const userPaidForMonth = userPaymentData.data.getUserPayment[current_month];
//         console.debug("userPaidForMonth: ", current_month, userPaidForMonth);
//         console.info("Fetched User Payment: ", userPaymentData.data.getUserPayment);
//         setUserPaid(userPaidForMonth);
//         setUserPayment(user_payment);
//         if (userPaidForMonth === false){
//             console.info("User not paid, setting state to ", appStates.PAYMENT);
//             setAppState(appStates.PAYMENT);
//         }
//         const user_payment_page_info = generatePaymentInfo(user_payment);
//         setUserPaymentPageInfo(user_payment_page_info);
//     }catch(error){
//         handleError(error, fetchUserPayment);
//     }
//     console.groupEnd();
// }

// function processUserPayment(userPaymentData, date, setUserPaid, setUserPayment, 
//         setUserPaymentPageInfo, setAppState, appStates){
    
// }