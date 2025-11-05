import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

export function withAuth(handler: NextApiHandler) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: 'Acceso no autorizado' });
        }

        return handler(req, res);
    };
}