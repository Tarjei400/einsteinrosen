import { Inject, Injectable } from '@nestjs/common';
import { DomainMapperService } from './domain-mapper/domain-mapper.service';
import { TunnelService } from './tunnel/tunnel.service';
import * as fs from 'fs';

const inspect = require('util').inspect;
const ssh2 = require('ssh2');
const noop = () => {};

const AUTHENTICATION_EVENT = 'authentication';
const REQUEST_EVENT 	   = 'request';
const READY_EVENT 		   = 'ready';
const TCPIP_FORWARD_EVENT  = 'tcpip-forward';

const SSH_PORT 			   = 4444;
const LOCALHOST			   = '127.0.0.1';

const RSA_KEY_PATH     = './keys/key_ssh_rsa';
import { Counter } from './cli-interface';
import { render } from 'ink';
import * as React from 'react';

@Injectable()
export class SSHServer {

  @Inject()
  private readonly domainMapper: DomainMapperService;

  @Inject()
  private readonly tunnels: TunnelService;

  @Inject("UI")
  private readonly ui: any;

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
    console.log("Method", ctx.method);
    ctx.accept();
  }

  onRequest(sshClient, accept, reject, name, info) {
    if (TCPIP_FORWARD_EVENT === name) {
      this.tunnels.createTunnel(sshClient, accept, reject, name, info);
    }
  }

  onReady(client) {
    console.log('Client authenticated!');

    client.on('session', (accept, reject) => {
      var session = accept();
      session.once('exec', (accept, reject, info) => {
        console.log('Client wants to execute: ' + inspect(info.command));
        var stream = accept();
        stream.stderr.write('Oh no, the dreaded errors!\n');
        stream.write('Just kidding about the errors!\n');
        stream.exit(0);
        stream.end();
      });
      let rows;
      let cols;
      let term;

      session.once('pty', (accept, reject, info) => {
        console.log('Pty requested');
        rows = info.rows;
        cols = info.cols;
        term = info.term;
        console.log("Terminal: ", term)
        accept && accept();
        accept();
      }).on('window-change', (accept, reject, info) => {
        rows = info.rows;
        cols = info.cols;
        // if (stream) {
        // 	stream.rows = rows;
        // 	stream.columns = cols;
        // 	stream.emit('resize');
        // }
        console.log("Window-change")
        accept && accept();
      })
      session.on('shell', (accept, reject, info) => {
        const stream = accept()
        stream.name = "asd";
        stream.isTTY = true;
        stream.setRawMode = noop;
        stream.on('error', noop);

        console.log(this.ui)
        render(this.ui, { stdout: stream});

      })
      session.on ('error', (e) => console.log ('error', e));
    });
  }
}

