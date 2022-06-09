"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbConfig_1 = require("./utils/dbConfig");
const app = express_1.default(); // for secure HTTP headers :)
app.use(helmet_1.default());
app.use(express_1.default.json({}));
app.use(express_1.default.urlencoded({ extended: true }));
app.disable('etag');
app.use(cors_1.default());
app.use(morgan_1.default('tiny'));
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => {
    res.send(`<h3 style='text-align:center;'>Culture Intelligence APIs Server :)</h3>`);
});
app.use('/static', express_1.default.static(__dirname + '/uploads/'));
app.use('*', (req, res) => {
    console.log('ROUTE NOT FOUND');
    res.status(404).send('ROUTE NOT FOUND');
});
app.listen(dbConfig_1.PORT, () => {
    console.info(`Server is online on port : ${dbConfig_1.PORT}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map