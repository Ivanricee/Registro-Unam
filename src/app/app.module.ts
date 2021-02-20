import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2UploaderModule } from 'ng2-uploader';
import { ZoomableDirective } from 'ng2-zoomable';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

import { Ng2FilterPipeModule } from 'ng2-filter-pipe';

import {DataTableModule} from "angular2-datatable";
/*import { FileUploadModule } from 'ng2-file-upload';*/
/*import { DragUploadInput } from './file-upload/drag-upload-input.component';*/
import {UPLOAD_DIRECTIVES} from 'ng2-file-uploader/ng2-file-uploader';

//Rutas
import { app_routing } from './app.routes';

//Servicios
import { RegistroService } from './services/registro.service';
import { AdministratorService } from './services/administrator.service';


//Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/adicional/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { ImageZoomComponent } from './components/image-zoom/image-zoom.component';
import { MoveBackgroundDirective } from './move-background.directive';
import { SafePipe } from './pipes/safe.pipe';
import { InputTrimDirective } from 'ng2-trim-directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PerfilComponent,
    UPLOAD_DIRECTIVES,
    AdministratorComponent,
    ZoomableDirective,
    ImageZoomComponent,
    MoveBackgroundDirective,
    PdfViewerComponent,
    SafePipe,
    InputTrimDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    app_routing,
    ReactiveFormsModule,
    Ng2UploaderModule,
    DataTableModule,
    Ng2FilterPipeModule,
  /*  FileUploadModule*/
  ],
  providers: [
    RegistroService,
    AdministratorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
