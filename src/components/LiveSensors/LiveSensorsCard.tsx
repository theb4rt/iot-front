import { Button, Card, Group, Text } from '@mantine/core';
import Image, { StaticImageData } from 'next/image';
import React from 'react';
import styles from './LiveSensors.module.css';
import AlertBadge from './AlertBadge';

type LiveSensorsCardProps = {
    cardImage: StaticImageData;
    sensorValue: string;
    alertStatus: boolean;
    sensorName: string;
};

const LiveSensorsCard = ({
                             cardImage,
                             sensorValue,
                             alertStatus,
                             sensorName,
                         }: LiveSensorsCardProps) => (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      className={styles.myCard}

    >
        <Card.Section component="a" style={{ textAlign: 'center' }}>
            <Image alt="logo" src={cardImage} width={250} />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
            <Text weight={800} color="black">{sensorName} </Text>
            <AlertBadge alertStatus={alertStatus} />
        </Group>

        <Button variant="filled" color="green" fullWidth mt="xl" radius="md" size="xl">
            <Text fz={50}>{sensorValue}</Text>

        </Button>

    </Card>);
export default LiveSensorsCard;
