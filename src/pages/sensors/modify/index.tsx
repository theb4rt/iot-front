import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Switch, useMantineTheme, Text, TextInput, Group, Button } from '@mantine/core';
import io from 'socket.io-client';
import { randomId, useMediaQuery } from '@mantine/hooks';
import { IconMoonStars, IconSun } from '@tabler/icons';
import { useForm } from '@mantine/form';
import LiveSensorsCard from '../../../components/LiveSensors/LiveSensorsCard';
import Temperature from '../../../../public/assets/images/temperature.png';
import LedSwitch from '../../../components/LiveSensors/LedColors';

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
                          size="xl"
                          color="yellow"
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
                        <form
                          onSubmit={form.onSubmit((values) => setSubmittedValues(JSON.stringify(values, null, 2)))}
                        >
                            <Text size="lg">Temperature Threshold</Text>
                            <TextInput label="Current Value" placeholder="-" disabled />
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
                                  onClick={() =>
                                        form.setValues({
                                            tempThreshold: randomId(),
                                        })
                                    }
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
