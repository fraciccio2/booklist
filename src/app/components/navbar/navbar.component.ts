import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: any;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.appUser$.subscribe(user => this.appUser=user);
   }

  ngOnInit(): void {
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['']);
  }

}
