import { Component, OnInit } from '@angular/core';
import {ExpenseBody, MemberBody, TripBody, TripsService} from '../trips.service';
import {Trip, TripMember} from '../../../server/src/db/types';
import {Router} from '@angular/router';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  addTripForm = false
  addPersonForm = false
  addExpenseForm = false
  newTripBody: TripBody = {
    name: ''
  }
  newMemberBody: MemberBody = {
    name: ''
  }
  newExpenseBody: ExpenseBody = {
    amount: ''
  }
  tripList: Trip[]
  tripDetails: Trip | null = null
  myMemberData: TripMember
  tripComplete = true

  constructor(
    private tripService: TripsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTrips()
  }

  logout(): void {
    this.router.navigate([''])
  }

  toggleNewTripForm(): void {
    this.addTripForm = !this.addTripForm
  }

  toggleAddPersonForm(): void {
    this.addPersonForm = !this.addPersonForm
  }

  toggleAddExpenseForm(): void {
    this.addExpenseForm = !this.addExpenseForm
  }

  toggleTripComplete(): void {
    // TODO Send trip complete to server
    alert('Need to send to server still!')
  }

  getTrips(): void {
    this.tripService.getTrips()
      .subscribe((trips) => {
        this.tripList = trips
      })
  }

  addTrip(): void {
    this.tripService.createTrip(this.newTripBody)
      .subscribe((res) => {
        if (typeof res === 'string'){
          alert(res)
        } else {
          this.toggleNewTripForm()
          this.newTripBody.name = ''
          this.getTrips()
        }
      })
  }

  addPerson(): void {
    this.tripService.addMember(this.newMemberBody, this.tripDetails._id)
      .subscribe((res) => {
        if (typeof res === 'string'){
          alert(res)
        } else {
          this.toggleAddPersonForm()
          this.newMemberBody.name = ''
          this.getTripDetails(this.tripDetails._id)
        }
      })
  }

  addExpense(): void {
    this.tripService.addExpense(this.newExpenseBody, this.tripDetails._id)
      .subscribe((res) => {
        if (typeof res === 'string'){
          alert(res)
        } else {
          this.toggleAddExpenseForm()
          this.newExpenseBody.amount = ''
          this.getTripDetails(this.tripDetails._id)
        }
      })
  }

  getTripDetails(id): void {
    this.tripService.getTrip(id)
      .subscribe((res) => {
        if (typeof res === 'string'){
          alert(res)
        } else {
          this.tripDetails = res
          this.setMyMemberData()
          this.setTripComplete()
        }
      })
  }

  setMyMemberData(): void {
    this.myMemberData = this.tripDetails.members.find(x => x.name === this.tripDetails.current_user)
  }

  setTripComplete(): void {
    this.tripComplete = true
    this.tripDetails.members.forEach(x => {
      this.tripComplete = this.tripComplete && x.complete
    })
  }
}
