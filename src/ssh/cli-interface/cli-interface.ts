import { Inject, Injectable } from '@nestjs/common';
import { render } from 'ink';
import { createWriteStream } from 'fs';

const EXEC_EVENT = 'exec';
const PTY_EVENT  = 'pty';
const WINDOW_CHANGE_EVENT = 'window-change';
const SHELL_EVENT = 'shell';
const ERROR_EVENT = 'error';
const SESSION_EVENT = 'session';

const noop = () => { return; };

@Injectable()
export class CliInterface {

  @Inject('UI')
  private readonly ui: any;

  private onExecuteCommand(accept, reject, info) {
    console.log('Client wants to execute: ' + info.command);
    if(accept){
      const stream = accept();
      stream.stderr.write('Oh no, the dreaded errors!\n');
      stream.write('Just kidding about the errors!\n');
      stream.exit(0);
      stream.end();
    }
  }

  private onPTY(windowSize, accept, reject, info) {
    const { rows, cols, term, modes } = info;
    accept();
    windowSize.rows = rows;
    windowSize.cols = cols;
    windowSize.term = term;
    windowSize.modes = modes;

    console.log('Pty requested', JSON.stringify(info));
  }
  private onWindowChange(accept, reject, info) {
    console.log('Window-change');
   // accept();
  }

  private onShell(windowSize, accept, reject, info) {
    const stream = accept();

    stream.write('FirstLine1\n');
    stream.write('SecondLine1\n');
    stream.name = 'asd';
    stream.setRawMode = noop;
    stream.on('error', (e) => console.error('Stream error: ', e) );
    render(this.ui, { stdout: stream, stdin: stream, exitOnCtrlC: true});

  }
  public bindSessionEvents(accept, reject) {
    const windowSize = {};
    const session = accept();
    session.once(EXEC_EVENT, this.onExecuteCommand.bind(this));
    session.once(PTY_EVENT, this.onPTY.bind(this, windowSize));
    session.on(WINDOW_CHANGE_EVENT, this.onWindowChange.bind(this));
    session.on(SHELL_EVENT, this.onShell.bind(this, windowSize));
    session.on(ERROR_EVENT, (e) => console.log ('error', e) );
  }

  public install(client) {
    client.on(SESSION_EVENT, this.bindSessionEvents.bind(this));
  }
}
