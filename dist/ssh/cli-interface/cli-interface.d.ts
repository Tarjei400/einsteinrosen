export declare class CliInterface {
    private readonly ui;
    private onExecuteCommand;
    private onPTY;
    private onWindowChange;
    private onShell;
    bindSessionEvents(accept: any, reject: any): void;
    install(client: any): void;
}
