import React from 'react';
import Amplify, {API, graphqlOperation} from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import {listCodes} from "./graphql/queries";



Amplify.configure(awsconfig);

function App() {

    const [codes, setCodes] = React.useState([]);

    const fetchCode = async () => {
        try {
        //   const user_info = await Auth.currentAuthenticatedUser({bypassCache:true})
        //   console.log("User info: ",user_info)
    
        //   if (user_info){
        const codeData = await API.graphql(graphqlOperation(listCodes));
        const codeList = codeData.data.listCodes.items;
        console.log("Code list: ", codeList);
        setCodes(codeList);
        //   }
        }catch(error){
          console.log("fetchCode Error: ", error);
        }
    }

    React.useEffect(() => {
        fetchCode();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <AmplifySignOut />
                <h2>My App Content</h2>
            </header>
        </div>
    );
}

export default withAuthenticator(App);