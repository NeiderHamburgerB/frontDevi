import { Component, OnInit } from '@angular/core';
import { IMenu } from '../../interfaces/menu.interface';
import { HomeService } from '../../services/home.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private menuService:HomeService) {
    this.getMenu()
   }

  menu!:IMenu[]

  menuForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    ingredients: new FormControl('')
  });

  ngOnInit(): void {
    
  }

  getMenu(){
    this.menuService.getMenu()
    .subscribe( res => this.menu = res )
  }

  crear(){
    console.log(this.menu.values)
  }

}
