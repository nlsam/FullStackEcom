export default {
    oidc:{
        clientId: '0oa5869i7kdYEwxh95d7',
        issuer: 'https://dev-19793492.okta.com/oauth2/default',
        redirectUri: window.location.origin + '/login/callback',
        scopes: ['openid', 'profile','email']
    }
}
