import { Injectable } from '@nestjs/common';

@Injectable()
export class DomainMapperService {
    private readonly subdomains = {};

    public add(subdomain, port) {
      this.subdomains[subdomain] = port;
    }

    public remove(subdomain) {
       delete this.subdomains[subdomain];
    }

    public getPort(subdomain) {
      return this.subdomains[subdomain];
    }

    public get() {
      return this.subdomains;
    }
}
