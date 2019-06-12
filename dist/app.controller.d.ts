import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private readonly domainMapper;
    constructor(appService: AppService);
    getHello(): any;
}
