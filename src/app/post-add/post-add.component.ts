import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';

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
      description: ['', [Validators.required, Validators.minLength(50)]],
      image: [''/*, Validators.required*/],
      order: this.initOrder()
    });
  }

  initOrder () {
    switch (this.route.snapshot.params.option) {
      case '1':
        return this.fb.group({
          interval: new FormControl({value: 'Daily', disabled: true}),
          duration: ['', [Validators.required, Validators.min(1), Validators.max(24)]],
          metric: ['Hours'],
          total: []
        });
      case '2':
        return this.fb.group({
          interval: new FormControl({value: 'Weekly', disabled: true}),
          duration: ['', [Validators.required, Validators.min(2), Validators.max(6)]],
          metric: ['Days'],
          total: []
        });
      case '3':
        return this.fb.group({
          interval: new FormControl({value: 'Monthly', disabled: true}),
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
  get description() {
    return this.addForm.get('description');
  }
  get order() {
    return this.addForm.get('order');
  }
  get metric() {
    return this.order.get('metric');
  }
  get duration(): FormControl {
    return this.order.get('duration') as FormControl;
  }
  get total() {
    return this.order.get('total');
  }
  getTotal() {
    switch (this.route.snapshot.params.option) {
      case '1':
        this.total.setValue(150);
        break;
      case '2':
        this.total.setValue((this.duration.value - 1) * 100);
        break;
      case '3':
        this.total.setValue(( this.duration.value - 5) * 70);
    }
    console.log(this.addForm);
  }
  submit() {
    console.log();
  }

}
