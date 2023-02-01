import { Component, NgZone, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { CrudService } from 'src/app/service/crud.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  bookForm:FormGroup;

  constructor(
    public formBulider: FormBuilder,
    private router : Router,
    private ngZone: NgZone,
    private crudService:CrudService
  ){
this.bookForm = this.formBulider.group({
  name: [''],
  price: [''],
  description: ['']
})

  }
  ngOnInit(): void {
  }

  onSubmit():any{
    this.crudService.AddBook(this.bookForm.value)
    .subscribe(() =>{

      console.log("Data added")
      this.ngZone.run (()=> this.router.navigateByUrl('/books-list'))
    }, (err) =>{
      console.log(err);
    } )
  }
}
