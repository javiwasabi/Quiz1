import { Request, Response, NextFunction } from 'express';
import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

export const logEvents = async (message: string, logFileName: string): Promise<void> => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem);
    } catch (err) {
        console.log(err);
    }
};

export const logger = (req: Request, res: Response, next: NextFunction): void => {
    // Usamos `req.headers.origin` con un fallback por si no existe
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin || 'No origin'}`, 'reqLog.log');
    
    // Extraemos solo el path si la URL tiene parámetros de consulta
    const path = req.url.split('?')[0];
    console.log(`${req.method} ${path}`);
    
    next();
};
