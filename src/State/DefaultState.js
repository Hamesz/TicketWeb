import { AmplifySignOut } from "@aws-amplify/ui-react";

export function DefaultState(){
    return (
        <div>
          <h1>Something went wrong, please sign out and refresh.</h1>
          <AmplifySignOut/>
        </div>
    );
}