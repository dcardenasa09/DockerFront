export interface Transaction {
    id: number;
    folio: string;
    savingAccountId: number;
    date: Date; 
    amount: number; 
    type: number; 
    status: number; 
    observations: string; 
    isActive: boolean;
}