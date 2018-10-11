import {Inject, Injectable} from '@angular/core';
import {HttpErrorResponse, HttpClient, HttpHeaders} from '@angular/common/http';
import {  map } from 'rxjs/operators';
import { WINDOW } from "../window.service";


@Injectable()
export class FileService {
  private host;
  constructor(
    private http: HttpClient,
    @Inject(WINDOW) private window: Window
  ) {
    this.host = "http://" + window.location.hostname + ':4000/file';
  }


  uploadImage(base64: string) {
    let image = this.buildUserFile(base64);
    if ((image.contentType != "image/jpeg") &&
      (image.contentType != "image/jpg") &&
      (image.contentType != "image/gif") &&
      (image.contentType != "image/png"))
      {
      alert('File must be an image');
    }else {
      return this.uploadUserFile(image).pipe(map(res => {
        return res;
      }, err => {
        throw err;
      }));
    }
  }

  uploadUserFile(file: UserFile) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(`${this.host}/file`, file).pipe(map(res => {
      //returns file id
      return "file/file/"+res;
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('An http error occurred when trying to save file: ', err.error.message);
      } else {
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
    }));
  }

  deleteFile(url: string){
    return this.http.delete(url).pipe(map(res => {
      return res;
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('An http error occurred when trying to save file: ', err.error.message);
      } else {
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
    }));
  }

  private buildUserFile(base64: string): UserFile {
    try {
      if (base64.substring(0, base64.indexOf(':')) !== 'data') {
        throw new Error('Invalid base64 string, might be that the metadata is missing.');
      }
    }
    catch (e) {
      throw e;
    }
    let file = {
      bytes: base64,
      contentType: base64.substring(base64.indexOf(':') + 1, base64.indexOf(";"))
    }
    return file;
  }
}

class UserFile {
  public bytes: String;
  public contentType: String;
}

// TODO: test delete
