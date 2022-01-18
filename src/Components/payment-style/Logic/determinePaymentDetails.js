import { API, graphqlOperation } from "aws-amplify"
import {getPaymentDetails} from "../../../graphql/queries"

export const fetchAndSetPaymentDetails = async (payment_details_type, setPaymentDetails) => {
    console.log("fetching payment details");
    if (payment_details_type === null){
        payment_details_type = "crypto";
    }
    try {
        // const allPaymentDetails = await API.graphql(graphqlOperation(listPaymentDetails));
        const payment_details = await API.graphql(graphqlOperation(getPaymentDetails,{"id":payment_details_type}));
        setPaymentDetails(payment_details.data.getPaymentDetails);
    }catch(error){
        console.error(error);
    }
}