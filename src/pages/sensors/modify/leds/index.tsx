import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Switch, useMantineTheme, Text, TextInput, Group, Button } from '@mantine/core';
import io from 'socket.io-client';
import { randomId, useMediaQuery } from '@mantine/hooks';
import { IconMoonStars, IconSun } from '@tabler/icons';
import { useForm } from '@mantine/form';
import LiveSensorsCard from '../../../../components/LiveSensors/LiveSensorsCard';
import Temperature from '../../../../../public/assets/images/temperature.png';
import LedSwitch from '../../../../components/LiveSensors/LedColors';

const LiveSensors = () => {
    const [alertStatus, setAlertStatus] = useState(false);
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const theme = useMantineTheme();
    const form = useForm({
        initialValues: {
            tempThreshold: '',
        },
    });
    const [submittedValues, setSubmittedValues] = useState('');

    useEffect(() => {
        const socket = io('http://192.168.1.2:4000');

        let alertTimeout: any = null;

        socket.on('sensorData', (message) => {
            let data;
            try {
                data = JSON.parse(message);
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
                return;
            }

            const latestData = data[data.length - 1];
            console.log(latestData);

            setTemperature(latestData.temperature);
            setHumidity(latestData.humidity);
        });

        socket.on('alertData', (message) => {
            let data;
            try {
                data = JSON.parse(message);
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
                return;
            }

            clearTimeout(alertTimeout);

            setAlertStatus(data.alertStatus);

            alertTimeout = setTimeout(() => {
                setAlertStatus(false);
            }, 5000);
        });

        return () => {
            socket.disconnect();
            clearTimeout(alertTimeout);
        };
    }, []);

    return (
        <Container
          py={isMobile ? 10 : 50}
          style={{
                justifyContent: 'center',
                alignItems: 'left',
            }}
          color="yellow"
        >
            <Grid>
                <Grid.Col md={6} lg={3}>
                    <LedSwitch color="violet" tittle="Violet" />
                </Grid.Col>

                <Grid.Col md={6} lg={3}>
                    <LedSwitch color="grape" tittle="Grape" />
                </Grid.Col>

                <Grid.Col md={6} lg={3}>
                    <LedSwitch color="gray" tittle="Gray" />
                </Grid.Col>

                <Grid.Col md={6} lg={3}>
                    <LedSwitch color="indigo" tittle="Magenta" />
                </Grid.Col>
                <Grid.Col md={6} lg={3}>
                    <LedSwitch color="yellow" tittle="Yellow" />
                </Grid.Col>
                <Grid.Col md={6} lg={3}>
                    <LedSwitch color="orange" tittle="Orange" />
                </Grid.Col>
                <Grid.Col md={6} lg={3}>
                    <LedSwitch color="cyan" tittle="Cyan" />
                </Grid.Col>
                <Grid.Col md={6} lg={3}>
                    <LedSwitch color="green" tittle="Green" />
                </Grid.Col>

            </Grid>
        </Container>
    );
};

export default LiveSensors;
