"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const ink_1 = require("ink");
const Box = require("ink-box");
const cli_interface_factory_1 = require("./cli-interface.factory");
exports.Counter = () => {
    const { domainMapper } = react_1.useContext(cli_interface_factory_1.DiProvider);
    const { stdin, setRawMode } = react_1.useContext(ink_1.StdinContext);
    console.log('Box', Box);
    const logger = (data) => {
        console.log('Key data:', data.toString());
    };
    react_1.useEffect(() => {
        stdin.on('data', logger);
        return () => {
            stdin.off('data', logger);
        };
    }, [stdin]);
    return (React.createElement(Box, { borderStyle: 'round', borderColor: 'cyan' },
        React.createElement(Box, null,
            React.createElement(ink_1.Color, { green: true }, " Connected domains: ")),
        React.createElement(Box, { alignItems: 'flex-start', flexGrow: 1, flexDirection: 'column' }, Object.keys(domainMapper.get()).map((d) => (React.createElement(ink_1.Color, { red: true },
            d,
            " "))))));
};
//# sourceMappingURL=app.js.map