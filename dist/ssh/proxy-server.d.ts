export declare class ProxyServer {
    private readonly domainMapper;
    private proxy;
    private httpServer;
    constructor();
    onHttpListen(req: any, res: any): void;
}
