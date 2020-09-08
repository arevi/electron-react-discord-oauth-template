import { Server, createServer, IncomingMessage, ServerResponse } from "http";
import querystring from "querystring";
import url from "url";
import { shell } from "electron";
import OAuthConfig from "../models/OAuthConfig";

class AuthClient {
  private _oauthConfig: OAuthConfig;
  private _server: Server;
  private _authorizationCode: string = "";

  /**
   * Constructor for initializing our Discord OAuth authorization client
   * @param oauthConfig OAuth configuration options
   */
  constructor(oauthConfig: OAuthConfig) {
    this._oauthConfig = oauthConfig;
    this._server = createServer(this.requestListener);
  }

  /**
   *
   * @param req The incoming request object
   * @param res The server response which will be sent back
   */
  private requestListener = async (
    req: IncomingMessage,
    res: ServerResponse
  ) => {};

  /**
   * Starts listening for http requests on the port specified in our OAuth configuration
   */
  public startListening = () => {
    this._server.listen(this._oauthConfig.port);
  };

  /**
   * Closes the http server and prevents further requests
   */
  public stopListening = () => {
    this._server.close();
  };

  /**
   * Opens the current default browser on the system to the Discord OAuth authentication page
   */
  public openBrowser = (): void => {
    shell.openExternal(
      `https://discord.com/api/oauth2/authorize?client_id=${
        this._oauthConfig.clientId
      }&redirect_uri=${encodeURI(
        this._oauthConfig.redirectUri
      )}&response_type=code&scope=${encodeURI(this._oauthConfig.scope)}`
    );
  };
}

export default AuthClient;
