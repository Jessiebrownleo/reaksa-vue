import type {UserResponse} from "./user.ts";
export interface AccountRequest {
    accountNumber: string;
    accountName: string;
    accountBalance: number;
    accountType: string;
    userId: string;
}

export interface AccountResponse {
    id: string;
    accountNumber: string;
    accountName: string;
    accountBalance: number;
    user: UserResponse;
    accountType: string;
}