import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { TableDataComponent } from './tabledata/tabledata.component';
import { ThemetableComponent } from './themetable/themetable.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './user/signup/signup.component';
import { SigninComponent } from './user/signin/signin.component';
import { AboutComponent } from './about/about.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { AuthGuard } from './user/auth-guard.service';

const routes: Routes = [
  { path: 'home', component: WelcomeComponent},
  { path: 'about', component: AboutComponent },
  { path: 'slideshow', component: SlideshowComponent},
  { path: 'search', redirectTo: '/tabledata/theme_type/art deco', pathMatch: 'full'},
  // { path: 'theme/park/Exhibition Park', redirectTo: '/theme/park/Exhibition Park Panel', pathMatch: 'full' },
  // { path: 'theme/:name', component: ThemetableComponent },
  // { path: 'theme', component: ThemetableComponent },
  { path: 'theme/:name/:resourcename', component: ThemetableComponent },
  // { path: 'theme/:resourcename/:id', component: ThemetableComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'theme/:name/:id', component: ThemetableComponent },
  { path: 'video', redirectTo: 'theme/attraction/Video', pathMatch: 'full' },
  { path: 'tabledata', canActivate: [AuthGuard], component: TableDataComponent },
  { path: 'tabledata/:table', canActivate: [AuthGuard], component: TableDataComponent },
  { path: 'tabledata/:table/:start', canActivate: [AuthGuard], component: TableDataComponent },
  // { path: '', redirectTo: 'theme/attraction/ArtDeco Building', pathMatch: 'full' },
  { path: 'not-found', component: PageNotFoundComponent },
  // { path: '**', redirectTo: '/not-found' }
  { path: '**', redirectTo: 'theme/attraction/ArtDeco Building', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
