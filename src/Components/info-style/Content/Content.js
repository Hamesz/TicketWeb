import { ContentWrap } from "./Content.styles";

function Content() {
    return (
        <ContentWrap>
            {/* Requirements */}
            <div className="infoGrid">
                <div className="title-black">Overview</div>
                <div className="info-black">This page contains information about how to use the web abb properly, along with how to set up your crypto wallet for payment.</div>
            </div>
            
            {/* Setting up your device to use this web app */}
            <div className="infoGrid-no-border">
                <div className="title-black">Setting up your device to use this web app</div>
                <div className="info-black">
                    Below are instructions on how to set up your device to use the web app properly. It aims at adding this web app to your home page. Different browsers for your phone will have different steps so if you have a different browser than what is in this section, please look up a tutorial. 
                </div>
            </div>
            
            {/* Instructions on setting up device */}
            <div className="infoGridDevices">
                {/* Android Instructions */}
                <div className="infoItem">
                <div className="title-black">Android</div>
                    <br></br>
                    <div className="instructions">
                    The instructions below are taken from this <a rel="noopener noreferrer" target="_blank" href="https://natomasunified.org/kb/add-website-to-mobile-device-home-screen/">tutorial</a> 
                    and target the <a rel="noopener noreferrer" target="_blank" href="https://play.google.com/store/apps/details?id=com.android.chrome&hl=en_GB&gl=US">Google Chrome browser</a>:
                    <ol>
                        <li>Download the <a rel="noopener noreferrer" target="_blank" href="https://play.google.com/store/apps/details?id=com.android.chrome&hl=en_GB&gl=US">Google Chrome browser</a> from the Google Play Store, if you do not already have it.</li>
                        <li>Launch “Chrome” app.</li>
                        <li>Open this web app.</li>
                        <li>Tap the menu icon (3 dots in upper right-hand corner) and tap Add to homescreen..</li>
                        <li>You’ll be able to enter a name for the shortcut and then Chrome will add it to your home screen.</li>    
                    </ol>

                    Now when you open the web app using the shortuct you just made, you should notice the toolbars and URL are gone.
                    This provides a clean and minimalist view which is required to be shown to the bus driver.
                    </div>
                    <br></br>
                    Example of ticket with an Android phone:
                    <img src="assets/images/android_ticket.jpg" alt="Example of ticket with an Android phone"></img>
                </div>
                {/* Apple Instructions */}
                <div className="infoItem">
                    <div className="title-black">IOS/Apple</div>
                    <br></br>
                    <div className="instructions">
                    The instructions below are taken from this <a rel="noopener noreferrer" target="_blank" href="https://natomasunified.org/kb/add-website-to-mobile-device-home-screen/">tutorial</a> and 
                    target the <a rel="noopener noreferrer" target="_blank" href="https://www.apple.com/uk/safari/">Safarfi browser</a>:
                    
                    <ol>
                        <li>Safari comes already installed on iOS phones, but if it isn't available then download it from the app store.</li>
                        <li>Launch “Safari” app.</li>
                        <li>Open this web app.</li>
                        <li>Tap the icon featuring a right-pointing arrow coming out of a box along the top of the Safari window to open a drop-down menu..</li>
                        <li>Tap “Add to Home Screen.” The Add to Home dialog box will appear, with the icon that will be used for this website on the left side of the dialog box..</li>    
                        <li>Enter the name for the shortcut using the on-screen keyboard and tap “Add.” Safari will close automatically and you will be taken to where the icon is located on your iOS desktop</li>
                    </ol>

                    Now when you open the web app using the shortuct you just made, you should notice the toolbars and URL are gone.
                    This provides a clean and minimalist view which is required to be shown to the bus driver.
                    </div>
                    <br></br>
                    Example of ticket with an IOS/Apple phone
                    <img src="assets/images/ios_ticket.jpg" alt="Example of ticket with an IOS/Apple phone"></img>
                </div>
            </div>
        
            {/* Payment */}
            <div className="infoGrid">
                <div className="title-black">Payment</div>
                <div className="instructions">
                    {/* Payment will be done with crypotcurrency (Bitcoin), this is to make you anonymous and the payment secure.
                    Opera comes with a crypotcurrency wallet which you can easily set up. Below are instructions on how to do this (which follows this <a rel="noopener noreferrer" target="_blank" href="https://help.opera.com/en/touch/crypto-wallet/">tutorial</a>): */}
                    Payment will be done with crypotcurrency (Bitcoin), this is to make you anonymous and the payment secure.
                    There are two things needed in order to perfrom this payment:
                    <br></br>
                    <h4>1. A Bitcoin Wallet</h4>
                        A Bitcoin wallet is a way to store the Bitcoin, like a bank account to store money. 
                        From this wallet you can recieve and send Bitcoin. 
                        Look that this <a rel="noopener noreferrer" target="_blank" href="https://www.investopedia.com/terms/b/bitcoin-wallet.asp">guide</a> for more info!. 
                        There are many wallets available, provided by apps you can download on your phone.
                    <h4>2. A way to buy Bitcoin</h4>
                    It is very easy to buy Bitcoin nowadays. So easy in fact that you don't need to provide proof of identity. Note that if an app does NOT require proof of identity (e.g. passport photo), then the fees for buying are much higher.
                    The cheapest way to but Bitcoin is with a trading account like <a 
                    rel="noopener noreferrer" target="_blank" href="https://www.coinbase.com/">Coinbase
                    </a> or <a 
                    rel="noopener noreferrer" target="_blank" href="https://www.binance.com/">Binance
                    </a>, note these do require proof of identity.
                    <h4>Examples of phone apps that provde you a wallet and the option to buy:</h4>
                    <ol>
                        <li><a rel="noopener noreferrer" target="_blank" href="https://play.google.com/store/apps/details?id=com.bitcoin.mwallet">Bitcoin Wallet: buy BTC, BCH & ETH</a>. Does not require proof of identity, though the fees are high.</li>
                        <li><a rel="noopener noreferrer" target="_blank" href="https://play.google.com/store/apps/details?id=piuk.blockchain.android">Blockchain.com Wallet - Buy Bitcoin, ETH, & Crypto</a>. Does not require proof of identity to buy, but may for you to send. Takes 14 days from when you buy to when you can send, so make sure you buy early! Also has relativly low fees.</li>
                        <li><a rel="noopener noreferrer" target="_blank" href="https://play.google.com/store/apps/details?id=com.binance.dev">Binance</a>. Very cheap fees and quick send time. A very good way to buy and store Bitcoin but requires proof of identity.</li>
                        <li><a rel="noopener noreferrer" target="_blank" href="https://play.google.com/store/apps/details?id=com.coinbase.android&hl=en_GB&gl=US">Coinbase</a>. Very cheap fees and quick send time. A very good way to buy and store Bitcoin but requires proof of identity.</li>
                    </ol>
                    <h4>Knowing your Bitcoin Address</h4>
                    Make sure you note down your Bitcoin wallet address, as this is needed for creating an account for this web app which is used to check who has paid. 
                    You can often see your Bitcoin wallet addres by clicking on recieve payment.
                    <br></br>
                    <h4>Congratulations!</h4>
                    Congratulations! You have just set up a crypto wallet that you can use to buy and send Bitcoin. For information on paying go to the payment page.
                    If you do not wish to pay with crypto, then email your supplier. 
                    </div>
            </div>
        </ContentWrap>
    );
}

export default Content;
