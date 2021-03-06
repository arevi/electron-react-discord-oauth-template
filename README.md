# Electron-React-Discord-OAuth-Template - Documentation

A minimal template for deploying an electron application built with React and utilizing Discord's OAuth2 authentication.

This template is minimal, by design, reducing the overhead required for customization. Out of the box, it will feature minimal pages that need to be modified. This results in less time being spent cleaning up unused portions of the code, and less time to production.

## Getting Started

| Command       | Effect                                                                   |
| ------------- | ------------------------------------------------------------------------ |
| `npm install` | Install all of the required node modules and dependencies for the project |


- Visit https://discord.com/developers/applications/ to create an application and enable the OAuth2 flow.
- Set your redirect URL's within the discord OAuth2 context to redirect to your specified port/route (Default: http://localhost:5005/auth)
- Rename "config.sample.ts" to "config.ts" and enter your Discord OAuth client information
- Modify the "validGuilds" array within the config file to your specified guild IDs.


## Development Commands

The following commands with allow for an intuitive development environment with the application hot reloading on any frontend application changes.
**The application will not hot reload on electron changes.**

| Command        | Effect                                                                   |
| -------------- | ------------------------------------------------------------------------ |
| `dev:webpack`  | Compiles a development version of all applicable files (main & renderer) |
| `dev:react`    | Launches a live webpack development server on port 3000                  |
| `dev:electron` | Launches electron and connects to port 3000                              |

> The `dev:react` command must be ran prior to `dev:electron` to connect to the local server.

> While in `Development` mode Chrome Developer Tools can be opened via Ctrl+Shift+I.

## Production Commands

The following commands with compile the application for win32 platform machines.

| Command        | Effect                                                                  |
| -------------- | ----------------------------------------------------------------------- |
| `prod:webpack` | Compiles a production version of all applicable files (main & renderer) |
| `build:win`    | Compiles the production files to a Windows executable                   |
| `build:mac`    | Compiles the production files to a MacOS DMG                            |

> While in `Production` mode Chrome Developer Tools is disabled.
