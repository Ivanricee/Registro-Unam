import { Component, Input,  AfterViewChecked} from '@angular/core';
import { NgFor } from '@angular/common';
import { AdministratorService } from '../../services/administrator.service';
import { RegistroService } from '../../services/registro.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import {BrowserModule, DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';

import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
})


export class AdministratorComponent {


  //variables para mostrar mensajes en el datable
  private mensaje:boolean = false;
  private datatable_comentarios:any[];
  public filterQueryvarMsg = "";
  filtro_dataMsg: any = [];
  public rowsOnPageMsg = 5;
  public sortOrderMsg = "asc";


  current_arrow: number = -1;
  private data_mensaje:any[];
  private countTotalMsgs:number = 0;
  private lastIdMsg:number = 0;

  private data_respuesta:any= {
    id_mensaje:0,
    comentario:"",
  }
  private defaultValue:string = "";//limpia textarea

  private panelMsgActivo:boolean = false;
  private mensajeStatusEnvio:boolean = false;
  private noMensajes:boolean = false;
  //Fin de mostrado de mensajes


  data_login:any;
  private data_user:any[];
  private data_estatus:any= {
    id_persona:0,
    estatus:0,
  }
  private data_comentario:any= {
    id_persona:0,
    comentario:"",
    estatus:0,
  }

  public filterQueryvar = "";
  filtro_data: any = [];
  public rowsOnPage = 5;
  public sortBy = "paterno";
  public sortOrder = "asc";

  private estatusNoPago:number = 0;
  private estatusPendiente:number = 0;
  private estatusAceptado:number = 0;
  private estatusRechazado:number = 0;
  private botonEstado:boolean = true;
  private botonComentario:boolean = true;
  private comentarioSuccess:boolean = false;
  estatusLabel:number;
  public urlArvhivo: "http://localhost/angularTutorial/angularLearn/registro/back/controller/";

  constructor(private _AdministratorService: AdministratorService,
    private _registroService: RegistroService,
               private router:Router, private domSanitizer:DomSanitizer) {

    this.data_login = JSON.parse(localStorage.getItem("data_login"));
    if(this.data_login.id_persona === "cks433NdyjyabdXhADVoOUGSIPK4sDLpVH5IeCmUA0O8FRksdfwefgfqwe24PFe7j9U7Z7yPfe4K8kjtf8<zewaxCO"){

      this._AdministratorService.getUserInfo("vVf1HJgxz1vg0wuw6L4oSaxZYbd8w7Jb")
       .subscribe(data=>{
         this.data_user = data;
         for(let state of data ){
           //this.pageurl = this.domSanitizer.bypassSecurityTrustResourceUrl('http://localhost/angularTutorial/angularLearn/registro/back/controller/'+state["archivo"]);
           if(state["estatus"] == 0){
             this.estatusNoPago++;
           }else if(state["estatus"] == 1){
             this.estatusPendiente++;
           }else if(state["estatus"] == 2){
             this.estatusAceptado++;
           }else if(state["estatus"] == 3){
             this.estatusRechazado++;
           }
         }

        /* if(data.status == false){

         }else{

         }*/
       },
       error=> console.error(error));



    }else{//si no es el usuario admin lo regresa al home
      this.router.navigate(['/home']);
    }

  }


