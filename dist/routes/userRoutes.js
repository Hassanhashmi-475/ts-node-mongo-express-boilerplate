"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserService_1 = require("../controllers/UserService");
const userRouter = (0, express_1.Router)();
userRouter.post('/register', UserService_1.registerUser);
userRouter.post('/login', UserService_1.loginUser);
userRouter.get('/', UserService_1.allUsers);
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map