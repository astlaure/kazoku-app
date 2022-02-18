import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionCalendarComponent } from './routes/transaction-calendar/transaction-calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateTransactionComponent } from './routes/create-transaction/create-transaction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AddTransactionModalComponent } from './components/add-transaction-modal/add-transaction-modal.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
]);

@NgModule({
  declarations: [
    TransactionCalendarComponent,
    CreateTransactionComponent,
    AddTransactionModalComponent,
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FullCalendarModule
  ]
})
export class TransactionsModule { }
