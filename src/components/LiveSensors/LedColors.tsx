import React, { ChangeEvent } from 'react';
import { Paper, Switch, Text } from '@mantine/core';

interface AlertBadgeProps {
    id: number;
    tittle: string;
    color: string;
    onChangeValue: (id: number) => void;
    activeValue: boolean;
}

const LedSwitch: React.FC<AlertBadgeProps> = ({
                                                  id,
                                                  tittle,
                                                  color,
                                                  onChangeValue,
                                                  activeValue,
                                              }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            onChangeValue(id);
        }
    };

    return (
        <Paper shadow="md" radius="lg" p="md">
            <Text>{tittle}</Text>
            <Switch
              size="xl"
              color={color}
              onLabel="ON"
              offLabel="OFF"
              onChange={handleChange}
              checked={activeValue}
                // checked={resetValue}
            />
        </Paper>
    );
};

export default LedSwitch;
