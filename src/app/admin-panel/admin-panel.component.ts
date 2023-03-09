import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(public us:UserService) { }
  tablicaSerwe: any[] = []
  ngOnInit(): void {
    this.us.x.forEach(item => {
      this.tablicaSerwe.push(item.mail)
    })
   

  }
  session(){
    this.us.persistenceSetting="session"
  }
  local(){
    this.us.persistenceSetting="local"
  }
  none(){
    this.us.persistenceSetting="none"
  }


}
