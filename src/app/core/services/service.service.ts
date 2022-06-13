import { Configuration } from './../../interfaces/configuration';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private configuration: BehaviorSubject<Configuration> = new BehaviorSubject<Configuration>({
    charactersAmount: 10,
    specialCharacters: false,
    caps: false,
    capitalize: false,
    numbers: false
  });
  private generatedPassword: BehaviorSubject<string> = new BehaviorSubject<string>('Password');

  // ! Getters

  get configuration$() {
    return this.configuration.asObservable();
  }

  get generatedPassword$() {
    return this.generatedPassword.asObservable();
  }

  // ! Setters

  set charactersAmountValue(value: number) {
    this.configuration.next({
      ...this.configuration.value,
      charactersAmount: value
    });
  }

  set specialCharactersValue(value: boolean) {
    this.configuration.next({
      ...this.configuration.value,
      specialCharacters: value
    });
  }

  set capsValue(value: boolean) {
    this.configuration.next({
      ...this.configuration.value,
      caps: value
    });
  }

  set capitalizeValue(value: boolean) {
    this.configuration.next({
      ...this.configuration.value,
      capitalize: value
    });
  }

  set numbersValue(value: boolean) {
    this.configuration.next({
      ...this.configuration.value,
      numbers: value
    });
  }

  set generatedPasswordValue(value: string) {
    this.generatedPassword.next(value);
  }
}
