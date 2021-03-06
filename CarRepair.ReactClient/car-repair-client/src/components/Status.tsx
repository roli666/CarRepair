import { Tooltip } from "@material-ui/core";
import { Cancel, CheckCircle } from "@material-ui/icons";
import { HubConnectionBuilder, LogLevel, HttpTransportType, HubConnection, HubConnectionState } from "@microsoft/signalr";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import configuration from "../static/configuration.json";

interface StatusProps {
  showTooltip?: boolean;
}

const getStatusTooltipText = (running: boolean) => {
  if (!running) return "No API connection";
  else return "API is running";
};

export const StatusContext = React.createContext(false);

export function Status(props: StatusProps) {
  const [connection, setConnection] = useState<HubConnection>();
  const [status, setStatus] = useState(false);

  const configSocket = useCallback(async () => {
    const socketConnection = new HubConnectionBuilder()
      .configureLogging(LogLevel[configuration.WebSocketLogLevel])
      .withUrl(`${configuration.APIProtocol}://${configuration.APIHostname}:${configuration.APIPort}/status`, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .build();
    try {
      await socketConnection.start();
    } catch (error) {
      setTimeout(() => configSocket(), 5000);
    }
    socketConnection.onclose(() => {
      setStatus(false);
      configSocket();
    });
    setConnection(socketConnection);
  }, []);

  useEffect(() => {
    configSocket();
  }, [configSocket]);

  connection &&
    connection.on("APIRunning", (status) => {
      setStatus(status);
    });

  connection?.state === HubConnectionState.Connected && connection.invoke("GetStatus");

  const color = "#5edc1f";
  const errorColor = "error";

  return (
    <StatusContext.Provider value={status}>
      {props.showTooltip ? (
        <Tooltip title={getStatusTooltipText(status)} placement={"top"}>
          {status ? <CheckCircle htmlColor={color}></CheckCircle> : <Cancel color={errorColor}></Cancel>}
        </Tooltip>
      ) : (
        <>{status ? <CheckCircle htmlColor={color}></CheckCircle> : <Cancel color={errorColor}></Cancel>}</>
      )}
    </StatusContext.Provider>
  );
}
