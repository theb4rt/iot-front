import { useEffect, useState } from 'react';
import { Container, Grid } from '@mantine/core';
import io from 'socket.io-client';
import { useMediaQuery } from '@mantine/hooks';
import LiveSensorsCard from '../../../components/LiveSensors/LiveSensorsCard';
import Temperature from '../../../../public/assets/images/temperature.png';
import Humidity from '../../../../public/assets/images/humidity.png';
import config from '../../../../config';

const LiveSensors = () => {
    const [alertStatus, setAlertStatus] = useState(false);
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const isMobile = useMediaQuery('(max-width: 768px)');

    useEffect(() => {
        const socket = io(config.websocket_url);

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
                    <LiveSensorsCard
                      cardImage={Temperature}
                      alertStatus={alertStatus}
                      sensorName="Temperature"
                      sensorValue={temperature || '-'}

                    />
                </Grid.Col>
                <Grid.Col md={6} lg={3}>
                    <LiveSensorsCard
                      cardImage={Humidity}
                      alertStatus={false}
                      sensorName="Humidity   "
                      sensorValue={humidity || '-'}

                    />
                </Grid.Col>
            </Grid>
        </Container>
    );
};

export default LiveSensors;
