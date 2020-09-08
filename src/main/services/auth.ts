import { Server } from "http";
import { shell } from "electron";
import { listeningPort, validGuilds } from "../config/config";
import { setAuthResult } from "../app";
import Express, { Request, Response } from "express";
import got from "got";
import OAuthConfig from "../models/OAuthConfig";
import Guild from "../models/Guild";

class AuthClient {
  private _oauthConfig: OAuthConfig;
  private _server: Server;
  private expressApp = Express();

  /**
   * Constructor for initializing our Discord OAuth authorization client
   * @param oauthConfig OAuth configuration options
   */
  constructor(oauthConfig: OAuthConfig) {
    this._oauthConfig = oauthConfig;
    this._server = this.expressApp.listen(listeningPort);

    this.expressApp.get("/auth", async (req: Request, res: Response) => {
      if (!req.query.code) setAuthResult(false);

      // Spread operation to copy oauth configuration and insert authorization code from Discord
      const data: OAuthConfig = {
        ...this._oauthConfig,
        code: String(req.query.code),
      };

      try {
        // Sends OAuth data to Discord, expecting a bearer token result
        let result = await got.post("https://discordapp.com/api/oauth2/token", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          form: data,
        });

        if (!result) setAuthResult(false);

        let token: string = JSON.parse(result.body).access_token;

        // Retrieves users guilds using the bearer token retrieved
        result = await got("http://discordapp.com/api/users/@me/guilds", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let guildArr: Guild[] = JSON.parse(result.body);

        // Filters the guild response array for the predefined valid guild IDs
        guildArr = guildArr.filter((guild) => validGuilds.includes(guild.id));

        setAuthResult(guildArr.length > 0);
      } catch (err) {
        setAuthResult(false);
      }

      // Redirects user to the main discord webpage after the authorization request
      return res.redirect("https://discord.com/app");
    });
  }

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
        this._oauthConfig.client_id
      }&redirect_uri=${encodeURI(
        this._oauthConfig.redirect_uri
      )}&response_type=code&scope=${encodeURI(this._oauthConfig.scope)}`
    );
  };
}

export default AuthClient;
