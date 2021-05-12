declare module NodeJS {
  interface Process {
    browser: boolean;
    client: boolean;
    server: boolean;
  }
}
