import { Component } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';
import { Usuarios } from './usuarios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prueba';
  usuarios:Usuarios[]=[];
  //usuarios2:Usuarios[]=[];
  name:string = "";
  lastname:string = "";
  identification:string = "";
  email:string = "";
  phone:string = "";

  constructor(private usurioService:UsuariosService){
    this.listarUsuarios();
  }
  listarUsuarios(){
    this.usurioService.obtenerUsuarios().subscribe((resp:any)=>{
    this.usuarios=resp;
    });

  }
  insertarusuarios(){
     if (this.validarcampos()){
      this.usurioService.validarusuario(this.email).subscribe((resp:any)=>{
          if(resp){
            alert("el correo ingresado ya existe");
          }
          else{    
            this.usurioService.validarcedula(this.identification).subscribe((resp:any)=>{
            if(resp){
              alert("el documento ingresado ya existe");
            }
            else{
                this.usurioService.insertar(this.identification,this.name,this.lastname,this.email,this.phone)
                .subscribe((resp:any)=>{
                this.usuarios.push(resp);
                alert("usuario registrado exitosamente");
                });
              }
            })
          }
      })
     }
      
  }
  validarcampos():boolean{
    if(this.identification==""){
      alert("Debe ingresar un número de identificación");
      return false;
    }

    if(this.name==""){
      alert("Debe ingresar un nombre");
      return false;
    }

    if(this.lastname==""){
      alert("Debe ingresar los apellidos");
      return false;
    }

    let re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    if(!re.exec(this.email)){
      alert('El email ingresado no es valido');
      return false;
    }

    if(this.phone==""){
      alert("Debe ingresar un número de telefono");
      return false;
    }
    return true;
    }

    modificarusuarios(){
    this.validarcampos();

          this.usurioService.validarcedula(this.identification).subscribe((resp:any)=>{
          if(resp){
            this.usurioService.modificar(this.identification,this.name,this.lastname,this.email,this.phone).subscribe((resp:any)=>{
            this.usuarios=[];
            this.listarUsuarios();
            });
          }
          else{
            alert("El documento que desea modificar no existe");
          }
        })
  }

}
