import { Configuration, PopupRequest } from "@azure/msal-browser";

export const b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1_ReadingDiarySignUpSignIn"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://piggycorp.b2clogin.com/piggycorp.onmicrosoft.com/B2C_1_ReadingDiarySignUpSignIn",
        }
    },
    authorityDomain: "piggycorp.b2clogin.com"
};


export const msalConfig: Configuration = {
    auth: {
        clientId: '151ee949-0e8b-4632-9bd9-851da2f80748',
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain],
        redirectUri: 'http://localhost:3000/',
    },
    cache: {
        cacheLocation: 'localStorage'
    },
}

export const protectedResources = {
    readingDiaryApi: {
        endpoint: "http://localhost:5000/",
        scopes: {
            read: ["https://piggycorp.onmicrosoft.com/reading-diary-api/reading-diary.read"],
            write: ["https://piggycorp.onmicrosoft.com/reading-diary-api/reading-diary.write"]
        }
    }
}