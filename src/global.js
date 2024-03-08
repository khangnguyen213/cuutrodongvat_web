export class Global {
  static API_URL = import.meta.env.VITE_API_URL;
  static secret = import.meta.env.VITE_JWT_KEY;
  static CLIENT_URL = import.meta.env.VITE_CLIENT_URL;
}
