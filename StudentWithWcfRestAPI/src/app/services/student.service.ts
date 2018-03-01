import Student from '../models/student.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response, Jsonp} from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

// RxJS operator for mapping the observable
import 'rxjs/add/operator/map';

@Injectable()
export class StudentService {

  //  api_url = 'http:// localhost:4061';
  //  studentUrl = `${this.api_url}/student`;
  api_url = 'http://192.168.0.18/studentapiusingmongoDB/studentapi.svc';
  studentUrl = `${this.api_url}/getallstudents`;
  //  http:// 192.168.0.18/studentapiusingmongoDB/studentapi.svc/getallstudents

  constructor(
    private http: HttpClient
  ) { }


  /*Create Student, takes a Student Object*/
  createStudent(student: Student): Observable<any> {
    /*returns the observable of http post request*/
    //console.log(student);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post('http://192.168.0.18/studentapiusingmongoDB/studentapi.svc/addstudent', student, httpOptions);
  }

  //  Read Student, takes no arguments
  getStudents(): Observable<Student[]> {
    return this.http.get(`${this.api_url}/getallstudents`, {observe: 'body', responseType: 'json' })
    .map(res  => {
      //  Maps the response object sent from the server
      return res as Student[];
    });
  }
  // Update student, takes a Student Object as parameter
  editStudent(student: Student) {
    const editUrl = `${this.studentUrl}`;
    // returns the observable of http put request
    return this.http.put(editUrl, student);
  }

  deleteStudent(studentid: string): any {
    // Delete the object by the id
    const deleteUrl = `${this.studentUrl}/${studentid}`;
    return this.http.delete(deleteUrl)
    .map(res  => {
      return res;
    });
  }

  // Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); //  for demo purposes only
    return Promise.reject(error.message || error);
  }

}
