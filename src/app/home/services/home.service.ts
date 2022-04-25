
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { IMenu } from '../interfaces/menu.interface'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  env:any

  headers = new HttpHeaders();

  constructor(private http:HttpClient) {
    this.env = environment
  }
  //platos del menu
  getMenu():Observable<IMenu[]>{
      
   
    return this.http.get<IMenu[]>(this.env.all)
  }

}