"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../src/app/config/db"));
const destination_1 = require("./destination");
async function main() {
    for (const destination of destination_1.destinations) {
        await db_1.default.destination.create({
            data: destination,
        });
    }
    console.log("Destinations seeded successfully");
}
main()
    .catch(console.error)
    .finally(() => db_1.default.$disconnect());
