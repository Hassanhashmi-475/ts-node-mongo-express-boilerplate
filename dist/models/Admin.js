"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
var AdminRole;
(function (AdminRole) {
    AdminRole["Admin"] = "Admin";
})(AdminRole || (AdminRole = {}));
const adminSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
        default: bcryptjs_1.default.hashSync('12345678', 10),
    },
    role: {
        type: String,
        required: false,
        default: AdminRole.Admin,
        enum: Object.values(AdminRole),
    },
    joiningDate: {
        type: Date,
        required: false,
    },
}, {
    timestamps: true,
});
const Admin = mongoose_1.default.model('Admin', adminSchema);
exports.default = Admin;
//# sourceMappingURL=Admin.js.map