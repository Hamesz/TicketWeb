import { ContentWrap } from "./Content.styles";

function Content() {
    return (
        <ContentWrap>
            <div className="infoGrid">
                <div className="infoItem">
                    <b>Android</b>
                    <br></br>
                    <p>
                        The easiest way to view the ticket properly is to use the google chrome browser. Then when you have selected the ticket zoom in and scroll down, 
                        until the toolbar and url disappear. 
                        <br></br><br></br>
                        Then zoom out and you will be able to see the ticket <b>without</b> the toolbar and url.
                    </p>
                    <br></br>
                    Example of ticket with an Android phone:
                    <img src="assets/images/android_ticket.jpg" alt="Example of ticket with an Android phone"></img>
                </div>

                <div className="infoItem">
                    <b>IOS/Apple</b>
                    <p>
                        There are 2 ways to use this app if using an IOS/Apple phone.
                    </p>
                    <br></br>
                    <ul>
                        <li>
                            Download <a rel="noopener noreferrer" target="_blank" href="https://apps.apple.com/us/app/opera-browser-fast-private/id1411869974">Opera browser</a> from the apple app store. Then follow the same steps descibed for android users. 
                            The reason Opera is required is because Safari and Chrome will always display the toolbar/URL, whereas Opera allows you to hide it.
                        </li>
                        <br></br>
                        <li>
                            Save this website to your home screen. Follow this <a rel="noopener noreferrer" target="_blank" href="https://www.macrumors.com/how-to/add-a-web-link-to-home-screen-iphone-ipad/">guide</a> for more information.
                        </li>
                    </ul>
                    <br></br>
                    Example of ticket with an IOS/Apple phone
                    <img src="assets/images/ios_ticket.jpg" alt="Example of ticket with an IOS/Apple phone"></img>
                </div>
            </div>
        </ContentWrap>
    );
}

export default Content;
