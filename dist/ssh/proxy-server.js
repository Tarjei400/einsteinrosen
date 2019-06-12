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
const httpProxy = require("http-proxy");
const http = require("http");
const domain_mapper_service_1 = require("./domain-mapper/domain-mapper.service");
const HTTP_PORT = 80;
let ProxyServer = class ProxyServer {
    constructor() {
        this.proxy = httpProxy.createProxyServer({});
        this.httpServer = http.createServer(this.onHttpListen.bind(this)).listen(HTTP_PORT);
    }
    onHttpListen(req, res) {
        const url = req.headers.host;
        const port = this.domainMapper.getPort(url);
        if (port) {
            console.log(`Proxying http to http://localhost:${port}`);
            this.proxy.web(req, res, { target: `http://localhost:${port}` });
        }
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", domain_mapper_service_1.DomainMapperService)
], ProxyServer.prototype, "domainMapper", void 0);
ProxyServer = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ProxyServer);
exports.ProxyServer = ProxyServer;
//# sourceMappingURL=proxy-server.js.map