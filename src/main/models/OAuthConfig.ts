interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  grantType: string;
  redirectUri: string;
  scope: string;
  port: number;
}

export default OAuthConfig;
