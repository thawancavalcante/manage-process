import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const encode = (data: object) => {
    return jwt.sign(data, JWT_SECRET, { expiresIn: '1d' });
};

export const decode = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (e) {
        return false;
    }
};