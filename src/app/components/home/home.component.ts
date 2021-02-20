import { Component} from '@angular/core';
import { NgFor } from '@angular/common';
import { Registro } from '../../interfaces/registro.interface';
import { Cedula } from '../../interfaces/cedula.interface';
import { RegistroService } from '../../services/registro.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Rx';


//formulario por data
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form){
      border: 1px solid red;
    }
  `]
})
export class HomeComponent {


  showLoginMessage: boolean = true;
  forma:FormGroup;
  formaLogin:FormGroup;
  passRepeated:boolean;
 private dataLogin:Object = {
   emailLogin:"",
   passwordLogin:""
 };
private asentamiento: any[] = [];
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
cedulaButtonIsEnabled = true;
cpButtonIsEnabled = true;
cedulaText = "Buscar cedula";
cpText = "Buscar código postal";
labelCedula = false;
labelCp:boolean = false;
labelEmail:boolean = true;
cedula_data:Cedula[] = [];
divThumbnails:boolean = false;
data_login:any;
private disableSavebutton:boolean = true;
  constructor( private _registroService: RegistroService,
               private router:Router) {
    this.data_login = JSON.parse(localStorage.getItem("data_login"));;

    if(this.data_login){
     if(this.data_login.id_persona > 0){
        this.router.navigate(['/perfil', this.data_login.id_persona]);
      }else{
        this.router.navigate(['/admin']);
      }
    }

     this.forma = new FormGroup({
         'cedula': new FormControl('', [Validators.pattern("[0-9]+")]),
         'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
         'paterno': new FormControl('', [Validators.required, Validators.minLength(3)]),
         'materno': new FormControl('', [Validators.required, Validators.minLength(3)]),
         'genero': new FormControl('', [Validators.required]),
      /*   'cedula': new FormArray([  new FormControl('', Validators.required)  ]),*/
         'username': new FormControl('', [Validators.required,  Validators.minLength(3)]),
         'passwordI': new FormControl('', [/*Validators.required,Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$"),*/ Validators.minLength(8)]),


         'passwordError': new FormControl('', [Validators.required, Validators.minLength(8)]),
         'email': new FormControl('', [
                                        Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
                                      ], this.existeUsuario.bind(this)),
         'telefono': new FormControl('', [Validators.pattern("[0-9]+")]),
         'telefonoCel': new FormControl('', [Validators.pattern("[0-9]+")]),

         'institucion': new FormControl('', /*[Validators.required, Validators.minLength(3)]*/),
         'titulo': new FormControl('', /*[Validators.required, Validators.minLength(3)]*/),
         'escuelactual': new FormControl('', [Validators.required, Validators.minLength(3)]),

         'cp': new FormControl('', [Validators.required, Validators.pattern("[0-9]+")]),
         'estado': new FormControl('', [Validators.required]),
         'municipio': new FormControl('', [Validators.required]),
         'asentamiento': new FormControl('', [Validators.required]),
         'calle': new FormControl('', [Validators.required]),
         'interior': new FormControl('', [Validators.pattern("[0-9]+")]),
         'exterior': new FormControl('', [Validators.pattern("[0-9]+")]),
       });
       this.forma.controls['asentamiento'].setValue(-1);
      this.forma.controls["passwordError"].setValidators([
                                              Validators.required,
                                              //this no existe por eso se tiene que hacer el bind del objeto
                                              this.noReapeated.bind( this.forma )
                                            ]);
      // this.forma.setValue( this.registro );
                //valueChanges regresa un observador
      /*this.forma.controls['nombre'].valueChanges
                        .subscribe( data=>{
                          console.log(data);
                        });*/

      /*###########################################################FORMULARIO PARA LOGIN#######################*/
      this.formaLogin = new FormGroup({

          'emailLogin': new FormControl('', [
                                         Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
                                       ]),
          'passwordLogin': new FormControl('', [Validators.required,/*Validators.pattern("/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/"),*/ Validators.minLength(8)]),

        });

  }

/*agregarCedula(){
  //primero verificar que exista
  (<FormArray>this.forma.controls['cedula']).push(
    new FormControl('', Validators.required)
  )
}*/



noReapeated( control: FormControl): { [s:string]:boolean } {
  //alert("asfdsad");
  let forma:any = this;
  if(control.value !== forma.controls["passwordI"].value){
    this.passRepeated = true;
    return{
      norepeated:true
    }
  }
  this.passRepeated = false;
  return null;
}
guardarLogin(){
  this.dataLogin["emailLogin"] = this.formaLogin.controls["emailLogin"].value;
  this.dataLogin["passwordLogin"] = this.formaLogin.controls["passwordLogin"].value;

  if(this.dataLogin["emailLogin"]  === "administr@campus-virtuales.com" && this.dataLogin["passwordLogin"] === "123456789"){
    this.router.navigate(['/admin']);
    let id_persona = {"id_persona":"cks433NdyjyabdXhADVoOUGSIPK4sDLpVH5IeCmUA0O8FRksdfwefgfqwe24PFe7j9U7Z7yPfe4K8kjtf8<zewaxCO"};
    localStorage.setItem("data_login", JSON.stringify(id_persona));
  }else{
    this._registroService.iniciarSesion(this.dataLogin)
     .subscribe(data=>{
       if(data.status == false){
         this.showLoginMessage  = false;
       }else{
         this.showLoginMessage  = true;
         localStorage.setItem("data_login", JSON.stringify(data));
         this.router.navigate(['/perfil', data.id_persona]);
       }


     },
     error=> console.error(error));
  }


}//fin de guardar()

  guardar( ){
    this.disableSavebutton = false;
    this.registro["cedula"] = this.forma.controls["cedula"].value;
    this.registro["nombre"] = this.forma.controls["nombre"].value;
    this.registro["paterno"] = this.forma.controls["paterno"].value;
    this.registro["materno"] = this.forma.controls["materno"].value;
    this.registro["genero"] = this.forma.controls["genero"].value;
    this.registro["username"] = this.forma.controls["username"].value;
    this.registro["passwordI"] = this.forma.controls["passwordI"].value;
    this.registro["passwordError"] = this.forma.controls["passwordError"].value;
    this.registro["email"] = this.forma.controls["email"].value;
    this.registro["telefono"] = this.forma.controls["telefono"].value;
    this.registro["telefonoCel"] = this.forma.controls["telefonoCel"].value;


    this.registro["institucion"] = this.forma.controls["institucion"].value;
    this.registro["titulo"] = this.forma.controls["titulo"].value;
    this.registro["escuelactual"] = this.forma.controls["escuelactual"].value;

    this.registro["cp"] = this.forma.controls["cp"].value;
    this.registro["estado"] = this.forma.controls["estado"].value;
    this.registro["municipio"] = this.forma.controls["municipio"].value;
    this.registro["asentamiento"] = this.forma.controls["asentamiento"].value;
    this.registro["calle"] = this.forma.controls["calle"].value;
    this.registro["interior"] = this.forma.controls["interior"].value;
    this.registro["exterior"] = this.forma.controls["exterior"].value;
    this.registro["img"] = "uploads/profile_default.png";


   //alert(this.registro["nombre"]);
  /* console.log(this.forma.value);
   console.log(this.forma);*/

/*   this.forma.reset({
     registro:{
       nombre:"",
       paterno:"",
       materno:"",
       cedula:"",
       email:""
     }
   });*/

   this._registroService.nuevoProfesor(this.registro)
    .subscribe(data=>{
      if(data.id !== 0){
        let data_user: Object ={
          id_persona: data.id,
           nombre: this.forma.controls["nombre"].value,
           paterno: this.forma.controls["paterno"].value,
           materno: this.forma.controls["materno"].value,
           usuario: this.forma.controls["username"].value,
           email: this.forma.controls["email"].value,
           telefono: this.forma.controls["telefono"].value,
           telefonoCel: this.forma.controls["telefonoCel"].value,
           img: "uploads/profile_default.png",
           estatus: 0,
           tipo: ""
        }
        localStorage.setItem("data_login", JSON.stringify(data_user));
        this.router.navigate(['/perfil', data.id]);
        this.disableSavebutton = true;
      }else{
        alert("Error al crear usuario");
      }

    },
    error=> console.error(error));


  }//fin de guardar()


  existeUsuario( control: FormControl ): Promise<any>|Observable<any>{
    let promesa = new Promise(( resolve, reject )=>{
        setTimeout(()=>{
          this._registroService.revisarEmail(control.value).subscribe(data=>{
            if(data.status == true){
              resolve(null);
              this.labelEmail = true;
            }else{
              this.labelEmail = false;
                  resolve( {existeUsuario:true } )
            }

        },
        error=> {
            alert("Hubo un error con tu correo");
            resolve(null);
          });

    },500);
      });
    return promesa;
  }
  /*existeUsuario( control: FormControl ): Promise<any>|Observable<any>{
    let promesa = new Promise(
      ( resolve, reject )=>{
        setTimeout(()=>{
          if(control.value === "shido@asd.com"){
            resolve( {existeUsuario:true} )
          }else{
            resolve( null )
          }
        },3000);
      });

    return promesa;
  }*/
  buscarCedula(){
    this.cedulaButtonIsEnabled = false;
    this.cedulaText = "Buscando...";
    this._registroService.getCedula(this.forma.controls['cedula'].value)
    .subscribe(data=>{
        if(data.status == false){
          this.labelCedula = true;
        }else{
          this.labelCedula = false;
          this.forma.controls['nombre'].setValue(data.nombre);
          this.forma.controls['paterno'].setValue(data.paterno);
          this.forma.controls['materno'].setValue(data.materno);
          this.forma.controls['genero'].setValue(data.genero);
          this.forma.controls['titulo'].setValue(data.titulo);
          this.forma.controls['institucion'].setValue(data.institucion);
        }

        this.cedulaButtonIsEnabled = true;
        this.cedulaText = "Buscar cedula";
  //    console.log(this.cedula_data["nombre"]);

    },
    error=> {
        alert("Hubo un error con su cedula");
        this.cedulaButtonIsEnabled = true;
        this.cedulaText = "Buscar cedula";
      });


  }//fin buscarCedula()
  buscarCP(){
    this.cpButtonIsEnabled = false;
    this.cpText = "Buscando...";
    this._registroService.getCP(this.forma.controls['cp'].value)
    .subscribe(data=>{
        if(data.status == false){
          this.labelCp = true;
        }else{
               this.formaLogin.reset({
                    registro:{
                      asentamiento:"",
                      estado:"",
                      municipio:"",
                    }
                  });
          this.labelCp = false;
          this.forma.controls['estado'].setValue(data[0].estado);
          this.forma.controls['municipio'].setValue(data[0].municipio);

          this.forma.controls['asentamiento'].setValue(-1);
          this.asentamiento = [];
          for(let i = 0; i <= data.length-1; ++i){
            this.asentamiento.push(data[i].asentamiento);
          }
        }
        if(data.status == 0){
          this.labelCp = true;
        }
        this.cpButtonIsEnabled = true;
        this.cpText = "Buscar Código Postal";
  //    console.log(this.cedula_data["nombre"]);

    },
    error=> {
        alert("Hubo un error con su Código postal");
        this.cpButtonIsEnabled = true;
        this.cpText = "Buscar Código Postal";
      });


  }//fin buscarCedula()

}
