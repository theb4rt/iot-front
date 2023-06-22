import { IconCalendarStats, IconEdit, IconHistory, IconLayoutDashboard, IconNetwork, IconTestPipe } from '@tabler/icons';

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
                iconDropdown: IconNetwork,
            },

        ],
    },
    {
        label: 'Historical',
        icon: IconHistory,
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
        icon: IconEdit,
        initiallyOpened: false,
        dropdownElements: [
            {
                label: 'Change Data Sensors',
                route: '/sensors/modify',
                iconDropdown: IconEdit,
            },
        ],
    },
    {
        label: 'Led Test',
        icon: IconTestPipe,
        initiallyOpened: false,
        dropdownElements: [
            {
                label: 'Led Test',
                route: '/sensors/modify/leds',
                iconDropdown: IconTestPipe,
            },
        ],
    },

];
