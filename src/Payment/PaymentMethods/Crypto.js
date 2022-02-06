import './PaymentMethods.css';

/*
Returns the crypto details for paying in Bitcoin
*/
export default function Crypto({paymentMethod}){

  const dataReady = !(paymentMethod && 
    paymentMethod.hasOwnProperty('cryptoType') && 
    paymentMethod.hasOwnProperty('BTCWalletAddress') &&
    paymentMethod.hasOwnProperty('email'));
    
    if (!dataReady) {
    return (
      <div>
        loading Crypto Payment Method...
      </div>
    );
  }

  return (
    <div>
      <div className="title">Crypto Information</div>
      {/* All the left hand side info */}
      <div className="infoGrid">
        {/* Account Type */}
        <div className="infoItemLeft">Crypto Type</div>
        <div className="infoItemRight">{paymentMethod.cryptoType}</div>
        {/* Sort Code */}
        <div className="infoItemLeft">Bitcoin Wallet Address</div>
        <div className="infoItemRight">{paymentMethod.BTCWalletAddress}</div>
        {/* Email */}
        <div className="infoItemLeft">Email</div>
        <div className="infoItemRight">{paymentMethod.email}</div>
      </div>
    </div>
  )
}