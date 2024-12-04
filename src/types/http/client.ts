import { Serializable } from 'node:child_process';

interface HttpClient {
  post(
    url: string,
    payload?: Serializable,
    headers?: Record<string, string>,
  ): Promise<Serializable>;
}

export type { HttpClient };
