import 'dotenv/config'; // Charge automatiquement le .env

const azureConfig = {
    connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
    containerName: process.env.CONTAINER_NAME || 'uploads'
};

export default azureConfig;