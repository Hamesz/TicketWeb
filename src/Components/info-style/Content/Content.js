import { ContentWrap } from "./Content.styles";

function Content() {
    return (
        <ContentWrap>
            {/* Requirements */}
            <div className="infoGrid">
                <div className="title-black">Requirements</div>
                <div className="info-black">Make sure you use the <a rel="noopener noreferrer" target="_blank" href="https://www.opera.com/">Opera Browser</a> when using this web app. 
                It allows for anonymous and secure browsing as well as properly displaying the ticket to the driver. 
                It also comes with a crypotcurrency wallet used for payment.</div>
            </div>
            
            {/* Setting up your device to use this web app */}
            <div className="infoGrid-no-border">
                <div className="title-black">Setting up your device to use this web app</div>
                <div className="info-black">
                    Below are instructions on how to set up your device to use the web app properly.
                </div>
            </div>
            
            {/* Instructions on setting up device */}
            <div className="infoGridDevices">
                {/* Android Instructions */}
                <div className="infoItem">
                <div className="title-black">Android</div>
                    <br></br>
                    <div className="instructions">
                    The instructions below are taken from this <a rel="noopener noreferrer" target="_blank" href="https://www.trishtech.com/2016/09/opera-allows-adding-webpage-shortcuts-to-homescreen-in-android/">tutorial</a> but 
                    slightly altered as the tutorial is out of date:
                    <ol>
                        <li>Download the <a rel="noopener noreferrer" target="_blank" href="https://play.google.com/store/apps/details?id=com.opera.browser&hl=en_GB&gl=US">Opera Browser</a> from the Google Play Store</li>
                        <li>Open the opera broswer on your phone and navigate to this web app.</li>
                        <li>click on the 3 vertical dots beside the URL in the Opera browser.</li>
                        <li>Scroll to the bottom and click the Home screen.</li>
                        <li>Add the web app as a shortcut on your phone.</li>    
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
                    The instructions below are taken from this <a rel="noopener noreferrer" target="_blank" href="https://www.trishtech.com/2016/09/opera-allows-adding-webpage-shortcuts-to-homescreen-in-android/">tutorial</a> but 
                    slightly altered as the tutorial is out of date:
                    
                    <ol>
                        <li>Download the <a rel="noopener noreferrer" target="_blank" href="https://apps.apple.com/us/app/opera-browser-fast-private/id1411869974">Opera Browser</a> from the Apple App Store</li>
                        <li>Open the opera broswer on your phone and navigate to this web app.</li>
                        <li>click on the 3 vertical dots beside the URL in the Opera browser.</li>
                        <li>Scroll to the bottom and click the Home screen.</li>
                        <li>Add the web app as a shortcut on your phone.</li>    
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
                    Payment will be done with crypotcurrency (Bitcoin), this is to make you anonymous and the payment secure.
                    Opera comes with a crypotcurrency wallet which you can easily set up. Below are instructions on how to do this (which follows this <a rel="noopener noreferrer" target="_blank" href="https://help.opera.com/en/touch/crypto-wallet/">tutorial</a>):
                    
                    <ol>
                        <li>Download the Opera browser for your phone.</li>
                        <li>Open the opera broswer on your phone and click the Opera symbol (red circle) located on the bottom toolbar to the right.</li>
                        <li>Select the Crypto Wallet and follow the instructions to set up the wallet.</li>
                        <li>Note down your wallet address which you can get by clicking on Recieve. This is needed for signing up so I know who has paid.</li>
                    </ol>

                    Congratulations! You have just set up a crypto wallet that you can use to buy and send Bitcoin. For information on paying go to the payment page. 
                    </div>
            </div>
        </ContentWrap>
    );
}

export default Content;
