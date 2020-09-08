import React, { useState } from "react";
import { ipcRenderer } from "electron";
import "./Status.css";

const Status = (): JSX.Element => {
  const [authStatus, setAuthStatus] = useState("waiting");

  ipcRenderer.on("authChannel", (event, args) => {
    setAuthStatus(args);
  });

  const statusMesage = () => {
    switch (authStatus) {
      case "waiting":
        return "Waiting for Discord authorization...";
      case "success":
        return "Successfully validated with Discord";
      case "failure":
        return "Failed to validate with Discord";
    }
  };

  return (
    <div id="StatusComponent">
      <p id="StatusMessage">{statusMesage()}</p>
    </div>
  );
};

export default Status;
