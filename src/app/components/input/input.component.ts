import { ServiceService } from '../../core/services/service.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, OnDestroy {
  @ViewChild('button') button: ElementRef | undefined;

  @Output() copyPasswordEmitter = new EventEmitter<string>();

  generatedPassword: string = '';
  subscription: Subscription;

  constructor(private service: ServiceService) {
    this.subscription = this.service.generatedPassword$.subscribe(value => {
      this.generatedPassword = value;
    });
  }

  ngOnInit(): void { }
  
  copy() {
    this.copyPasswordEmitter.emit(this.generatedPassword);
    this.button?.nativeElement.classList.add('active');
    setTimeout(() => {
      this.button?.nativeElement.classList.remove('active');
    }, 300);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
