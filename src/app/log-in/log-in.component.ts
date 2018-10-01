import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {ValidateFn} from "codelyzer/walkerFactory/walkerFn";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  ngOnInit() {
   // this.auth.addUser({email: 'test@thebil.co.za', password: 'rootTest1'});
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get email () {
    return this.loginForm.get('email');
  }
  get password () {
    return this.loginForm.get('password');
  }
  submit () {
    this.auth.loginUser(this.loginForm.value)
  }

}
