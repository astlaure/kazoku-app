import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Observable } from 'rxjs';
import { Transaction } from '../../models/transaction.model';
import { CalendarOptions, DatesSetArg, EventClickArg } from '@fullcalendar/angular';
import { DateTime } from 'luxon';


@Component({
  selector: 'app-transaction-calendar',
  templateUrl: './transaction-calendar.component.html',
  styleUrls: ['./transaction-calendar.component.scss']
})
export class TransactionCalendarComponent implements OnInit {
  // transactions$ = new Observable<Transaction[]>();
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',

    // trigger on click date
    navLinks: true,
    navLinkDayClick: this.handleDateClick.bind(this),

    // trigger on prev / next
    datesSet: this.handleDatesSetClick.bind(this),

    // trigger on event click
    eventClick: this.handleEventClick.bind(this),
    events: [],
  };

  createModal = false;
  totalAmount = 0;
  selectedDate = new Date();
  queryParams = { startDate: 'string', endDate: 'string' };

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void { }

  toggleCreateModal(date?: Date) {
    this.selectedDate = date ?? new Date();
    this.createModal = !this.createModal;
  }

  closeEvent() {
    this.loadTransactions();
    this.toggleCreateModal();
  }

  handleDateClick(args: Date) {
    this.toggleCreateModal(args);
  }

  handleEventClick(args: EventClickArg) {
    console.log('clicked', args);
  }

  handleDatesSetClick(args: DatesSetArg) {
    const { start, end } = args;
    this.queryParams.startDate = DateTime.fromJSDate(start).toISODate();
    this.queryParams.endDate = DateTime.fromJSDate(end).toISODate();
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions(this.queryParams).subscribe({
      next: (values) => {
        let total = 0;
        this.calendarOptions.events = values.map((value) => {
          total += value.total;
          return { title: `${value.description} - ${value.total / 100}$`, date: value.transactionDate };
        });
        this.totalAmount = total / 100;
      },
      error: () => {
        // show message
      },
    });
  }
}
