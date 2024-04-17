import { HttpStatus } from '@nestjs/common';

export type EventResponse = {
  statusCode: HttpStatus;
  headers: object;
  body: string;
};

export type DBCredentials = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};
