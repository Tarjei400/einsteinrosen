import { Inject, Injectable } from '@nestjs/common';
import { DomainMapperService } from './domain-mapper/domain-mapper.service';
import { TunnelService } from './tunnel/tunnel.service';
import { CliInterface } from './cli-interface/cli-interface';

import * as fs from 'fs';
import * as ssh2 from 'ssh2';

const AUTHENTICATION_EVENT = 'authentication';
const REQUEST_EVENT 	   = 'request';
const READY_EVENT 		   = 'ready';
const TCPIP_FORWARD_EVENT  = 'tcpip-forward';

const SSH_PORT 			   = 4444;
const LOCALHOST			   = '127.0.0.1';

const RSA_KEY_PATH     = './keys/key_ssh_rsa';

@Injectable()
export class SSHServer {

  @Inject()
  private readonly domainMapper: DomainMapperService;

  @Inject()
  private readonly tunnels: TunnelService;

  @Inject()
  private readonly cliInterface: CliInterface;

  private readonly server;

  constructor() {
    const sshConfig = {
      hostKeys: [
        { key: fs.readFileSync(RSA_KEY_PATH), passphrase: ''},
      ],
    };

    this.server = new ssh2.Server(sshConfig, this.bindEvents.bind(this));
    this.server.listen(SSH_PORT, LOCALHOST, () => console.log('Listening on port ' + this.server.address().port) );

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
}
