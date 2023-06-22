import Service from './service';

class SensorValuesService extends Service {
    get prefix() {
        return '/api/v1';
    }

    configure_led(
        led_color: Number) {
        return this.http('/arduino/change-value', {
            method: 'POST',
            body: {
                led_color,
            },
        });
    }

    get_sensor_values() {
        return this.http('/arduino/get-values', {
            method: 'POST',
            body: {},
        });
    }

    changeTestMode(test_mode: boolean) {
        return this.http('/arduino/change-value', {
            method: 'POST',
            body: {
                test_mode,
            },
        });
    }
}

export default SensorValuesService;
