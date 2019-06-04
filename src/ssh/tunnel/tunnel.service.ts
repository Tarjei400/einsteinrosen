import { Inject, Injectable } from '@nestjs/common';
import * as net from 'net';
import { DomainMapperService } from '../domain-mapper/domain-mapper.service';

const LISTENING_EVENT = 'listening';
const END_EVENT  		  = 'end';

@Injectable()
export class TunnelService {

  @Inject()
  private readonly domainMapper: DomainMapperService;

  createTunnel(sshClient, accept, reject, name, info) {
    const tunnel = net.createServer(this.onTunnelCreate.bind(this, sshClient, info)).listen();
    tunnel.on(LISTENING_EVENT, this.onTunnelListening.bind(this, tunnel, accept, reject, info));
    sshClient.on(END_EVENT, this.onSSHClientDisconnect.bind(this, info, tunnel));

  }

  private onSSHClientDisconnect(sshClient, info, tunnel) {
    const { bindAddr } = info;
    this.domainMapper.remove(bindAddr);
    tunnel.close();
  }

  private onTunnelCreate(sshClient, info, tunnel) {

    tunnel.setEncoding('utf8');
    sshClient.forwardOut(
      info.bindAddr, info.bindPort,
      tunnel.remoteAddress, tunnel.remotePort,
      (err, upstream) => {
        if (err) {
          tunnel.end();
          return console.error('not working: ' + err);
        }
        upstream.pipe(tunnel).pipe(upstream);
      });
  }

  private onTunnelListening(tunnel, accept, reject, info) {
    const { bindAddr } = info;
    const port = tunnel.address().port;
    this.domainMapper.add(bindAddr, port);
    accept(port);
  }
}
