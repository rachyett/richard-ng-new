import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';
// import { ScrollingModule } from '@angular/cdk/scrolling';


import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import 'hammerjs';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { TableDataComponent } from './tabledata/tabledata.component';
import { HttpClientModule } from '@angular/common/http';
import { ThemetableComponent } from './themetable/themetable.component';
import { ArtComponent } from './art/art.component';
import { DetailComponent } from './detail/detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HeaderService} from '../app/services/headertitle.service';
import { SignupComponent } from './user/signup/signup.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { SigninComponent } from './user/signin/signin.component';
import { SigninDialogComponent } from './user/signin/signindialog.component';
import { AuthService } from './user/auth.service';
import { AlertService } from '../app/services/alert.service';
import { AuthGuard } from './user/auth-guard.service';
import { MatVideoModule } from 'mat-video';
import { MessagesComponent } from './messages/messages.component';
import { SlideshowModule } from 'ng-simple-slideshow';
import { AboutComponent } from './about/about.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FooterComponent } from './navigation/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    SigninDialogComponent,
    TableDataComponent,
    ThemetableComponent,
    ArtComponent,
    DetailComponent,
    PageNotFoundComponent,
    SignupComponent,
    SigninComponent,
    MessagesComponent,
    AboutComponent,
    SlideshowComponent,
    FeedbackComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatVideoModule,
    MaterialModule,
    AppRoutingModule,
    SlideshowModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    PdfJsViewerModule,
   // ScrollingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA9vyEee1jJoSfm6Jc47CF3ikcha5xMSOY'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthService, HeaderService, AuthGuard, Title, AlertService ],
  bootstrap: [AppComponent],
  entryComponents: [SigninDialogComponent]
})
export class AppModule { }
