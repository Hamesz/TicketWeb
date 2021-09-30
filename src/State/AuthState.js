import {AmplifyAuthenticator, AmplifySignUp} from '@aws-amplify/ui-react';

export function AuthState(){
    // OAuth
    // const federated = {
    //   googleClientId: 'f34f4w4334w', // Enter your googleClientId here
    //   facebookAppId: 'fqf4q3yt34y34', // Enter your facebookAppId here
    //   amazonClientId: 'q4rtq3tq34tq34' // Enter your amazonClientId here
    // };
    // console.debug("Should be returning something now...");
    return (
        //<AmplifyAuthenticator >//federated={federated}>
        <AmplifyAuthenticator >
            <AmplifySignUp
            slot="sign-up"
            formFields={[
                {
                type: "username",
                label: "Username *",
                inputProps: { required: true, autocomplete: "username" },
                },
                // Email
                {
                type: "email",
                label: "Email *",
                inputProps: { required: true, autocomplete: "username" },
                },
                // Password
                {
                type: "password",
                label: "Password *",
                inputProps: { required: true, autocomplete: "new-password" },
                },
                // First Name
                {
                type: "name",
                label: "First Name *",
                placeholder: "Bob",
                hint: "Used as the name on your ticket",
                inputProps: { 
                required: true, 
                autocomplete: "Bob" 
                }
                },
                // last name
                {
                type: "family_name",
                label: "Last Name *",
                placeholder: "White",
                hint: "Used as the name on your ticket",
                inputProps: { required: true, autocomplete: "White" }
                },
                // btc wallet address
                {
                type: "custom:btc_wallet_address",
                label: "Bitcoin Wallet Address *",
                placeholder: "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5",
                hint: "Used to identify who has paid",
                inputProps: { required: true}
                },

            ]}
            />
        </AmplifyAuthenticator>
    );
}