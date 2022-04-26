import { Component, OnInit } from '@angular/core'
import { IMenu } from '../../interfaces/menu.interface'
import { HomeService } from '../../services/home.service'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private menuService:HomeService,private fb: FormBuilder) {
    this.getMenu()
   }
  ngOnInit(): void {}
  
  menu:IMenu[] = []
  updateData!:IMenu

  menuForm: FormGroup = this.fb.group({
    name: [ '', [ Validators.required, Validators.minLength(3) ] ],
    price: [ '', [ Validators.required, Validators.minLength(3) ] ],
    ingredients: this.fb.array([
    ], Validators.required )
  })

  newIngredient: FormControl = this.fb.control('', Validators.required)
  
  get ingredientsArray() {
    return this.menuForm.get('ingredients') as FormArray
  }

  
  aggIngredients() {
    if ( this.newIngredient.invalid ) return

    this.ingredientsArray.push(
      this.fb.control(this.newIngredient.value, Validators.required )
    ) 
    
    this.newIngredient.reset()
  
  }

  getMenu(){
    this.menuService.getMenu()
      .subscribe( res => this.menu = res )
  }

  create(){
    this.menuService.create(this.menuForm.value)
      .subscribe()
      this.getMenu()
  }

  deleteI( i: number ) {
    this.ingredientsArray.removeAt(i)
  }

  deleteP(id:string){
    this.menuService.deleteP(id)
      .subscribe()
      this.getMenu()
  }

  editar(i:IMenu){
    this.updateData = i
  }

  update(){
    this.menuForm.value.ingredients = this.menuForm.value.ingredients.concat( this.updateData?.ingredients)
    this.menuService.update(this.menuForm.value, this.updateData?._id)
      .subscribe()
      this.getMenu()
  }


}
