import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Group, Paper, Switch, Text, TextInput, useMantineTheme } from '@mantine/core';
import io from 'socket.io-client';
import { useMediaQuery } from '@mantine/hooks';
import { IconCheck, IconMoonStars, IconSun, IconX } from '@tabler/icons';
import { useForm } from '@mantine/form';
import config from '../../../../config';
import SensorValuesService from '../../../../services/sensorValuesService';

const LiveSensors = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [actualLedOn, setActualLedOn] = useState(99);
    const [actualThresholdTem, setActualThresholdTem] = useState(0);
    const [actualTestModeStatus, setActualTestModeStatus] = useState(false);
    const [alertLedState, setAlertLedState] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [checked, setChecked] = useState(false);
    const theme = useMantineTheme();

    const isMobile = useMediaQuery('(max-width: 768px)');

    const form = useForm({
        initialValues: {
            tempThreshold: '',
        },
        validate: {
            tempThreshold: (value) => {
                const numericValue = parseInt(value, 10);
                const isValid = !Number.isNaN(numericValue) && value.trim().length > 0;
                return isValid ? null : 'Invalid value';
            },
        },

    });

    const sensorValuesService = new SensorValuesService();

    useEffect(() => {
        const socket = io(config.websocket_url);

        const alertTimeout: any = null;

        socket.on('actualValues', (message) => {
            let data;
            console.log(message);
            try {
                data = JSON.parse(message);
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
                return;
            }
            setActualLedOn(data.actualLedOn);
            setActualThresholdTem(data.actualThresholdTem);
            setActualTestModeStatus(data.actualTestModeStatus);
            setAlertLedState(data.alertLedState);
        });

        return () => {
            socket.disconnect();
            clearTimeout(alertTimeout);
        };
    }, []);

    useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await sensorValuesService.get_sensor_values();
                    console.log(response);
                } catch (error) {
                    console.error('Error:', error);
                }
            };
            fetchData();
        }, []
    );

    const changeTestMode = async (testMode: boolean) => {
        try {
            console.log('testMode: ', testMode);
            const response = await sensorValuesService.changeTestMode(testMode);
            console.log(response);
            // Handle the response if needed
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleClickTestMode = () => {
        const testMode = !actualTestModeStatus;
        changeTestMode(testMode);
        setActualTestModeStatus(testMode);
    };

    const changeAlertLedState = async (ledState: boolean) => {
        try {
            const response = await sensorValuesService.change_alert_led(ledState);
            console.log(response);
            // Handle the response if needed
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleClickLedEmergency = () => {
        const ledState = !alertLedState;
        changeAlertLedState(ledState);
        setAlertLedState(ledState);
    };

    const handleSubmitThreshold = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const { tempThreshold } = form.values;
        try {
            const response = await sensorValuesService.change_threshold_temp(Number(tempThreshold));
            console.log(response);
            setActualThresholdTem(Number(tempThreshold));
        } catch (error) {
            console.error('Error:', error);
        }
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
                    <Paper
                      shadow="md"
                      radius="lg"
                      p="md"
                      style={{
                            height: '140px',
                            overflow: 'auto',
                        }}
                    >
                        <Text> Test Mode Status</Text>
                        <Switch
                          checked={actualTestModeStatus}
                          onChange={() => handleClickTestMode()}
                          color="teal"
                          size="md"
                          thumbIcon={
                                checked ? (
                                    <IconCheck
                                      size={12}
                                      color={theme.colors.teal[theme.fn.primaryShade()]}
                                      stroke={3}
                                    />
                                ) : (
                                    <IconX
                                      size={12}
                                      color={theme.colors.red[theme.fn.primaryShade()]}
                                      stroke={3}
                                    />
                                )
                            }
                        />
                    </Paper>

                </Grid.Col>
                <Grid.Col md={6} lg={3}>

                    <Paper
                      shadow="md"
                      radius="lg"
                      p="md"
                      style={{
                            height: '140px',
                            overflow: 'auto',
                        }}
                    >
                        <Text> Turns on/off the emergency Led</Text>
                        <Switch
                          size="xl"
                          color="yellow"
                          checked={alertLedState}
                          onChange={() => handleClickLedEmergency()}
                          onLabel={
                                <IconSun
                                  size={20}
                                  stroke={2.5}
                                  color={theme.colors.yellow[4]}

                                />
                            }
                          offLabel={
                                <IconMoonStars
                                  size={20}
                                  stroke={2.5}
                                  color={theme.colors.blue[6]}

                                />
                            }
                        />
                    </Paper>

                </Grid.Col>
                <Grid.Col md={6} lg={3}>
                    <Paper shadow="md" radius="lg" p="md" withBorder>
                        <form onSubmit={handleSubmitThreshold}>
                            <Text size="lg">Temperature Threshold</Text>
                            <TextInput
                              label="Current Value"
                              placeholder={`${actualThresholdTem} °C`}
                              disabled
                              styles={{
                                    input: { fontSize: '20px' },
                                }}
                            />
                            <TextInput
                              mt="md"
                              label="Enter new value"
                              placeholder="Ejm: 29"
                              type="number"
                              {...form.getInputProps('tempThreshold')}
                            />

                            <Group position="center" mt="xl">
                                <Button
                                  variant="filled"
                                  type="submit"
                                >
                                    Send
                                </Button>
                            </Group>
                        </form>
                    </Paper>
                </Grid.Col>

                {/*
                <Grid.Col md={6} lg={3}>
                    <Paper shadow="md" radius="lg" p="md" withBorder>
                        <Text size="lg">Humidity Threshold</Text>
                        <TextInput label="Current Value" placeholder="-" disabled />
                        <TextInput
                          mt="md"
                          label="Enter new value"
                          placeholder="Ejm: 29"
                          {...form.getInputProps('humidity-threshold')}
                        />

                        <Group position="center" mt="xl">
                            <Button
                              variant="filled"
                              disabled
                            >
                                Send
                            </Button>
                        </Group>
                    </Paper>
                </Grid.Col>
                */}
            </Grid>
        </Container>
    );
};

export default LiveSensors;
