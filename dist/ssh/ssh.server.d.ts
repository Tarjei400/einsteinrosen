export declare class SSHServer {
    private readonly domainMapper;
    private readonly tunnels;
    private readonly cliInterface;
    private readonly server;
    constructor();
    bindEvents(sshClient: any): void;
    onAuthenticate(ctx: any): void;
    onRequest(sshClient: any, accept: any, reject: any, name: any, info: any): void;
    onReady(client: any): void;
    close(): void;
}
