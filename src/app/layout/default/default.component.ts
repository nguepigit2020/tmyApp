import { Component } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  sideBarOpen = true;
  constructor() { }

  ngOnInit(): void {
  }
/// methode pour changer le status de la variable sideBarOpen
sideBarToggler(){
  this.sideBarOpen =! this.sideBarOpen;
 // console.log('tsa')
}

}
