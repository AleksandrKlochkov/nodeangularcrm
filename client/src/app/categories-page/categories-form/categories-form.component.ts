import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/shared/servises/categories.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialServices } from 'src/app/shared/classes/material.services';
import { Category } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  @ViewChild('input', {static: false}) inputRef: ElementRef

  form: FormGroup
  image: File
  imagePreview: string | ArrayBuffer = ''
  isNew = true
  category: any



  constructor(private route: ActivatedRoute,
              private categoriesService: CategoriesService,
              private router: Router) {
  }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    
    })

    this.form.disable()

    this.route.params
    .pipe(
      switchMap(
        (params: Params) => {
          if(params['id']) {
              this.isNew = false
              return this.categoriesService.getById(params['id'])
          }

          return of(null)
        }
      )
    )
    .subscribe(
      (category: Category) => {
        if(category) {
          this.category = category
          this.form.patchValue({
            name: category.name
          })
          this.imagePreview = category.imageSrc
          MaterialServices.updateTextInputs()
        }
        this.form.enable()
      },
      error => MaterialServices.toast(error.error.messae)
    )
  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  deleteCategory() {
    const decision = window.confirm(`Вы уверены что хотите удалить категорию "${this.category.name}"`)

    if(decision) {
      this.categoriesService.delete(this.category._id)
        .subscribe(
          response => MaterialServices.toast(response.message),
          error => MaterialServices.toast(error.message),
          () => this.router.navigate(['/categories'])
        )
    }
  }

  onFileUpload(event: any){
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }

  onSubmit() {
    let obs$
    this.form.disable()
    if(this.isNew){
      obs$ =  this.categoriesService.create(this.form.value.name, this.image)
    } else {
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image)
    }

    obs$.subscribe(
      category => {
        this.category = category
        MaterialServices.toast('Изменения сохранены')
        this.form.enable()
     
      },
      error => {
        MaterialServices.toast(error.error.message)
        this.form.enable()
      }
    )
  }

}
