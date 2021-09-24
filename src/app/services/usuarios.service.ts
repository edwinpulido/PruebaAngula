import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Usuarios } from '../usuarios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url:string="http://localhost:8080/api/users";

  constructor(private http:HttpClient) { }

  obtenerUsuarios():Observable<Usuarios>{
    return this.http.get<Usuarios>(this.url+"/");
  }

  insertar(cedula:string,nombres:string,apellidos:string,correo:string,telefono:string):Observable<Usuarios>{
   let usuario = {
    name:nombres,
    lastname:apellidos,
    identification:cedula,
    email:correo,
    phone:telefono
   }
   return this.http.post<Usuarios>(this.url+"/user",usuario);
  }

  modificar(cedula:string,nombres:string,apellidos:string,correo:string,telefono:string):Observable<Usuarios>{
   let usuario = {
    name:nombres,
    lastname:apellidos,
    identification:cedula,
    email:correo,
    phone:telefono
   }
   return this.http.put<Usuarios>(this.url+"/user/"+cedula,usuario);
  }

  validarusuario(correo:string):Observable<Usuarios>{
   return this.http.get<Usuarios>(this.url+"/user/"+correo);
  }

  validarcedula(cedula:string):Observable<Usuarios>{
   return this.http.get<Usuarios>(this.url+"/user/identification/"+cedula);
  }
}
