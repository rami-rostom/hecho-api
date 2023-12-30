declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      PG_URL: string;
      ACCESS_JWT_SECRET: string;
      REFRESH_JWT_SECRET: string;
    }
  }
}

export {}