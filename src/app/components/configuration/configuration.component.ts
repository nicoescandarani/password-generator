import { Configuration } from './../../interfaces/configuration';
import { Observable, Subscription } from 'rxjs';
import { ServiceService } from '../../core/services/service.service';
import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit, OnDestroy {
  @ViewChild('range') range: ElementRef | undefined;
  @Output() changedConfiguration = new EventEmitter();

  configuration$: Observable<Configuration>;
  charactersAmount = 0;
  specialCharacters = false;
  caps = false;
  capitalize = false;
  numbers = false;
  suscription$: Subscription;

  constructor(private service: ServiceService) {
    this.configuration$ = this.service.configuration$;
    this.suscription$ = this.service.configuration$.subscribe(configuration => {
      this.charactersAmount = configuration.charactersAmount;
      this.specialCharacters = configuration.specialCharacters;
      this.caps = configuration.caps;
      this.capitalize = configuration.capitalize;
      this.numbers = configuration.numbers;
    });
  }

  ngOnInit(): void {
  }

  setCharactersAmountValue() {
    this.service.charactersAmountValue = this.range?.nativeElement.value;
    this.changedConfiguration.emit();
    if (this.range) {
      this.range.nativeElement.style.backgroundSize = (1 - 30) * 100 / (30 - 1) + '% 100%';
    }
  }

  setSepcialCharactersValue() {
    this.service.specialCharactersValue = !this.specialCharacters;
    this.changedConfiguration.emit();
  }

  setCapsValue() {
    this.service.capsValue = !this.caps;
    this.changedConfiguration.emit();
  }

  setCapitalizeValue() {
    this.service.capitalizeValue = !this.capitalize;
    this.changedConfiguration.emit();
  }

  setNumbersValue() {
    this.service.numbersValue = !this.numbers;
    this.changedConfiguration.emit();
  }

  ngOnDestroy(): void {
    this.suscription$.unsubscribe();
  }
}
