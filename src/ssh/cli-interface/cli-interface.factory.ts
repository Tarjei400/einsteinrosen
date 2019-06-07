import { DomainMapperService } from '../domain-mapper/domain-mapper.service';
import * as React from 'react';
import { Counter } from './app';

export let DiProvider;
export interface Di {
  domainMapper: DomainMapperService;
}

export function CliInterfaceFactory(domainMapper: DomainMapperService) {
  DiProvider = React.createContext({
    domainMapper,
  });
  return React.createElement(Counter);
}
