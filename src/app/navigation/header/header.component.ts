import { Component, OnInit, EventEmitter, Output, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { HeaderService } from '../../services/headertitle.service';
import { AuthService } from '../../user/auth.service';
import { ToolbarService } from '../../services/toolbar.service';

import { ThemetableComponent } from 'src/app/themetable/themetable.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 isAuthenticated = false;
@Output()  sidenavToggle = new EventEmitter<void>();
@Output()  clickToolbar = new EventEmitter<void>();

  constructor(private headerservice: HeaderService, private router: Router,
              private titleService: Title, private authService: AuthService, public toolbarservice: ToolbarService) {
  }

   public setTitle( newTitle: string) {
     console.log('settitle invoked ', newTitle) ;
     this.titleService.setTitle( newTitle );
  }


  ngOnInit() {
    this.authService.authStatusChanged.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
        if (authenticated) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/']);
        }
      }
    );
    this.authService.initAuth();
  }
  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLoadTable() {
  }

  setTheTitle(someTitle) {
    this.headerservice.setTheTitle(someTitle);
  }

  onClickToolbar() {
    this.clickToolbar.emit();
    console.log('Toolbar clicked');
  }

  onMouseOver() {
console.log('mouse over event');
  }

  @HostListener('mouseenter') onMouseEnter() {
  //  alert('if visible hide detail component');
  }


  onLogout() {
    this.authService.logout();
  }
}
