"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBanks = exports.getCurrencies = exports.getLanguages = exports.getCountries = void 0;
const lookup_service_1 = __importDefault(require("./lookup.service"));
const sendResponse_1 = require("../../utils/sendResponse");
const getCountries = (req, res) => {
    const { search } = req.query;
    const data = lookup_service_1.default.searchCountries(search);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Countries fetched successfully",
        data,
    });
};
exports.getCountries = getCountries;
const getLanguages = (req, res) => {
    const { search } = req.query;
    const data = lookup_service_1.default.searchLanguages(search);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Languages fetched successfully",
        data,
    });
};
exports.getLanguages = getLanguages;
const getCurrencies = (req, res) => {
    const { search } = req.query;
    const data = lookup_service_1.default.searchCurrencies(search);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Currencies fetched successfully",
        data,
    });
};
exports.getCurrencies = getCurrencies;
const getBanks = (req, res) => {
    const { country, search } = req.query;
    const data = lookup_service_1.default.searchBanks(country, search);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Banks fetched successfully",
        data,
    });
};
exports.getBanks = getBanks;
