import { DomainMapperService } from '../domain-mapper/domain-mapper.service';
import * as React from 'react';
export declare let DiProvider: any;
export interface Di {
    domainMapper: DomainMapperService;
}
export declare function CliInterfaceFactory(domainMapper: DomainMapperService): React.FunctionComponentElement<{}>;
