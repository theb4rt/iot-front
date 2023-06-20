import React, { useEffect, useState } from 'react';
import { Badge } from '@mantine/core';

interface AlertBadgeProps {
    alertStatus: boolean;
}

const AlertBadge: React.FC<AlertBadgeProps> = ({ alertStatus }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (alertStatus) {
            interval = setInterval(() => {
                setIsVisible((prev) => !prev);
            }, 250);
        } else if (interval) {
            clearInterval(interval);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
                setIsVisible(false);
            }
        };
    }, [alertStatus]);

    return (
        <Badge color="red" variant="filled" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
            TEMP CRITICAL
        </Badge>
    );
};

export default AlertBadge;
