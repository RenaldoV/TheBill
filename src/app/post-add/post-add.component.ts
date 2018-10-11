import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FileService} from "./file.service";

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {
  addForm: FormGroup;
  @ViewChild('theFile') theFile: any;
  @Input() imageLink: String;
  @Input() formControlValue: String;
  @Output() imageLinkChange = new EventEmitter<any>();
  @Output() imageUrlChange = new EventEmitter<any>();

  url: string;
  data: any;
  showCropper: boolean;
  step: Number;
  chooseText: String;
  isLoading: Boolean = false;
  failed: Boolean = false;
  out: string = "";
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fileService: FileService) {
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
  openFileBrowser() {
    if (this.url) {
      if(confirm("Are you sure you want to change the image?")) {
        this.theFile.nativeElement.click();
      }
    }else {
      this.theFile.nativeElement.click();
    }
  }
  submit() {
    console.log();
  }
  fileChangeListener($event) {
    // Delete if uploaded
    if (this.url) {
        this.fileService.deleteFile(this.url).subscribe(res => {
          console.log(res);
        }, err => {
          console.error(err);
        });
    }
    const image: any = new Image();
    const file: File = $event.target.files[0];
    if (file.size > 5242880) {
      alert('The file must be smaller than 5MB');
    } else {
      const myReader: FileReader = new FileReader();
      const that = this;
      myReader.onloadend = function (loadEvent: any) {
        image.src = loadEvent.target.result;
        that.out += image.src;
        that.Upload(loadEvent.target.result);
      };
      myReader.readAsDataURL(file);
      this.theFile.nativeElement.value = '';
    }
  }
  Upload(base64: string) {
    const that = this;
    this.isLoading = true;
    this.failed = false;
    return that.fileService.uploadImage(base64).subscribe(res => {
      that.isLoading = false;
      that.url = res;
      that.imageLink = res;
      return res;
    }, err => {
      that.isLoading = false;
      that.failed = true;
      that.theFile.nativeElement.value = '';
      const ret = {
        err: 'Upload Failed.'
      };
      throw err;
    });
  }

  imgLoadStart() {
    console.log('loadStart');
  }
  imgLoadEnd() {
    console.log('loadEnd');
  }
}

// TODO: Image Loader
// TODO: Image Change / Delete
