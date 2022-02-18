import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TransactionCategory } from '../../enums/transaction-category.enum';
import { FormBuilder, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { CreateTransaction } from '../../models/create-transaction.model';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-add-transaction-modal',
  templateUrl: './add-transaction-modal.component.html',
  styleUrls: ['./add-transaction-modal.component.scss']
})
export class AddTransactionModalComponent implements OnInit, OnChanges {
  @Input() selectedDate = new Date();
  @Output() closeEvent = new EventEmitter();

  categories = Object.values(TransactionCategory);
  createTransactionForm = this.formBuilder.group({
    description: ['', [Validators.required]],
    category: ['', [Validators.required]],
    transactionDate: [DateTime.fromJSDate(this.selectedDate).toISODate(), [Validators.required]],
    total: [0.00, [Validators.required, Validators.min(0)]],
  });

  constructor(private formBuilder: FormBuilder,
              private transactionService: TransactionService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDate'].currentValue !== changes['selectedDate'].previousValue) {
      this.createTransactionForm.get('transactionDate')?.setValue(DateTime.fromJSDate(this.selectedDate).toISODate());
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const createTransaction: CreateTransaction = { ...this.createTransactionForm.value };
    createTransaction.total = createTransaction.total * 100;
    this.transactionService.createTransaction(createTransaction)
      .subscribe({
        next: (value) => {
          // go back
          this.closeEvent.emit();
        },
        error: (err) => {},
      });
  }
}
