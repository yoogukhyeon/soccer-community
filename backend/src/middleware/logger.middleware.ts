import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    private logger = new Logger('HTTP');

    use(req: Request, res: Response, next: NextFunction): void{
        const { ip, method, originalUrl } = req;
        const userAgent = req.get('user-agent') || '';

        console.log({
            ip: ip,
            url : req.url,
            method : req.method,
            body: req.body,
        })
        res.on('finish', () => { 
            const { statusCode } = res;
            const contentLength = res.get('content-length');
            this.logger.log(
                `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
            );
        });
        next();
    }
}