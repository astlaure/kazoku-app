import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateTransaction } from '../models/create-transaction.model';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient: HttpClient) { }

  getTransactions(params: { startDate: string, endDate: string }) {
    const httpParams = new HttpParams({
      fromObject: params,
    });
    const opts = { params: httpParams };
    return this.httpClient.get<Transaction[]>('api/transactions', opts);
  }

  createTransaction(createTransaction: CreateTransaction) {
    return this.httpClient.post('api/transactions', createTransaction);
  }
}
