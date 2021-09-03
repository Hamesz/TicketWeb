import React from "react";
import {NavigationWrap} from "./Navigation.styles"
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn, AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
function Navigation(props) {
    // console.log("props in Navigation Content", props);
    const routes = props.routes;
    return (
        <NavigationWrap>
            <div className="navigationGrid">
                {
                routes.map((type, idx) => 
                    <button 
                        className="navigationItem" 
                        key={idx}
                        onClick={() => {props.onClickRoute(idx)}}
                    >
                        {routes[idx]}
                    </button>
                )
                }
                <button className="navigationItem" > 
                    <AmplifySignOut />
                </button>
            </div>
        </NavigationWrap>
    )
}

export default Navigation;