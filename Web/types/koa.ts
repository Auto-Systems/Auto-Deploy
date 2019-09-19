import { Cookie } from 'universal-cookie';

declare module 'koa' {
  interface BaseRequest {
    universalCookies: any;
  }
}
