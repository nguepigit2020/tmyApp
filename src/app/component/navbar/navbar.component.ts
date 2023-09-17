import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  avatar_piture:string="assets/images/avatar.png";

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
 
  userInfos : any;
  userEmail : string = '';

  constructor() {}

  ngOnInit(): void {
    // this.userInfos = this.authService.getUserInfos();
    // this.userEmail = this.userInfos[1];
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  onlogOut(){
    // this.authService.logout();
  }

}
