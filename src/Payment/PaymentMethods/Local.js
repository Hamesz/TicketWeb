import './PaymentMethods.css';

/*
Returns the bank details for paying a local 
bank account
*/
export default function Local({paymentMethod, reference}){
  
  const dataReady = !(paymentMethod && 
    paymentMethod.hasOwnProperty('type') &&
    paymentMethod.hasOwnProperty('sortCode') &&
    paymentMethod.hasOwnProperty('accountNumber') &&
    paymentMethod.hasOwnProperty('benificiary') &&
    paymentMethod.hasOwnProperty('email'));

  if (!dataReady) {
    return(<div>Loading Local Payment Method...</div>)
  }

  return (
    <div>
      <div className="title">Bank Information</div>
      {/* All the left hand side info */}
      <div className="infoGrid">
        {/* Account Type */}
        <div className="infoItemLeft">Transfer Type</div>
        <div className="infoItemRight">{paymentMethod.type}</div>
        {/* Sort Code */}
        <div className="infoItemLeft">Sort Code</div>
        <div className="infoItemRight">{paymentMethod.sortCode}</div>
        {/* Account Number */}
        <div className="infoItemLeft">Account Number</div>
        <div className="infoItemRight">{paymentMethod.accountNumber}</div>
        {/* Name */}
        <div className="infoItemLeft">Name</div>
        <div className="infoItemRight">{paymentMethod.beneficiary}</div>
        {/* Reference */}
        <div className="infoItemLeft">Reference</div>
        <div className="infoItemRight">{reference}</div>
        {/* Email */}
        <div className="infoItemLeft">Email</div>
        <div className="infoItemRight">{paymentMethod.email}</div>
      </div>
    </div>
  );
}