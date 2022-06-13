import { ServiceService } from './services/service.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  providers: [ServiceService]
})
export class CoreModule { }
