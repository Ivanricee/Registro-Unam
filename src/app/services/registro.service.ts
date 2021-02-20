import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Registro } from '../interfaces/registro.interface';
import 'rxjs/Rx';
import { URLSearchParams } from '@angular/http';


@Injectable()
export class RegistroService {
  profesorUrl:string = "http://localhost/angularTutorial/angularLearn/registro/back/controller/registroController.php?registro=0";
  busquedaUrl:string = "http://localhost/angularTutorial/angularLearn/registro/back/controller/registroController.php?usuario=1"
  generalUrl:string = "http://localhost/angularTutorial/angularLearn/registro/back/controller/registroController.php";
  loginUrl:string = "http://localhost/angularTutorial/angularLearn/registro/back/controller/registroController.php?log=1";
  constructor( private http:Http ) { }

  revisarEmail(email:string){
    let params = new URLSearchParams();
    params.set('email',email);

    return this.http.get( this.generalUrl, { search: params })
      .map( res=>{
      //  console.log(res.json());
        return res.json();
      } )

  }
  nuevoProfesor( registro:Registro){
    let body = JSON.stringify( registro );
    let headers = new Headers({
      'Content-Type' : 'application/x-www-form-urlencoded'
    });
    return this.http.post( this.profesorUrl, body, {headers:headers} )
      .map( res=>{
      //  console.log(res.json());
        return res.json();
      } )

  }
  iniciarSesion( data_login:any){
    let body = JSON.stringify( data_login );
    let headers = new Headers({
      'Content-Type' : 'application/x-www-form-urlencoded'
    });
    return this.http.post( this.loginUrl, body, {headers:headers} )
      .map( res=>{
      //  console.log(res.json());
        return res.json();
      } )

  }
  getCedula( cedula ){
    let params = new URLSearchParams();
    params.set('cedula',cedula);

    return this.http.get( this.generalUrl, { search: params })
      .map( res=>{
      //  console.log(res.json());
        return res.json();
      } )
  }

  getCP( cp ){
    let params = new URLSearchParams();
    params.set('cp',cp);

    return this.http.get( this.generalUrl, { search: params })
      .map( res=>{
      //  console.log(res.json());
        return res.json();
      } )
  }



  getUsuario( id:any ){
    let body = JSON.stringify( id );
    let headers = new Headers({
      'Content-Type' : 'application/x-www-form-urlencoded'
    });
    return this.http.post( this.busquedaUrl, body, {headers:headers} )
      .map( res=>{
      //  console.log(res.json());
        return res.json();
      } )
  }

  obtenerMensajes( id:any ){
    let body = JSON.stringify( id );
    let headers = new Headers({
      'Content-Type' : 'application/x-www-form-urlencoded'
    });
    return this.http.post( this.generalUrl+'?usmensajeHJvgwgxz=1', body, {headers:headers} )
      .map( res=>{
      //  console.log(res.json());
        return res.json();
      } )
  }

}
