import { Component, OnInit } from '@angular/core';
import { ReservationDto } from '../../dto/ReadReservationDto';
import { ReservationService } from '../reservation.service';
import { BookService } from '../book.service';
import { ReservationComponent } from '../reservation/reservation.component';
import { CommonModule } from '@angular/common';
import { LoanDto } from '../../dto/ReadLoanDto';
import { LoanService } from '../loan.service';
import { LoanComponent } from '../loan/loan.component';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [ReservationComponent, LoanComponent, CommonModule],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.scss'
})
export class ReservationListComponent implements OnInit {

  reservations = new Array<ReservationDto>();
  loans = new Array<LoanDto>();

  constructor(private reservationService: ReservationService, private bookService: BookService, private loanService: LoanService) { }

  ngOnInit(): void {
    this.loadReservations();
    this.loadLoans();
  }

  loadReservations() {
    this.reservationService.getReservations().subscribe((response) => {
      this.reservations = response.data;
    })
  }

  loadLoans() {
    this.loanService.getUserLoans().subscribe(resp => {
      this.loans = resp.data;
    })
  }

}
