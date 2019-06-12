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
const net = require("net");
const domain_mapper_service_1 = require("../domain-mapper/domain-mapper.service");
const LISTENING_EVENT = 'listening';
const END_EVENT = 'end';
let TunnelService = class TunnelService {
    createTunnel(sshClient, accept, reject, name, info) {
        const tunnel = net.createServer(this.onTunnelCreate.bind(this, sshClient, info)).listen();
        tunnel.on(LISTENING_EVENT, this.onTunnelListening.bind(this, tunnel, accept, reject, info));
        sshClient.on(END_EVENT, this.onSSHClientDisconnect.bind(this, info, tunnel));
    }
    onSSHClientDisconnect(sshClient, info, tunnel) {
        const { bindAddr } = info;
        this.domainMapper.remove(bindAddr);
        tunnel.close();
    }
    onTunnelCreate(sshClient, info, tunnel) {
        tunnel.setEncoding('utf8');
        sshClient.forwardOut(info.bindAddr, info.bindPort, tunnel.remoteAddress, tunnel.remotePort, (err, upstream) => {
            if (err) {
                tunnel.end();
                return console.error('not working: ' + err);
            }
            upstream.pipe(tunnel).pipe(upstream);
        });
    }
    onTunnelListening(tunnel, accept, reject, info) {
        const { bindAddr } = info;
        const port = tunnel.address().port;
        this.domainMapper.add(bindAddr, port);
        accept(port);
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", domain_mapper_service_1.DomainMapperService)
], TunnelService.prototype, "domainMapper", void 0);
TunnelService = __decorate([
    common_1.Injectable()
], TunnelService);
exports.TunnelService = TunnelService;
//# sourceMappingURL=tunnel.service.js.map