import "./UsersBTCWallet.css"
import { Auth } from "aws-amplify";

export default function UsersBTCWallet({user}){

  let userBTCWallet = "-You have not registered a wallet, please update it below-";
  if (user.attributes.hasOwnProperty('custom:btc_wallet_address')) {
    userBTCWallet = user.attributes['custom:btc_wallet_address'];
  }

  return (
    <div>
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
    </div>
  );

  async function onBTCWalletAddresClick(address){
    try{
      await Auth.updateUserAttributes(user, {
        'custom:btc_wallet_address': `${address}`
      })
    }catch (error){
      console.error(error);
    }
  }
}