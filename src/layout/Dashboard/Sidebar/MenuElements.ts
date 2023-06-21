import { IconCalendarStats, IconCloudComputing, IconLayoutDashboard, IconNetwork, IconWorldWww } from '@tabler/icons';

export const menuElements = [
    {
        label: 'Dashboard',
        icon: IconLayoutDashboard,
        initiallyOpened: true,
        dropdownElements: [{
            label: 'Default',
            route: '/',
            iconDropdown: IconLayoutDashboard,
        }],

    },
    {
        label: 'Live Data',
        icon: IconNetwork,
        initiallyOpened: false,
        dropdownElements: [
            {
                label: 'Live Sensor Data',
                route: '/sensors/live',
                iconDropdown: IconCalendarStats,
            },

        ],
    },
    {
        label: 'Historical',
        icon: IconWorldWww,
        initiallyOpened: false,
        dropdownElements: [
            {
                label: 'Temperature',
                route: '/historical/temperature',
                iconDropdown: IconCalendarStats,
            },
            {
                label: 'Humidity',
                route: '/historical/humidity',
                iconDropdown: IconCalendarStats,

            },
        ],
    },
    {
        label: 'Modify Sensors',
        icon: IconCloudComputing,
        initiallyOpened: false,
        dropdownElements: [
            {
                label: 'Sensors',
                route: '/sensors/modify',
                iconDropdown: IconCloudComputing,
            },
        ],
    },
    {
        label: 'Led Test',
        icon: IconCloudComputing,
        initiallyOpened: false,
        dropdownElements: [
            {
                label: 'Led Test',
                route: '/sensors/modify/leds',
                iconDropdown: IconCloudComputing,
            },
        ],
    },

];
