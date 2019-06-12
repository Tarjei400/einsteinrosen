"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const domain_mapper_service_1 = require("./domain-mapper/domain-mapper.service");
const tunnel_service_1 = require("./tunnel/tunnel.service");
const cli_interface_1 = require("./cli-interface/cli-interface");
const fs = require("fs");
const ssh2 = require("ssh2");
const AUTHENTICATION_EVENT = 'authentication';
const REQUEST_EVENT = 'request';
const READY_EVENT = 'ready';
const TCPIP_FORWARD_EVENT = 'tcpip-forward';
const SSH_PORT = 4444;
const LOCALHOST = '127.0.0.1';
const RSA_KEY_PATH = './keys/key_ssh_rsa';
let SSHServer = class SSHServer {
    constructor() {
        const sshConfig = {
            hostKeys: [
                { key: fs.readFileSync(RSA_KEY_PATH), passphrase: '' },
            ],
        };
        this.server = new ssh2.Server(sshConfig, this.bindEvents.bind(this));
        this.server.listen(SSH_PORT, LOCALHOST, () => console.log('Listening on port ' + this.server.address().port));
    }
    bindEvents(sshClient) {
        sshClient.on(AUTHENTICATION_EVENT, this.onAuthenticate.bind(this));
        sshClient.on(REQUEST_EVENT, this.onRequest.bind(this, sshClient));
        sshClient.on(READY_EVENT, this.onReady.bind(this, sshClient));
    }
    onAuthenticate(ctx) {
        console.log('Method', ctx.method);
        ctx.accept();
    }
    onRequest(sshClient, accept, reject, name, info) {
        if (TCPIP_FORWARD_EVENT === name) {
            this.tunnels.createTunnel(sshClient, accept, reject, name, info);
        }
    }
    onReady(client) {
        this.cliInterface.install(client);
    }
    close() {
        this.server.close();
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", domain_mapper_service_1.DomainMapperService)
], SSHServer.prototype, "domainMapper", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", tunnel_service_1.TunnelService)
], SSHServer.prototype, "tunnels", void 0);
__decorate([
    common_1.Inject(),
    __metadata("design:type", cli_interface_1.CliInterface)
], SSHServer.prototype, "cliInterface", void 0);
SSHServer = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], SSHServer);
exports.SSHServer = SSHServer;
//# sourceMappingURL=ssh.server.js.map