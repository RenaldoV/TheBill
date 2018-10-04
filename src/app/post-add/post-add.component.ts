import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {
  addForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.addForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(100)]],
      image: ['', Validators.required],
      order: this.fb.array([
        this.initOrder()
      ])
    });
  }

  initOrder () {
    switch(this.route.snapshot.params.option) {
      case '1':
        return this.fb.group({
          interval: ['Daily'],
          duration: ['', [Validators.required, Validators.min(1), Validators.max(24)]],
          metric: ['Hours'],
          total: []
        });
      case '2':
        return this.fb.group({
          interval: ['Weekly'],
          duration: ['', [Validators.required, Validators.min(2), Validators.max(6)]],
          metric: ['Days'],
          total: []
        });
      case '3':
        return this.fb.group({
          interval: ['Monthly'],
          duration: ['', [Validators.required, Validators.min(7), Validators.max(28)]],
          metric: ['Days'],
          total: []
        });
    }
  }

  get title() {
    return this.addForm.get('title');
  }
  get price() {
    return this.addForm.get('price');
  }

}
