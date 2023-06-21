import Service from './service';

interface LedData {
    led_color: number;
}

class ChangeValueService extends Service {
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
}

export default ChangeValueService;
