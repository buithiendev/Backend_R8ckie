"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = exports.fetchData = void 0;
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const token_kiotviet_model_1 = __importDefault(require("../models/token-kiotviet.model"));
const BASE_URL = 'https://public.kiotapi.com';
const api = axios_1.default.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // 'Retailer': 'testapi1706',
        // 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJuYmYiOjE2ODc1ODcwOTAsImV4cCI6MTY4NzY3MzQ5MCwiaXNzIjoiaHR0cDovL2lkLmtpb3R2aWV0LnZuIiwiY2xpZW50X2lkIjoiZTRhMzU3MjYtZjFlNi00MGQxLWJiZjgtNjNmNzI2ZDRiMGYxIiwiY2xpZW50X1JldGFpbGVyQ29kZSI6InRlc3RhcGkxNzA2IiwiY2xpZW50X1JldGFpbGVySWQiOiI1MDAyNDcyNjYiLCJjbGllbnRfVXNlcklkIjoiNTI4ODc2IiwiY2xpZW50X1NlbnNpdGl2ZUFwaSI6IkZhbHNlIiwiY2xpZW50X0dyb3VwSWQiOiIyIiwiaWF0IjoxNjg3NTg3MDkwLCJzY29wZSI6WyJQdWJsaWNBcGkuQWNjZXNzIl19.viAi5pmkBFaXjDpsSN266bJmhg-blTELV98svWGgLRXHBUOm7iB5-tJKtQONBRTFK9BUURfaZz7lqb0sk0O7yYRcy9Rdxqh6CwY3lXQumSrZecS-rVJN7nSuJACzYQoE9RqxLZQhLCe0ay9vzdovzMYR3srvi0tsagHqG1xNa1XVc-jKmOsg68QZHFXRRXvPt2_bUsyn5HN7rvqoD3N2tWjCOeYRjSX2Uu0Nlc6szUQEKG3ZjYqwt8nLNrMujm13-xQNbB6iX_6jgIbM_DMJuptL-N0HOKVI49AGReOdyTAFA5kviy9mnOrSoUQGZ_FGox9vODB6JsuGLUbRGnR7Hg'
    },
});
api.interceptors.response.use((response) => response, async (error) => {
    if (error.response && error.response.status === 401) {
        const newToken = await getToken();
        const originalRequestConfig = error.config;
        originalRequestConfig.headers.Authorization = `Bearer ${newToken.access_token}`;
        return api(originalRequestConfig);
    }
    return Promise.reject(error);
});
async function fetchData(path) {
    try {
        const token = await token_kiotviet_model_1.default.findOne({ id: 1 });
        const response = await api.get(path, {
            headers: {
                Retailer: token?.retailer,
                Authorization: `Bearer ${token?.token}`,
            },
        });
        return response.data;
    }
    catch (error) {
        return { status: 400, message: 'Failed', metadata: null };
    }
}
exports.fetchData = fetchData;
async function getToken() {
    const data = {
        scopes: 'PublicApi.Access',
        grant_type: 'client_credentials',
        client_id: '160f7db4-88f6-42fb-bca1-a5358c53039e',
        client_secret: 'FE060F956B3ADB87CCD69FE74F3DD072C105735B',
    };
    const response = await api.post('https://id.kiotviet.vn/connect/token', qs_1.default.stringify(data), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            grant_type: 'client_credentials',
            scopes: 'PublicApi.Access',
        },
    });
    if (response.status === 200) {
        await token_kiotviet_model_1.default.updateOne({
            id: 1,
        }, {
            token: response.data.access_token,
            expires: response.data.expires,
        }, {
            new: true,
            upsert: true,
        });
    }
    return response.data;
}
exports.getToken = getToken;
//# sourceMappingURL=api.js.map