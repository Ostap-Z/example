import { Serializable } from 'node:child_process';
import { APIRequestContext } from '@playwright/test';
import { HttpClient } from 'src/types/http/client';
import logger from 'logger';

class PlaywrightClient implements HttpClient {
  public constructor(private readonly request: APIRequestContext) {}

  public async post(
    url: string,
    payload?: Serializable,
    headers?: Record<string, string>,
  ): Promise<Serializable> {
    logger.info(`Request URL: ${url}`);
    logger.info(`Request Method: POST`);
    logger.info(`Request Body: ${JSON.stringify(payload)}`);
    logger.info(`Request Headers: ${JSON.stringify(headers)}`);

    const response = await this.request.post(url, {
      data: payload,
      headers: headers,
    });

    const responseBody = await response.json();
    logger.info(`Response Status Code: ${response.status()}`);
    logger.info(`Response Headers: ${JSON.stringify(response.headers())}`);
    logger.info(`Response Body: ${JSON.stringify(responseBody)}`);

    return responseBody as Promise<Serializable>;
  }
}

export default PlaywrightClient;