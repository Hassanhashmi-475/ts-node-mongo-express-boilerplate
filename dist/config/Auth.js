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
exports.isAdmin = exports.isAuth = exports.tokenForVerify = exports.signInToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = __importDefault(require("../models/Admin"));
const signInToken = (user) => {
    return jsonwebtoken_1.default.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address || '',
        phone: user.phone || '',
        image: user.image || '',
    }, process.env.JWT_SECRET || '', {
        expiresIn: '2d',
    });
};
exports.signInToken = signInToken;
const tokenForVerify = (user) => {
    return jsonwebtoken_1.default.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
    }, process.env.JWT_SECRET_FOR_VERIFY || '', { expiresIn: '15m' });
};
exports.tokenForVerify = tokenForVerify;
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    try {
        if (authorization) {
            const token = authorization.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
            req.user = {
                _id: decoded._id,
                name: decoded.name,
                email: decoded.email,
                address: decoded.address,
                phone: decoded.phone,
                image: decoded.image,
            };
            next();
        }
        else {
            throw new Error('Authorization header missing');
        }
    }
    catch (err) {
        res.status(401).send({
            message: err.message,
        });
    }
});
exports.isAuth = isAuth;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield Admin_1.default.findOne({ role: 'Admin' });
    if (admin) {
        next();
    }
    else {
        res.status(401).send({
            message: 'User is not Admin',
        });
    }
});
exports.isAdmin = isAdmin;
//# sourceMappingURL=Auth.js.map