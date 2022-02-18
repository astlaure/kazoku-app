import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { CreateTransaction } from '../../models/create-transaction.model';
import { TransactionCategory } from '../../enums/transaction-category.enum';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {
  categories = Object.values(TransactionCategory);
  createTransactionForm = this.formBuilder.group({
    description: ['', [Validators.required]],
    category: ['', [Validators.required]],
    transactionDate: ['', [Validators.required]],
    total: [0.00, [Validators.required, Validators.min(0)]],
  });

  constructor(private formBuilder: FormBuilder, private transactionService: TransactionService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const createTransaction: CreateTransaction = { ...this.createTransactionForm.value };
    createTransaction.total = createTransaction.total * 100;
    this.transactionService.createTransaction(createTransaction)
      .subscribe({
        next: (value) => {
          // go back
        },
        error: (err) => {},
      });
  }
}
