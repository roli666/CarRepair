import { Tooltip } from "@material-ui/core";
import { Cancel, CheckCircle } from "@material-ui/icons";
import { HubConnectionBuilder, LogLevel, HttpTransportType, HubConnection, HubConnectionState } from "@microsoft/signalr"
import { useCallback, useEffect, useState } from "react";
import configuration from "./static/configuration.json"

interface StatusProps {
    showTooltip?: boolean
}

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
            await socketConnection.start()
        } catch (error) {
            setTimeout(() => configSocket(), 5000);
        }
        socketConnection.onclose(() => setStatus(false))
        setConnection(socketConnection);
    },[]);

    useEffect(() => {
        configSocket()
    }, [configSocket]);

    connection &&
        connection.on("APIRunning", status => {
            setStatus(status)
        })

    connection?.state === HubConnectionState.Connected && connection.invoke("GetStatus")

    return (
        props.showTooltip ?
            <Tooltip title={"Server status"} placement={"top"}>
                {status ?
                    <CheckCircle color={"primary"}></CheckCircle>
                    : <Cancel color={"error"}></Cancel>
                }
            </Tooltip>
            :
            <>
                {status ?
                    <CheckCircle color={"primary"}></CheckCircle>
                    : <Cancel color={"error"}></Cancel>
                }
            </>
    )

}