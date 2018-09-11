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
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get username () {
    return this.loginForm.get('username');
  }
  get password () {
    return this.loginForm.get('password');
  }
  submit () {
    this.auth.loginUser(this.loginForm.value);
  }

}
