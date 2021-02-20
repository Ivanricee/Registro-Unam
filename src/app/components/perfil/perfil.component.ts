import { Component, Directive, NgZone, ViewChild, ElementRef} from '@angular/core';
import { NgFor } from '@angular/common';
import { Registro } from '../../interfaces/registro.interface';
import { Cedula } from '../../interfaces/cedula.interface';
import { RegistroService } from '../../services/registro.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { AdministratorService } from '../../services/administrator.service';
/*import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';*/
import {UPLOAD_DIRECTIVES} from 'ng2-file-uploader/ng2-file-uploader';
//formulario por data
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

/*const URL = 'http://localhost/angularTutorial/angularLearn/registro/back/controller/registroController.php?foto=2';*/

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',

})

export class PerfilComponent  {
  //cerrar modal
  @ViewChild('closeBtn') closeBtn: ElementRef;

    private mensajeStatusEnvio:boolean = false;
    private noMensajes:boolean = false;

    private data_mensaje:any[];
    private mostrarData = false;
    private botonComentario:boolean = true;
    private comentarioSuccess:boolean = false;
    private defaultValue:string = "";//limpia textarea
    private data_comentario:any= {
      id_persona:0,
      comentario:"",
      estatus:1,
    }

    private data_respuesta:any= {
      id_mensaje:0,
      comentario:"",
    }
    private countTotalMsgs:number = 0;
    private lastIdMsg:number = 0;
    //subir imagen perfil
    urlImagen = "http://localhost/angularTutorial/angularLearn/registro/back/controller/";
    private userId:Object = {
     id:"",
     tipo:"",
     federacion:"",
     noReferencia:""
    }
    formaPago:FormGroup;
    //arreglo de datos de usuario
  private registro:Registro= {
    cedula:"",
    nombre:"",
    paterno:"",
    materno:"",
    genero:"",
    username:"",
    passwordI:"",
    passwordError:"",
    email:"",
    telefono:"",
    telefonoCel:"",
    institucion:"",
    titulo:"",
    escuelactual:"",
    cp:"",
    estado:"",
    municipio:"",
    asentamiento:"",
    calle:"",
    interior:"",
    exterior:"",
    imagen:"",
  }

  private pago:Object= {
    /*fecha:"",*/
    noReferencia:"",
    pago:"",
    federacion:"",
  }

  /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%Subir foto%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
   uploadFile: any;
    hasBaseDropZoneOver: boolean = true;
    options: Object = {
      url: 'http://localhost/angularTutorial/angularLearn/registro/back/controller/registroController.php?foto=1',
      data: {
        userId: this.userId['id'],
        isAdmin: true
      },
    };
    sizeLimit = 5000000;
    handleUpload(data): void {
      if (data && data.response) {
        data = JSON.parse(data.response);
        if(data.status == false){
          if(data.msg = "1"){
            alert("El archivo no es una imagen");
          }
        }else{
          this.registro['imagen'] = data.generatedName;
          var data_login_img = JSON.parse(localStorage.getItem("data_login"));
          data_login_img.img = data.generatedName;
          localStorage.setItem("data_login",JSON.stringify(data_login_img));
        }
        this.uploadFile = data;
      }
    }

    fileOverBase(e:any):void {
      this.hasBaseDropZoneOver = e;
    }

    beforeUpload(uploadingFile): void {
      if (uploadingFile.size > this.sizeLimit) {
        uploadingFile.setAbort();
        alert('El archivo es muy grande');
      }

    }

/*##############################   Envio de pago   #############################*/

  uploadFilePago: any;
  postIdPago: number;
  sizeLimitPago = 5000000;
  formPago:string;
  submitPago: boolean;
  data_login_update: any;

 labelPagoSubmited: boolean = false;
 optionsPago: Object = {
   url: 'http://localhost/angularTutorial/angularLearn/registro/back/controller/registroController.php?foto=2',
   params: { 'post_id': this.userId['id'],
              'tipo': "",
              'estatus': "",
             'federacion': "",
             'noReferencia': ""}
 };
 /*
 *Al seleccionar un thubmnail setea el tipo cnep o Desarrollo integral
 */
 setTipoThumbnail(data){//'cnep' 'dint'
  this.optionsPago['params'].tipo = data;
 }
/*
*Setea los datos de la variable optionsPago para que pueda hacer el envio via post junto con el archivo PDF
*/
 setData(){
   this.optionsPago['params'].federacion = this.formaPago.controls['federacion'].value;

   this.optionsPago['params'].noReferencia = this.formaPago.controls['noReferencia'].value;
   let data_login_estatus = JSON.parse(localStorage.getItem("data_login"));
   this.optionsPago['params'].estatus = data_login_estatus.estatus;
   this.labelPagoSubmited = true;

 }
 /*
 *Limpua localStorage y regresa a home
 */
 logOut(){
   localStorage.clear();
   this.router.navigate(['/home']);
 }

