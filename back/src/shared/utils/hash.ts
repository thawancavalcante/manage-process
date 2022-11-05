import * as bcrypt from 'bcrypt';

export const generateHash = (value: string): string => {
    const salt = bcrypt.genSaltSync(Math.floor(Math.random() * 10) + 1);
    return bcrypt.hashSync(value, salt);
};

export const verifyHash = (value: string, hash: string): boolean => {
    return bcrypt.compareSync(value, hash);
};