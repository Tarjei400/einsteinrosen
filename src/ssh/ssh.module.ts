import { Module } from '@nestjs/common';
import { SSHServer } from './ssh.server';
import { DomainMapperService } from './domain-mapper/domain-mapper.service';
import { TunnelService } from './tunnel/tunnel.service';
import { Counter } from './cli-interface/app';
import * as React from 'react';
import { CliInterfaceFactory } from './cli-interface/cli-interface.factory';
import { CliInterface } from './cli-interface/cli-interface';
import { ProxyServer } from './proxy-server';

@Module({
  providers: [
    SSHServer,
    ProxyServer,
    DomainMapperService,
    TunnelService,
    CliInterface,
    {
      useFactory: CliInterfaceFactory,
      provide: 'UI',
      inject: [DomainMapperService],
    },

  ],
  exports: [DomainMapperService],
})
export class SshModule {}
