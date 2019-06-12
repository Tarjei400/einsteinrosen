export declare class TunnelService {
    private readonly domainMapper;
    createTunnel(sshClient: any, accept: any, reject: any, name: any, info: any): void;
    private onSSHClientDisconnect;
    private onTunnelCreate;
    private onTunnelListening;
}
