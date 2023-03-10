import { Component ,NgZone,OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router'
import { CrudService } from 'src/app/service/crud.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit{

  getId:any;
  updateForm:FormGroup;

  constructor(
    public formBuilder :FormBuilder,
    private router: Router,
    private ngZone:NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ){
    this.getId = this.activatedRoute.snapshot.paramMap.get('id')

    this.crudService.GetBook(this.getId).subscribe(res =>{
      this.updateForm.setValue({
        name :res['name'],
        price: res['Price'],
        description: res['description']
      })
    })

    this.updateForm = this.formBuilder.group({
      name :[''],
      price: [''],
      description: ['']
    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(): any{
    this.crudService.updateBook(this.getId, this.updateForm.value).subscribe(()=>{
      console.log('Data updated')
      this.ngZone.run(() => this.router.navigateByUrl('/book-list'))
    },(err) =>{console.log(err);}
    )
  }
}
