import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import fsPromises from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs'
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Cookies
export const logEvents = async (message, logFileName) => {
    const dateTime = format(Date.now(), 'yyyy-MM-dd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.promises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.promises.appendFile(
            path.join(__dirname, '..', 'logs', logFileName),
            logItem
        );
    } catch (e) {
        console.log("Error: ", e);
    }
};

export const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
    //console.log(`${req.method} ${req.path}`)
    next();
};
