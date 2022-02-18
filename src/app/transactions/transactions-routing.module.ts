import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionCalendarComponent } from './routes/transaction-calendar/transaction-calendar.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateTransactionComponent } from './routes/create-transaction/create-transaction.component';

const routes: Routes = [
  { path: 'transactions', component: TransactionCalendarComponent, canActivate: [AuthGuard] },
  { path: 'transactions/create', component: CreateTransactionComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
