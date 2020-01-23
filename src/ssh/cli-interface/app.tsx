import * as React from 'react';
import { Fragment, useContext, useEffect } from 'react';
import { Color, StdinContext, Box } from 'ink';

import { Di, DiProvider } from './cli-interface.factory';

export const Counter = () => {
  const { domainMapper }: Di = useContext(DiProvider);
  const { stdin, setRawMode } = useContext(StdinContext);
  const logger = (data) => {
    console.log('Key data:', JSON.stringify(data));
  };

  useEffect(() => {
    stdin.on('data', logger );
    return () => {
      stdin.off('data', logger);
    };
  }, [stdin]);

  return (
    <Box flexDirection='column'>
      <Box><Color green> Connected domains: </Color></Box>
      { Object.keys(domainMapper.get()).map((d, i) => (<Box key={`box-${i}`}><Color red>{d}</Color></Box>)) }
    </Box>
  );
};
