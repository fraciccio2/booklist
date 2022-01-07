import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private auth: AuthService, private userService: UserService, private router: Router) {
    this.auth.users$.subscribe((user: any) => {
      if (!user) return;
      let returnUrl = localStorage.getItem('returnUrl');
      this.userService.save(user);
      localStorage.removeItem('name');
      if (!returnUrl) return;
      localStorage.removeItem('returnUrl');
      this.router.navigate([returnUrl]);
    })
  }
}
