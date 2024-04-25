import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReadUserDto } from '../../dto/ReadUserDto';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { LoanService } from '../loan.service';
import { ReservationService } from '../reservation.service';
import { LoanComponent } from '../loan/loan.component';
import { LoanDto } from '../../dto/ReadLoanDto';
import { ReservationDto } from '../../dto/ReadReservationDto';
import { ReservationComponent } from '../reservation/reservation.component';
import { LoanListComponent } from '../loan-list/loan-list.component';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, LoanComponent, ReservationComponent, LoanListComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  @Input() user: ReadUserDto | null = null;
  userId: number | 0 = 0;
  role: string | null = null;
  loans = new Array<LoanDto>();
  reservations = new Array<ReservationDto>();

  // Get the user by reading the param from the url
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private loanService: LoanService,
    private reservationService: ReservationService,
    private dataSharingService: DataSharingService,
  ) {
    this.userId = this.activatedRoute.snapshot.params['id'];

    this.getUser(this.userId);
    this.getReservations(this.userId);
    this.getLoans(this.userId);

    // Get the role of the current user
    this.dataSharingService.userChangeObservable.subscribe(() => {
      this.role = localStorage.getItem('WT_ROLE');
    })
  }

  getUser(id: number) {
    this.userService.getUser(id).subscribe(resp => {
      this.user = resp.data;
    })
  }

  // Create endpoint to get user loans by id
  getLoans(id: number) {
    this.loanService.getLoansByUserId(id).subscribe(resp => {
      this.loans = resp.data;
    })
  }

  // Create endpoint to get user reservations by id
  getReservations(id: number) {
    this.reservationService.getReservationsByUserId(id).subscribe(resp => {
      this.reservations = resp.data;
    })
  }
}