  aceptarPago(id_persona:number, estatus:number, estatusProcedencia){
    this.botonEstado = false;
    this.data_estatus["id_persona"] = id_persona;
    this.data_estatus["estatus"] = estatus;

    this._AdministratorService.actualizarEstatusPago(this.data_estatus)
     .subscribe(data=>{
      /* if(estatusProcedencia == 0){
         this.estatusNoPago--;
       }else if(estatusProcedencia == 1){
         this.estatusPendiente--;
       }else if(estatusProcedencia == 2){
         this.estatusAceptado--;
       }else if(estatusProcedencia == 3){
         this.estatusRechazado--;
       }*/
       if(data.status == true){


         if(data.estatus == 2){//si es 2 el pago es aceptado
            this.estatusLabel = 2;
        //    this.estatusAceptado++;
         }else{//si es 3 el pago será rechazado
          // this.estatusRechazado++;
            this.estatusLabel = 3;
         }
       }else{
         //en caso de que no se haya actualizado
         //la etiqueta cumple el condicional para aparecer normal
         this.data_estatus["id_persona"] = 0;
       }
       this.botonEstado = true;
      // this.router.navigate(['/perfil', data.id]);
    },
     error=> console.error(error));


  }
  filtrarEstatus(estatus:number){
    this.comentarioSuccess = false;
    this.filtro_data["estatus"] = estatus;
  }


  enviarComentario(id_persona, comentarioEstatus){
    this.comentarioSuccess = false;
    if(comentarioEstatus.trim() != "" && comentarioEstatus.trim().length < 250 ){
      this.botonComentario = false;
      this.data_comentario["id_persona"] = id_persona;
      this.data_comentario["comentario"] = comentarioEstatus;
        this._AdministratorService.enviarComentario(this.data_comentario)
         .subscribe(data=>{
           this.current_arrow = -1;
           if(data.status == true){
             this.comentarioSuccess = true;
             this.mensajeStatusEnvio = true;
             this.defaultValue = "";//limpia textarea

           }else{
              this.defaultValue = "";//limpia textarea
           }
           this.botonComentario = true;
        },
         error=> console.error(error));
     }else{
       alert("El mensaje no cumple con los requisitos");
     }
       //alert(this.mensajeStatusEnvio);
      /*  setTimeout(function() {
          this.comentarioSuccess = false;
          alert(this.comentarioSuccess);
        }, 1000);*/
  }



  getAllUsermessages(){
    this.comentarioSuccess = false;
    this.mensajeStatusEnvio = false;
    this.mensaje=true;
    this.panelMsgActivo = false;

      this._AdministratorService.getAllUsermessages(1)
       .subscribe(data=>{
         this.datatable_comentarios = data;
         if(data.status == false){

         }else{

         }
         this.botonComentario = true;
      },
       error=> console.error(error));
  }

  responderComentario(id_mensaje:number, comentario:string):void{
    if(comentario.trim() != "" && comentario.trim().length < 250 && comentario.trim().length >= 10 ){
      this.botonComentario = false;
      this.data_respuesta["id_mensaje"] = id_mensaje;
      this.data_respuesta["comentario"] = comentario.trim();
        this._AdministratorService.responderComentario(this.data_respuesta)
         .subscribe(data=>{
           this.current_arrow = -1;
           if(data.status == true){
             this.comentarioSuccess = true;
             this.mensajeStatusEnvio = true;
             this.defaultValue = "";
           }else{
             this.defaultValue = "";
           }
           this.botonComentario = true;
        },
         error=> console.error(error));
    }else{
      alert("El mensaje no cumple con los requisitos");
    }
  }

obtenerMensajeUsuario(id_persona: number, index_table):void{
  this.current_arrow = index_table;
  this.panelMsgActivo = true;

  this._registroService.obtenerMensajes(id_persona)
     .subscribe(data=>{
       if(data.status == false){
         this.noMensajes = true;
       }else{
         this.panelMsgActivo = true;
         this.data_mensaje = data;
         //OBTENER ULTIMO ID, PARA COLOCAR AHI EL TEXAREA
         this.countTotalMsgs = 0;
         for(let count of data ){
           this.countTotalMsgs++;
         }
         if(this.countTotalMsgs > 0){
             this.lastIdMsg = this.data_mensaje[(this.countTotalMsgs-1)]["id_mensaje"];
         }else{
           this.noMensajes = true;
         }

       }
     },
     error=> console.error(error));

}

  logOut(){
    localStorage.clear();
    this.router.navigate(['/home']);
  }























}
