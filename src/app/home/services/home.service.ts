
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { IMenu } from '../interfaces/menu.interface'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  env:any

  constructor(private http:HttpClient) {
    this.env = environment
  }
  //platos del menu
  getMenu():Observable<IMenu[]>{
    return this.http.get<IMenu[]>(this.env.all)
  }
  
  create(data:IMenu){
    return this.http.post(this.env.create, data)
  }

  deleteP(id:string){
    return this.http.delete(`${this.env.delete}/${id}`)
  }

  update(data:IMenu, id:string){
    return this.http.put(`${this.env.update}/${id}`, data)
  }

}