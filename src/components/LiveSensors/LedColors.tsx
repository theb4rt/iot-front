import React from 'react';
import { Paper, Switch, Text, useMantineTheme } from '@mantine/core';

interface AlertBadgeProps {
    tittle: string;
    color: string;
}

const LedSwitch: React.FC<AlertBadgeProps> = ({
                                                  tittle,
                                                  color,
                                              }) => {
    return (
        <Paper
          shadow="md"
          radius="lg"
          p="md"
            // style={{
            //       height: '100px',
            //       overflow: 'hidden',
            //   }}
        >
            <Text> {tittle}</Text>
            <Switch
              size="xl"
              color={color}
              onLabel="ON"
              offLabel="OFF"
            />

        </Paper>
    );
};

export default LedSwitch;
