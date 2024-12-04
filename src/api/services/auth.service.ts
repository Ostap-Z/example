import { step } from 'src/decorators/step';
import { LoginRequest, LoginResponse } from '../models/auth/login.model';
import BaseService from './base.service';
import { UserCreateResponse, UserCreateRequest } from '../models/auth/register.model';

class AuthService extends BaseService {
  @step()
  public async register(data: UserCreateRequest): Promise<UserCreateResponse> {
    return (await this.client.post(
      `${this.url}register`,
      data,
      this.defaultHeaders,
    )) as UserCreateResponse;
  }

  @step()
  public async login(data: LoginRequest): Promise<LoginResponse> {
    return (await this.client.post(
      `${this.url}login`, 
      data, 
      this.defaultHeaders
    )) as LoginResponse;
  }
}

export default AuthService;
