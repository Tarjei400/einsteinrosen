"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const ssh_server_1 = require("./ssh.server");
const domain_mapper_service_1 = require("./domain-mapper/domain-mapper.service");
const tunnel_service_1 = require("./tunnel/tunnel.service");
const cli_interface_factory_1 = require("./cli-interface/cli-interface.factory");
const cli_interface_1 = require("./cli-interface/cli-interface");
let SshModule = class SshModule {
};
SshModule = __decorate([
    common_1.Module({
        providers: [
            ssh_server_1.SSHServer,
            domain_mapper_service_1.DomainMapperService,
            tunnel_service_1.TunnelService,
            cli_interface_1.CliInterface,
            {
                useFactory: cli_interface_factory_1.CliInterfaceFactory,
                provide: 'UI',
                inject: [domain_mapper_service_1.DomainMapperService],
            },
        ],
        exports: [domain_mapper_service_1.DomainMapperService],
    })
], SshModule);
exports.SshModule = SshModule;
//# sourceMappingURL=ssh.module.js.map