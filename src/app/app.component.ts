import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StateRef } from './model';
import { Cities } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showCities: boolean = false;
  minDate: string = new Date().toISOString().split('T')[0];;
  form: FormGroup;
  constructor(public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      state: [''],
      city: [''],
      fromDate: [''],
      toDate: [''],
    });
  }
  

  StateList: StateRef[] = [
    {
      stateName: 'Maharashtra',
      cities: [{ name:"Select City"}, {name: 'Mumbai' }, { name: 'Pune' }],
    },
    {
      stateName: 'Gujarat',
      cities: [{ name:"Select City"}, { name: 'Ahmedabad' }, { name: 'Baroda' }],
    },
  ];

  Cities: Cities[] = [];

  // function to set cities upon selection of state
  fetchCity(data: any) {
    this.showCities = true;
    this.Cities = this.StateList.filter((state) => {
      return state.stateName == data.target.value;
    })[0].cities;
  }

  // Set max date ie upto today in from date (Date Picker)
  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  // Set minimum date depending upon selection of from date in to date (Date Picker)
  setToDate(fromDate: any) {
    this.minDate = fromDate.target.value;
  }

  onSubmit() {
    // Get the form values
    console.warn(this.form.value);
  }
}
