interface IConfig {
    env: string;
    api_url: string;
    websocket_url: string;
}

const config: IConfig = {
    env: process.env.NODE_ENV || 'development',
    api_url: process.env.NEXT_PUBLIC_API_URL || '',
    websocket_url: process.env.NEXT_PUBLIC_WEBSOCKET_URL || '',
};

export default config;
