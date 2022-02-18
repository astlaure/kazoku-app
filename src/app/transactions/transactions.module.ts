import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionCalendarComponent } from './routes/transaction-calendar/transaction-calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AddTransactionModalComponent } from './components/add-transaction-modal/add-transaction-modal.component';
import { TransactionDetailsModalComponent } from './components/transaction-details-modal/transaction-details-modal.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
]);

@NgModule({
  declarations: [
    TransactionCalendarComponent,
    AddTransactionModalComponent,
    TransactionDetailsModalComponent,
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FullCalendarModule
  ],
  providers: [
    CurrencyPipe
  ]
})
export class TransactionsModule { }
