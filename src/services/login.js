const supertokens = require('supertokens-node');
const Session = require("supertokens-node/recipe/session");
const ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");
const Dashboard = require("supertokens-node/recipe/dashboard")
const config = require("../config")

supertokens.init({
    framework: config.SUPERTOKENS.FRAMEWORK,
    supertokens: {
        connectionURI: config.SUPERTOKENS.host,
        // apiKey: <API_KEY(if configured)>,
    },
    appInfo: {
        // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
        appName: config.APP_NAME,
        apiDomain: config.API_URL,
        websiteDomain: config.WEB_URL,
        apiBasePath: config.SUPERTOKENS.authPath,
        websiteBasePath: config.SUPERTOKENS.authPath
    },
    recipeList: [
        Dashboard.init(),
        ThirdPartyEmailPassword.init({
            // We have provided you with development keys which you can use for testing.
            // IMPORTANT: Please replace them with your own OAuth keys for production use.
            providers: [{
                config: {
                    thirdPartyId: config.SUPERTOKENS.PROVIDERS.google,
                    clients: [{
                        clientId: config.GOOGLE.clientId,
                        clientSecret: config.GOOGLE.clientSecret
                    }]
                }
            }],
        }),
        Session.init({
            exposeAccessTokenToFrontendInCookieBasedAuth: true
        }) // initializes session features
    ]
});