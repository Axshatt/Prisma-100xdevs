"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../prisma/prisma");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const client = new prisma_1.PrismaClient();
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield client.user.findMany();
    res.json({
        users
    });
}));
app.get("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // just making the typescript happy here
    const id = req.params.id;
    const users = yield client.user.findFirst({
        where: {
            id: parseInt(id)
        },
        select: {
            todos: true,
            username: true,
            password: true,
        }
    });
    res.json({
        users
    });
}));
function createUser() {
    return __awaiter(this, void 0, void 0, function* () {
        // create
        client.user.create({
            data: {
                username: "Harkirat",
                password: "123123",
                age: 21,
                city: "Delhi"
            }
        });
    });
}
function updateUser() {
    return __awaiter(this, void 0, void 0, function* () {
        //update
        client.user.update({
            where: {
                id: 1,
            },
            data: {
                username: "Harkirat",
            }
        });
    });
}
function FindUser() {
    return __awaiter(this, void 0, void 0, function* () {
        // reading data ot user/users
        const response = yield client.user.findFirst({
            where: {
                id: 1,
            },
            include: {
                todos: true
            }
        });
        console.log(response === null || response === void 0 ? void 0 : response.password);
    });
}
// createUser()
app.listen(3000);
