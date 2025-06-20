import { Request, Response, NextFunction } from 'express';
import { jwtHandler } from './jwtHandler';

export type Rol = 'USER' | 'MOZO' | 'ADMIN';

interface JwtPayload {
    id: string;
    username: string;
    rol: Rol;
    iat: number;
    exp: number;
}

declare global {
  namespace Express {
        interface Request {
            user: {
                id: string;
                username: string;
                rol: Rol;  
            };
        }
    }
}

// factory 
export const authMiddleware = (roles: Rol[] = []) => { // roles: ["USER", "ADMIN", "MOZO"]
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('Authorization');

        if (!token) {
            res.status(401).json({ error: 'Acceso denegado. Token no proporcionado' });
            return;
        }

        try {
            const decoded_token = jwtHandler.verifyAccessToken(token) as unknown as JwtPayload;
            req.user = {
                id: decoded_token.id,
                username: decoded_token.username,
                rol: decoded_token.rol,
            };

            
            if (roles.length > 0 && !roles.includes(decoded_token.rol)) {
                res.status(403).json({ok:false, error: 'Acceso prohibido. Permisos insuficientes' });
                return; 
            }

            next();
        } catch (error) {
            res.status(400).json({ok:false,  error: 'Token inválido' });
            return;
        }
    };
};


export const userMiddleware = authMiddleware(['USER']);
export const adminMiddleware = authMiddleware(['ADMIN']);
export const mozoMiddleware = authMiddleware(['MOZO']);
export const adminOrMozoMiddleware = authMiddleware(['ADMIN', 'MOZO']);