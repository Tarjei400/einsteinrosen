import { Inject, Injectable } from '@nestjs/common';
import * as httpProxy from 'http-proxy';
import * as http from 'http';
import { DomainMapperService } from './domain-mapper/domain-mapper.service';

const HTTP_PORT = 80;

@Injectable()
export class ProxyServer {

  @Inject()
  private readonly domainMapper: DomainMapperService;

  private proxy;
  private httpServer;

  constructor() {
    this.proxy = httpProxy.createProxyServer({});
    this.httpServer = http.createServer( this.onHttpListen.bind(this)).listen(HTTP_PORT);
  }

  onHttpListen(req, res)  {
    const url = req.headers.host;
    const port = this.domainMapper.getPort(url);
    if (port) {
      console.log(`Proxying http to http://localhost:${port}` );
      this.proxy.web(req, res, { target: `http://localhost:${port}` });
    }
  }
}
