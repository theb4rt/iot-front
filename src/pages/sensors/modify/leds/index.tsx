import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mantine/core';
import io from 'socket.io-client';
import { useMediaQuery } from '@mantine/hooks';
import LedSwitch from '../../../../components/LiveSensors/LedColors';
import SensorValuesService from '../../../../../services/sensorValuesService';

const LiveSensors = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [submittedValues, setSubmittedValues] = useState('');
    const [activeLedColor, setActiveLedColor] = useState<Number>(-1);
    const sensorValuesService = new SensorValuesService();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await sensorValuesService.configure_led(activeLedColor);
                console.log(response);
            } catch (error) {
                console.error('Error performing LED color request:', error);
            }
        };

        if (activeLedColor !== -1) {
            fetchData();
        }
    }, [activeLedColor]);

    // useEffect(() => {
    //     const socket = io('http://192.168.1.2:4000');
    //
    //     let alertTimeout: any = null;
    //
    //     socket.on('sensorData', (message) => {
    //         let data;
    //         try {
    //             data = JSON.parse(message);
    //         } catch (error) {
    //             console.error('Error parsing WebSocket message:', error);
    //             return;
    //         }
    //
    //         const latestData = data[data.length - 1];
    //         console.log(latestData);
    //     });
    //
    //     socket.on('alertData', (message) => {
    //         let data;
    //         try {
    //             data = JSON.parse(message);
    //         } catch (error) {
    //             console.error('Error parsing WebSocket message:', error);
    //             return;
    //         }
    //
    //         clearTimeout(alertTimeout);
    //
    //         setAlertStatus(data.alertStatus);
    //
    //         alertTimeout = setTimeout(() => {
    //             setAlertStatus(false);
    //         }, 5000);
    //     });
    //
    //     return () => {
    //         socket.disconnect();
    //         clearTimeout(alertTimeout);
    //     };
    // }, []);

    const ledColorOnChange = (led_num: Number) => {
        console.log(led_num);
        setActiveLedColor(led_num);
    };

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
                    <LedSwitch
                      color="violet"
                      tittle="Violet"
                      onChangeValue={() => ledColorOnChange(0)}
                      activeValue={activeLedColor === 0}
                      id={0}
                    />
                </Grid.Col>

                <Grid.Col md={6} lg={3}>
                    <LedSwitch
                      color="grape"
                      tittle="Grape"
                      onChangeValue={() => ledColorOnChange(1)}
                      activeValue={activeLedColor === 1}
                      id={1}
                    />
                </Grid.Col>

                <Grid.Col md={6} lg={3}>
                    <LedSwitch
                      color="red"
                      tittle="Red"
                      onChangeValue={() => ledColorOnChange(2)}
                      activeValue={activeLedColor === 2}
                      id={2}
                    />
                </Grid.Col>
                <Grid.Col md={6} lg={3}>
                    <LedSwitch
                      color="gray"
                      tittle="Gray"
                      onChangeValue={() => ledColorOnChange(3)}
                      activeValue={activeLedColor === 3}
                      id={3}
                    />
                </Grid.Col>

                <Grid.Col md={6} lg={3}>
                    <LedSwitch
                      color="indigo"
                      tittle="Magenta"
                      onChangeValue={() => ledColorOnChange(4)}
                      activeValue={activeLedColor === 4}
                      id={4}
                    />
                </Grid.Col>
                <Grid.Col md={6} lg={3}>
                    <LedSwitch
                      color="yellow"
                      tittle="Yellow"
                      onChangeValue={() => ledColorOnChange(5)}
                      activeValue={activeLedColor === 5}
                      id={5}
                    />
                </Grid.Col>
                <Grid.Col md={6} lg={3}>
                    <LedSwitch
                      color="orange"
                      tittle="Orange"
                      onChangeValue={() => ledColorOnChange(6)}
                      activeValue={activeLedColor === 6}
                      id={6}
                    />
                </Grid.Col>
                <Grid.Col md={6} lg={3}>
                    <LedSwitch
                      color="cyan"
                      tittle="Cyan"
                      onChangeValue={() => ledColorOnChange(7)}
                      activeValue={activeLedColor === 7}
                      id={7}
                    />

                </Grid.Col>
                <Grid.Col md={6} lg={3}>
                    <LedSwitch
                      color="blue"
                      tittle="Blue"
                      onChangeValue={() => ledColorOnChange(8)}
                      activeValue={activeLedColor === 8}
                      id={8}
                    />
                </Grid.Col>
                <Grid.Col md={6} lg={3}>
                    <LedSwitch
                      color="green"
                      tittle="Green"
                      onChangeValue={() => ledColorOnChange(9)}
                      activeValue={activeLedColor === 9}
                      id={9}
                    />
                </Grid.Col>

            </Grid>
        </Container>
    );
};

export default LiveSensors;
