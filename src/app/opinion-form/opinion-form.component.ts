import { Component, EnvironmentInjector, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OpinionService } from '../opinion.service';
@Component({
  selector: 'app-opinion-form',
  templateUrl: './opinion-form.component.html',
  styleUrls: ['./opinion-form.component.css']
})
export class OpinionFormComponent implements OnInit {

  constructor(private opinionService: OpinionService ) {}
  opinionTable: opinion[] = [];
  
  @Output() emit : EventEmitter<opinion> = new EventEmitter();;
  error: any[] = [];
  opinion = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    nick: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    opiniontext: new FormControl('', [
      Validators.required,
      Validators.minLength(50),
      Validators.maxLength(500)
    ]),
    
  });
  ngOnInit(): void {
  }
  submit(){
    let flag=true;
    if (!this.opinion.get('nick')!.valid ) {
      this.error.push("Błąd nie wpisałeś Nicku")
      flag=false;

  }
  if (!this.opinion.get('opiniontext')!.valid) {
    this.error.push("Twoja opinia jest niepoprawna- sprawdź czy tój test zawiera od 50 do 500 znaków")
    flag=false;
  }
  if (!this.opinion.get('name')!.valid ) {
    this.error.push("Twoja nazwa wycieczki nie zgadza się")
    flag=false;
  }
  if(flag){
    let opinionTosend = ({
      nick: this.opinion.get('nick')!.value,
      date: this.opinion.get('date')!.value,
      opinia: this.opinion.get('opiniontext')!.value,
      opinionname: this.opinion.get('name')!.value
    } as opinion);
    this.opinion.reset();
    this.error=[]
    this.emit.emit(opinionTosend);
    


  }


}
}





interface opinion {
  nick: string;
  date: string;
  opinia: string;
  opinionname:string;
}

function str(arg0: import("@angular/forms").AbstractControl<string | null, string | null> | null) {
  throw new Error('Function not implemented.');
}
