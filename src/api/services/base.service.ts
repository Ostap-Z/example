import { HttpClient } from 'src/types/http/client';

abstract class BaseService {
  protected readonly defaultHeaders = {
    'Content-Type': 'application/json',
  };

  public constructor(
    public readonly url: string,
    protected readonly client: HttpClient,
  ) {
    this.url = url.endsWith('/') ? url : `${url}/`;
  }
}

export default BaseService;
