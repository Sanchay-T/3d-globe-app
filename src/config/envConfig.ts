// Environment variable configuration for browser environment
interface EnvConfig {
  perplexityApiKey: string;
  autoRotate: boolean;
}

const getEnvVar = (key: string): string => {
  if (typeof window === 'undefined') {
    throw new Error('Environment can only be accessed in browser context');
  }
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set in .env file`);
  }
  return value;
};

export const config: EnvConfig = {
  perplexityApiKey: getEnvVar('REACT_APP_PERPLEXITY_API_KEY'),
  autoRotate: getEnvVar('REACT_APP_AUTO_ROTATE') === 'true',
};