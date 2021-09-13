import { ContentWrap } from "./Content.styles";

function Content({errorMsg}) {
    return (
        <ContentWrap>
            {/* Requirements */}
            <div className="title">
                An Error has occured
            </div>
            <div className="info">
                Please sign out and try again. If the error keeps persisting then contact the person who told you about this app and quote the error code below.
            </div>
            <div className="info">
                {errorMsg}
            </div>
        </ContentWrap>
    );
}

export default Content;
