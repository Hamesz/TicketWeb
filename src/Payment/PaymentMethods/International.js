import './PaymentMethods.css';

/*
Returns the bank details for paying an international 
bank account
*/
export default function International({paymentMethod, reference}){

  const dataReady = !(paymentMethod && 
    paymentMethod.hasOwnProperty('type') &&
    paymentMethod.hasOwnProperty('IBAN') &&
    paymentMethod.hasOwnProperty('BAC') &&
    paymentMethod.hasOwnProperty('beneficiary') &&
    paymentMethod.hasOwnProperty('email'));
    
  if (!dataReady) {
    return (
      <div>Loading International Payment Method...</div>
    );
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
        <div className="infoItemLeft">IBAN</div>
        <div className="infoItemRight">{paymentMethod.IBAN}</div>
        {/* Account Number */}
        <div className="infoItemLeft">BAC</div>
        <div className="infoItemRight">{paymentMethod.BAC}</div>
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