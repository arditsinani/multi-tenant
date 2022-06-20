enum DATABASE_TYPE {
    POSTGRES = 'postgres',
}

/**
 * @config
 * @description the application is part of
 * The Twelve-Factor app
 * which means that it can run on any environment no matter the configuration
 * it only needs the correct configuration for the environment variables
 * @note the default values are used as a fallback
 * just for faster development because the app needs support for changes if running on docker
 * right now the postgres instance runs on docker and for development, the app runs without it
 * another solution could have been to add support for changes (ctrl+s) and to restart the container
 * The variables would have been also in the environment in that case
 * @note another solution could have been to use node-config to handle multiple environments
 */
export default () => ({
    appTitle: 'Multi Tenant',
    appDescription: 'Multi Tenant application',
    version: '1.0',
    env: process.env.NODE_ENV || 'develop',
    apiPrefix: process.env.API_PREFIX || 'api/v1',
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        type: DATABASE_TYPE.POSTGRES, // to be changed if any other database needs to be used
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        username: process.env.DATABASE_USERNAME || 'dev',
        password: process.env.DATABASE_PASSWORD || 'password',
        default: process.env.DATABASE_DEFAULT || 'postgres',
    },
})
