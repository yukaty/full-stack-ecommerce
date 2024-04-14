import { environment } from '../../environments/environment';

export default {
  oidc: {
      clientId: environment.oidcConfig.clientId,
      issuer: environment.oidcConfig.issuer,
      redirectUri: environment.oidcConfig.redirectUri,
      scopes: environment.oidcConfig.scopes
  }
};
