import jwt from 'jsonwebtoken';

export type Rol = 'USER' | 'MOZO' | 'ADMIN';

export interface JwtPayload {
  id: string;
  username: string;
  rol: Rol;
  iat?: number;
  exp?: number;
}

const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY as string;


export class jwtHandler {
  static async generateAccessToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): Promise<string> {
    return jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: "30m"});
  };

  static verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET_KEY) as unknown as JwtPayload;
  };

  static decodeToken(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch {
      return null;
    }
  };
}


