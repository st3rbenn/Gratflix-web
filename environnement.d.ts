export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string;
      API_KEY: string;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