 /*
 * Controla la subida del recibo de pago, asi como el retorno de informacion
 */
 handleUploadPago(data): void {

/*   this.formPago = this.formaPago.controls['fecha'].value;*/
   if (data && data.response) {
     data = JSON.parse(data.response);
     if(data.status == false){
       if(data.msg = "1"){
         alert("El archivo no es el formato correcto");
       }
     }else if(data.status == true){
        this.labelPagoSubmited = false; //el archivo se subio y se esconde
       this.registro['estatus'] = 1;
       this.data_login_update = JSON.parse(localStorage.getItem("data_login"));
       this.data_login_update.estatus = 1;
       this.data_login_update.tipo = data.tipo;
       this.registro['tipo'] = data.tipo;
       localStorage.setItem("data_login",JSON.stringify(this.data_login_update));

      //this.router.navigate(['/perfil', this.userId['id']]);
      this.closeBtn.nativeElement.click();
     }
     this.uploadFilePago = data;
   }
 }

enviarComentario(id_persona:number, comentario:string):void{
  if(comentario.trim() != "" && comentario.trim().length < 250 && comentario.trim().length >= 10 ){
    this.botonComentario = false;
    this.data_comentario["id_persona"] = id_persona;
    this.data_comentario["comentario"] = comentario.trim();
      this._AdministratorService.enviarComentario(this.data_comentario)
       .subscribe(data=>{
         if(data.status == true){
           this.comentarioSuccess = true;
           this.mensajeStatusEnvio = true;
           this.defaultValue = "";
           this.router.navigate(['/perfil', this.userId['id'] ]);

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

responderComentario(id_mensaje:number, comentario:string):void{
  if(comentario.trim() != "" && comentario.trim().length < 250 && comentario.trim().length >= 10 ){
    this.botonComentario = false;
    this.data_respuesta["id_mensaje"] = id_mensaje;
    this.data_respuesta["comentario"] = comentario.trim();
      this._AdministratorService.responderComentario(this.data_respuesta)
       .subscribe(data=>{
         if(data.status == true){
           this.comentarioSuccess = true;
           this.mensajeStatusEnvio = true;
           this.defaultValue = "";
           this.router.navigate(['/perfil', this.userId['id']]);

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
  /*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/
  constructor(private _registroService: RegistroService,private _AdministratorService: AdministratorService,
               private router:Router, private _activatedRoute:ActivatedRoute) {

       this._activatedRoute.params.subscribe((params: Params) => {
           this.userId['id'] = params['id'];
           this.options['data'].userId = params['id'];
           this.optionsPago['params'].post_id = params['id'];
           /*
           * Al iniciar sesion se asigna la informacion de localStorage al objeto registro
           * Para poder usar la informacion en pantalla
           */
            let login_data = JSON.parse( localStorage.getItem("data_login"));
            if(login_data){
              if(params['id'] == login_data.id_persona){
                this.options['data'].userId = params['id'];
                this.optionsPago['params'].post_id = params['id'];
                this.registro['nombre'] = login_data.nombre;
                this.registro['paterno'] = login_data.paterno;
                this.registro['materno'] = login_data.materno;
                this.registro['genero'] = login_data.genero;
                this.registro['username'] = login_data.usuario;
                this.registro['email'] = login_data.email;
                this.registro['telefono'] = login_data.telefono;
                this.registro['telefonoCel'] = login_data.telefono;
                this.registro['imagen'] = login_data.img;
                this.registro['estatus'] = login_data.estatus;
                this.registro['tipo'] = login_data.tipo;

                this._registroService.obtenerMensajes(params['id'])
                   .subscribe(data=>{
                     if(data.status == false){
                       this.noMensajes = true;
                     }else{
                       this.data_mensaje = data;
                       //OBTENER ULTIMO ID, PARA COLOCAR AHI EL TEXAREA
                       for(let count of data ){
                         this.countTotalMsgs++;
                       }

                       if(this.countTotalMsgs > 0){
                         this.lastIdMsg = this.data_mensaje[(this.countTotalMsgs-1)]["id_mensaje"];
                       }else{
                         this.noMensajes = true;
                       }
                      // alert(this.data_mensaje[(this.countTotalMsgs-1)]["id_mensaje"]);
                     }
                   },
                   error=> console.error(error));
              }else{
                this.router.navigate(['/home']);
              }
            }else{
              this.router.navigate(['/home']);
            }

              /* setear datos al objeto de pago */

         });

         /*
         *Controla el formulario del pago, para obtener la informacion y poder setearla en el objeto de la
         *subida de archivo pdf
         */
         this.formaPago = new FormGroup({
          /*   'fecha': new FormControl('', [Validators.required]),*/
             'pago': new FormControl('', [Validators.required]),
             'noReferencia': new FormControl('', [Validators.required, Validators.minLength(3)]),
             'federacion': new FormControl('', [Validators.minLength(3)]),
           });

  }
  filePago : FileList;
  filestring: string;
     getFilePago(event){
         this.filePago = event.target.files;
         var reader = new FileReader();
         reader.onload = this._handleReaderLoaded.bind(this);
         reader.readAsBinaryString(this.filePago[0]);
     }

     _handleReaderLoaded(readerEvt) {
         var binaryString = readerEvt.target.result;
         this.filestring = binaryString;  // Converting binary string data.
    }

  /*guardar(){
    console.log(this.filestring);
    this.pago['fecha'] = this.formaPago.controls['fecha'].value;
    this.pago['noReferencia'] = this.formaPago.controls['noReferencia'].value;
    this.pago['pago'] = this.filestring;
    this._pagoService.nuevoPago(this.pago)
     .subscribe(data=>{
      // this.router.navigate(['/perfil', data.id]);
    },
     error=> console.error(error));
  }*/



}
