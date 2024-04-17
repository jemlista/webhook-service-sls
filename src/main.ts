import { Callback, Context, Handler, S3Event } from 'aws-lambda';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
let server: Handler;

/**
 * Bootstraps the whole application
 * @returns {Promise<Handler>}
 */
async function bootstrap(): Promise<Handler> {
    const app = await NestFactory.create(AppModule);
    app
        .useGlobalPipes(
            new ValidationPipe({
                transform: true,
                whitelist: true,
                transformOptions: { enableImplicitConversion: true },
            }),
        )
        .enableVersioning({
            type: VersioningType.URI,
        })
        .useGlobalFilters(new HttpExceptionFilter());

    await app.init();

    return serverlessExpress({ app: app.getHttpAdapter().getInstance() });
}

/**
 * Creates an HTTP handler
 * @param {any} event
 * @param {Context} context
 * @param {Callback} callback
 * @returns
 */
export const httpHandler: Handler = async (
    event: any,
    context: Context,
    callback: Callback,
) => {
    server = server ?? (await bootstrap());

    return server(event, context, callback);
};

/**
 * Handle S3 Update Event.
 *
 * @param {S3Event} event
 * @returns {Handler}
 */
export const xenditWebhook: Handler = async (
    event: S3Event,
    context: Context,
    // callback: Callback,
) => {
    console.log(event);
    console.log(context);
    console.log('HAHAHAHHA');
};

