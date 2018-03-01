import { Response } from '@angular/http';
import { StudentService } from './services/student.service';
import Student from './models/student.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    //Private studentservice will be injected into the component by Angular Dependency Injector
    private studentService: StudentService
  ) { }

  //Declaring the new student Object and initilizing it
  public newStudent: Student = new Student();

  //An Empty list for the visible student list
  studentsList: any;
  editStudents: Student[] = [];

  ngOnInit(): void {

    //At component initialization the
    this.studentService.getStudents()
      .subscribe(students => {
        //assign the studentlist property to the proper http response

        this.studentsList =  students;
      });
  }
  create() {
    this.studentService.createStudent(this.newStudent)
      .subscribe((res) => {
        this.studentsList.push(res.data);
        this.newStudent = new Student();
      });
  }

  editStudent(student: Student) {
    console.log(student);
    if(this.studentsList.includes(student)){
      if(!this.editStudents.includes(student)){
        this.editStudents.push(student);
      }else{
        this.editStudents.splice(this.editStudents.indexOf(student), 1);
        this.studentService.editStudent(student).subscribe(res => {
          console.log('Update Succesful');
        }, err => {
          this.editStudent(student);
          console.error('Update Unsuccesful');
        });
      }
    }
  }

  doneStudent(student: Student){
    this.studentService.editStudent(student).subscribe(res => {
      console.log('Update Succesful');
    }, err => {
      this.editStudent(student);
      console.error('Update Unsuccesful');
    });
  }

  submitStudnet(event, student: Student){
    if(event.keyCode ==13){
      this.editStudent(student);
    }
  }

  deleteStudent(student: Student) {
    this.studentService.deleteStudent(student._id).subscribe(res => {
      this.studentsList.splice(this.studentsList.indexOf(student), 1);
    });
  }
}
