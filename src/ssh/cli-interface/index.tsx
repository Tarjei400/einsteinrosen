import * as React from 'react';
import { Fragment, useContext, useEffect } from 'react';
import { Color, StdinContext } from 'ink';
import * as Box from 'ink-box';

import { Di, DiProvider } from './cli-interface.factory';

export const Counter = () => {
  const { domainMapper }: Di = useContext(DiProvider);
  const { stdin, setRawMode } = useContext(StdinContext);
  console.log('Box', Box);
  const logger = (data) => {
    console.log('Key data:', data.toString());
  };

  useEffect(() => {
    stdin.on('data', logger );
    return () => {
      stdin.off('data', logger);
    };
  }, [stdin]);

  return (
    <Box borderStyle='round' borderColor='cyan'>
      <Box>
        <Color green> Connected domains: </Color>
      </Box>
      <Box alignItems='flex-start' flexGrow={1} flexDirection='column'>
      {
        Object.keys(domainMapper.get()).map((d) => (<Color red>{d} </Color>))
      }
      </Box>
    </Box>
  );
};
