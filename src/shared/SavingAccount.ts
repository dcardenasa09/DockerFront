import { Client } from "./Client";

export interface SavingAccount {
    id: number;
    clientId: number;
    accountNumber: string;
    balance: number;
    openingDate: Date;
    isActive: boolean;
    client?: Client;
}