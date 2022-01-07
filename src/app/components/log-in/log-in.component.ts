import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  em: boolean=false;
  emn: boolean= false;
  hide: boolean=true;
  contact: any={
    email: "",
    password: "",
    name: ""
  }

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  login(){
    this.auth.login();
  }

  loginEP(){
    this.auth.loginEP(this.contact.email, this.contact.password);
  }

  signEP(){
    this.auth.signEP(this.contact.email, this.contact.password);
    localStorage.setItem('name', this.contact.name);
  }

  logem(){
    this.em=true;
    this.emn=false;
  }
}
