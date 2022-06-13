import { CharactersService } from './../../core/services/characters.service';
import { ServiceService } from '../../core/services/service.service';
import { Configuration } from './../../interfaces/configuration';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy {
  password: string = '';
  configuration$: Observable<Configuration>;
  settings = [
    {
      name: 'charactersAmount',
      value: 0
    },
    {
      name: 'specialCharacters',
      value: false
    },
    {
      name: 'caps',
      value: false
    },
    {
      name: 'capitalize',
      value: false
    },
    {
      name: 'numbers',
      value: false
    }
  ];
  suscriptions$: Subscription[] = [];

  constructor(private service: ServiceService, private charactersService: CharactersService) {
    this.configuration$ = this.service.configuration$;
    this.suscriptions$.push(
      this.service.generatedPassword$.subscribe(value => {
        this.password = value;
      })
    );
    this.suscriptions$.push(
      this.service.configuration$.subscribe(configuration => {
        this.settings[0].value = configuration.charactersAmount;
        this.settings[1].value = configuration.specialCharacters;
        this.settings[2].value = configuration.caps;
        this.settings[3].value = configuration.capitalize;
        this.settings[4].value = configuration.numbers;
      })
    );
    this.updatePassword();
  }

  updatePassword(): void {
    // ! Iterate though all desired characters.
    let newPassword = '';
    for (let i = 0; i < this.settings[0].value; i++) {
      let character = '';
      const iterationDice = this.generateRandomDiceInRange(1, 100);
      const chance = this.generateChances();

      // ! Character.
      if (iterationDice <= 33 || !this.settings[1].value || !this.settings[4].value) {
        character = this.pickRandomCharacter();

        // ! Caps.
        if (this.settings[2].value && iterationDice <= chance) {
          character = character.toUpperCase();
        }
      }

      // ! specialCharacters.
      if (this.settings[1].value && iterationDice > 33) {
        const specialCharactersArray = this.charactersService.specialCharacters$;
        character = this.pickRandomSpecialCharacter();
      }

      // ! numbers.
      if (this.settings[4].value && (iterationDice <= 100 && iterationDice >= 66)) {
        const number = this.generateRandomDiceInRange(0, 9);
        character = number.toString();
      }

      // ! Add character to password.
        newPassword += character;
    }

    // ! capitalize.
    if (this.settings[3].value) {
      newPassword = newPassword.charAt(0).toUpperCase() + newPassword.slice(1);
    }

    this.service.generatedPasswordValue = newPassword;
  }

  generateSpecialCharacterChance(): number {
    return 0;
  }

  generateRandomDiceInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  generateChances(): number {
    const activeSettings = this.settings.filter(setting => setting.value).length;
    const tempChance = 100 / activeSettings;
    const chance = tempChance <= 100 ? tempChance : 100;
    return chance;
  }

  pickRandomCharacter(): string {
    const charactersArray = this.charactersService.characters$;
    const randomIndex = this.generateRandomDiceInRange(0, charactersArray.length - 1);
    return charactersArray[randomIndex];
  }

  pickRandomSpecialCharacter(): string {
    const specialCharactersArray = this.charactersService.specialCharacters$;
    const randomIndex = this.generateRandomDiceInRange(0, specialCharactersArray.length - 1);
    return specialCharactersArray[randomIndex];
  }

  copyPassword($event: string) {
    navigator.clipboard.writeText($event);
  }

  ngOnDestroy(): void {
    this.suscriptions$.forEach(suscription => suscription.unsubscribe());
  }
}
