import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Registro } from '../interfaces/registro.interface';
import 'rxjs/Rx';
import { URLSearchParams } from '@angular/http';


@Injectable()
export class AdministratorService {
  busquedaUrl:string = "http://localhost/angularTutorial/angularLearn/registro/back/controller/registroController.php?usuario=1"
  generalUrl:string = "http://localhost/angularTutorial/angularLearn/registro/back/controller/registroController.php";


  constructor( private http:Http ) { }

/*
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

  }*/
  /*getUserInfo( d ){
    this.http.get("data.json")
      .subscribe((data)=> {
          setTimeout(()=> {
              return data.json();
          }, 1000);
      });
  }*/
  getUserInfo( d ){
    let params = new URLSearchParams();
    params.set('data',d);

    return this.http.get( this.generalUrl, { search: params })
      .map( res=>{
        //console.log("res"+res.json());
        let body = res.json();
        return body || [];
      } )
  }

  actualizarEstatusPago( data_estatus ){
    let body = JSON.stringify( data_estatus );
    let headers = new Headers({
      'Content-Type' : 'application/x-www-form-urlencoded'
    });
    return this.http.post( this.generalUrl+'?estatus=1', body, {headers:headers} )
      .map( res=>{
      //  console.log(res.json());
        return res.json();
      } )
  }

  enviarComentario(data_comentario){
    let body = JSON.stringify( data_comentario );
    let headers = new Headers({
      'Content-Type' : 'application/x-www-form-urlencoded'
    });
    return this.http.post( this.generalUrl+'?comentHJgxzvgw=1', body, {headers:headers} )
      .map( res=>{
      //  console.log(res.json());
        return res.json();
      } )
  }

  responderComentario(data_comentario){
    let body = JSON.stringify( data_comentario );
    let headers = new Headers({
      'Content-Type' : 'application/x-www-form-urlencoded'
    });
    return this.http.post( this.generalUrl+'?resptaHJgxzvgw=1', body, {headers:headers} )
      .map( res=>{
      //  console.log(res.json());
        return res.json();
      } )
  }

  getAllUsermessages( d:any ){

    let params = new URLSearchParams();
    params.set('geTotMsgHJgxzvgw',d);

    return this.http.get( this.generalUrl, { search: params })
      .map( res=>{
        //console.log("res"+res.json());
        let body = res.json();
        return body || [];
      } )

  }




}
