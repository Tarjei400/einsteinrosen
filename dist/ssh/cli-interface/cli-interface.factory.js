"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const app_1 = require("./app");
function CliInterfaceFactory(domainMapper) {
    exports.DiProvider = React.createContext({
        domainMapper,
    });
    return React.createElement(app_1.Counter);
}
exports.CliInterfaceFactory = CliInterfaceFactory;
//# sourceMappingURL=cli-interface.factory.js.map