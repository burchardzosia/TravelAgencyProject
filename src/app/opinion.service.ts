import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OpinionService {
  opinionTable: opinion[] = []

  constructor() { }
  addopinion(opinion:opinion){
    this.opinionTable.push(opinion)
  }
  getopinion(){
    return this.opinionTable
  }
}

interface opinion {
  nick: string;
  date: string;
  opinia: string;
  opinionname:string
}
  