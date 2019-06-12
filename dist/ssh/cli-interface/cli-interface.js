"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const ink_1 = require("ink");
const EXEC_EVENT = 'exec';
const PTY_EVENT = 'pty';
const WINDOW_CHANGE_EVENT = 'window-change';
const SHELL_EVENT = 'shell';
const ERROR_EVENT = 'error';
const SESSION_EVENT = 'session';
const noop = () => { return; };
let CliInterface = class CliInterface {
    onExecuteCommand(accept, reject, info) {
        console.log('Client wants to execute: ' + info.command);
        const stream = accept();
        stream.stderr.write('Oh no, the dreaded errors!\n');
        stream.write('Just kidding about the errors!\n');
        stream.exit(0);
        stream.end();
    }
    onPTY(windowSize, accept, reject, info) {
        const { rows, cols } = info;
        accept();
        windowSize.rows = rows;
        windowSize.cols = cols;
        console.log('Pty requested', JSON.stringify(info));
    }
    onWindowChange(accept, reject, info) {
        console.log('Window-change');
        accept();
    }
    onShell(windowSize, accept, reject, info) {
        const stream = accept();
        console.log('Shell', JSON.stringify(windowSize));
        stream.name = 'asd';
        stream.isTTY = true;
        stream.setRawMode = noop;
        stream.on('error', (e) => console.error('Stream error: ', e));
        stream.rows = windowSize.rows;
        stream.columns = windowSize.cols;
        console.log(this.ui);
        ink_1.render(this.ui, { stdout: stream, stdin: stream, exitOnCtrlC: true });
    }
    bindSessionEvents(accept, reject) {
        const windowSize = {};
        const session = accept();
        session.once(EXEC_EVENT, this.onExecuteCommand.bind(this));
        session.once(PTY_EVENT, this.onPTY.bind(this, windowSize));
        session.on(WINDOW_CHANGE_EVENT, this.onWindowChange.bind(this));
        session.on(SHELL_EVENT, this.onShell.bind(this, windowSize));
        session.on(ERROR_EVENT, (e) => console.log('error', e));
    }
    install(client) {
        client.on(SESSION_EVENT, this.bindSessionEvents.bind(this));
    }
};
__decorate([
    common_1.Inject('UI'),
    __metadata("design:type", Object)
], CliInterface.prototype, "ui", void 0);
CliInterface = __decorate([
    common_1.Injectable()
], CliInterface);
exports.CliInterface = CliInterface;
//# sourceMappingURL=cli-interface.js.map