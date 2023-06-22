import React, { createContext, ReactNode, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';
import config from '../../../config';

type WebSocketContextType = {
    alertStatus: boolean;
    socket: Socket | null;
};

export const WebSocketContext = createContext<WebSocketContextType>({
    alertStatus: false,
    socket: null,
});

interface WebSocketProviderProps {
    children: ReactNode;
}

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
    const [alertStatus, setAlertStatus] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);
    const capitalize = (string: string) => string[0].toUpperCase() + string.slice(1)
        .toLowerCase();
    useEffect(() => {
        const ws = io(config.websocket_url);
        setSocket(ws);

        ws.on('alertData', (message) => {
                let data;
                try {
                    data = JSON.parse(message);
                } catch (error) {
                    console.error('Error parsing WebSocket message:', error);
                    return;
                }

                setAlertStatus(data.alertStatus);

                if (data.alertStatus) {
                    showNotification({
                        title: `${capitalize(data.alert)} in ${capitalize(data.sensor)}`,
                        message: `${capitalize(data.sensor)} is over ${data.value}`,

                        color: 'red',
                        autoClose: 2000,
                        icon: <IconX />,
                        styles: (theme) => ({
                            root: {
                                backgroundColor: theme.colors.red[8],
                                borderWidth: 10,
                                borderColor: theme.colors.red[5],

                                '&::before': { backgroundColor: theme.colors.white },
                            },

                            title: { color: theme.white, fontWeight: 900 },
                            description: { color: theme.white },
                            closeButton: {
                                color: theme.white,
                                '&:hover': { backgroundColor: theme.colors.blue[7] },
                            },

                        }),

                    });
                }
            }
        );
        return () => {
            ws.disconnect();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{
            alertStatus,
            socket,
        }}
        >
            {children}
        </WebSocketContext.Provider>
    );
};
