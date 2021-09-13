import Navigation from "../navigation-style/Navigation";
import { AppWrap } from "../../App.styles";
import Content from "./Content/Content";

export default function Error(props){
    return (
        <AppWrap>
           <Navigation
                routes = {props.routes}
                onClickRoute = {(idx) => {props.onClickRoute(idx)}}
           />
          <Content 
            errorMsg = {props.errorMsg}
          />
        </AppWrap>
    );
}