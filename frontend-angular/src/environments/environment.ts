export const environment = {
  production: false,
  oidc: {
    clientId: '<< OKTA-APP-CLIENT-ID >>',
    issuer: 'https://<< OKTA-DEV-DOMAIN >>/oauth2/default',
    redirectUri: 'https://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email']
  },
  backendApiUrl: "https://localhost:8443/api"
};
