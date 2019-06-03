import * as React from 'react';
import { Fragment, useContext } from 'react';
import { Color, Box } from 'ink';
import { DomainMapperService } from '../domain-mapper/domain-mapper.service';
import { Di, DiProvider } from './cli-interface.factory';

export const Counter = () => {
  const { domainMapper }: Di = useContext(DiProvider);

  return (
    <Box flexDirection="row">
      <Color green> Connected domains: </Color>
      {
        Object.keys(domainMapper.get()).map((d) => (<Box><Color red>{d}</Color></Box>))
      }
    </Box>
  );
};
