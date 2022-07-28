import { Component } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { StateRef } from './model';
import { Cities } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  error: string = "";
  constructor(public formBuilder: FormBuilder){
    this.form = this.formBuilder.group({ 
      fromDate: [''],
      toDate: [''],
    }, {validator: this.checkDates})
  }
  form: FormGroup;
  
  
  checkDates(group: FormGroup) {
    if(new Date(group.controls['toDate'].value)<new Date(group.controls['fromDate'].value)){
      alert("To date cannot be greater than from date");
      group.controls['toDate'].setValue('');
   }
 }
  StateList: StateRef[] = [
    {
      stateName: 'Maharashtra',
      cities: [{ name: 'Mumbai' }, { name: 'Pune' }],
    },
    {
      stateName: 'Gujarat',
      cities: [{ name: 'Ahmedabad' }, { name: 'Baroda' }],
    },
  ];

  Cities: any[] = [];
  AllCities: Cities[] = [];
  fetchCity(data: any) {
    this.Cities = this.StateList.filter((state) => {
      console.log(state.stateName)
      console.log(data.target.value)
      return state.stateName == data.target.value;
    });
    console.log(this.Cities)
    this.AllCities = this.Cities[0].cities
  }

  getToday(): string {
   return new Date().toISOString().split('T')[0]
  }


  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.form.value);
  }
}

export class DateValidators {
  static greaterThan(startControl: AbstractControl): ValidatorFn {
    return (endControl: AbstractControl): ValidationErrors | null => {
      const startDate: Date = startControl.value;
      const endDate: Date = endControl.value;
      if (!startDate || !endDate) {
        return null;
      }
      if (startDate >= endDate) {
        return { greaterThan: true };
      }
      return null;
    };
  }
}
