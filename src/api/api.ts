import AuthService from './services/auth.service';
import { HttpClient } from 'src/types/http/client';

class API {
  constructor(protected readonly client: HttpClient) {}

  public readonly authService = new AuthService(
    'https://shopdemo-alex-hot.koyeb.app/api/auth',
    this.client,
  );
}

export default API;
