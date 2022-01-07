import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { LogInComponent } from './components/log-in/log-in.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { NewComponent } from './components/new/new.component';
import { BookService } from './services/book.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ListComponent } from './components/list/list.component';
import { SeeComponent } from './components/see/see.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { HomeComponent } from './components/home/home.component';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LogInComponent,
    NewComponent,
    ListComponent,
    SeeComponent,
    DialogComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatMenuModule,
    MatDialogModule,
    MatTooltipModule,
    MatStepperModule,
    MatSelectModule,
    MatPaginatorModule,
    RouterModule.forRoot([
      {path: "log-in", component: LogInComponent},
      {path: "new", component: NewComponent, canActivate: [AuthGuardService]},
      {path: "new/:id", component: NewComponent, canActivate: [AuthGuardService]},
      {path: "list", component: ListComponent, canActivate: [AuthGuardService]},
      {path: "see/:id", component: SeeComponent, canActivate: [AuthGuardService]},
      {path: "", component: HomeComponent}
    ])
  ],
  providers: [
    AuthService,
    UserService,
    BookService,
    AuthGuardService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
