"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTimestamp = void 0;
function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
}
exports.formatTimestamp = formatTimestamp;
//# sourceMappingURL=Timestamp.js.map