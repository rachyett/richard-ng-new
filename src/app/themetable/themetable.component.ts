import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Post } from '../services/post.model';
import { Display } from '../services/display.model';
import { DropdownService } from '../services/dropdown.service';
import { DynamoService } from '../services/dynamo.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../environments/environment';
import { ConditionalExpr } from '@angular/compiler';
import { HostListener, EventEmitter, Output } from '@angular/core';
import { ToolbarService } from '../services/toolbar.service';


@Component({
  selector: 'app-themetable',
  templateUrl: './themetable.component.html',
  styleUrls: ['./themetable.component.css']
})
export class ThemetableComponent implements OnInit, OnDestroy {
  panel: {};
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  fullImagePath: string;
  localImagePath: string;
  dropdownLabel: string;
  private errorSub: Subscription;
  panelStartUp: string;
  selectedPost: Post;
  panelOpenState = true;
  id: string;
  themeParameter: string;
  taxonomys: Display[];
  theme: { name: string; resourcename: string; id: string };
  @Input() show = true;
  @Input() showMainContent = true;  // just added today thursday theinput decorator
  @Output() makeActive = new EventEmitter<boolean>();
    active: boolean;


    toggleActive() {
      if (this.active) {
          this.active = false;
      } else {
          this.active = true;
      }
      console.log('active status', this.active);
      this.makeActive.emit(this.active);
  }

  constructor(
    private http: HttpClient,
    private postsService: DynamoService,
    private router: Router,
    public route: ActivatedRoute,
    private dropdownService: DropdownService,
    public toolbarservice: ToolbarService
  ) {

    // router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationStart) {
    //   }

    //   if (event instanceof NavigationEnd) {
    //     // Hide loading indicator
    //     this.ngOnInit();
    //   }

    //   if (event instanceof NavigationError) {
    //     // Hide loading indicator

    //     // Present error to user
    //     console.log(event.error);
    //   }
    // });
    console.log('Called Constructor');
    this.route.queryParams.subscribe(params => {
      this.themeParameter = params.themepath;
      console.log(this.themeParameter);
    });
    this.panelStartUp = 'Jesmond Panel';
    this.localImagePath = environment.mediumImagePath;
  }

  ngOnInit() {
    // ngonInit only triggered once when the component is loaded
    this.theme = {
       /* runs when component is initialized i.e. the first time  */
      name: this.route.snapshot.params.name,  // themenames: panel, plaque, attraction, art
      resourcename: this.route.snapshot.params.resourcename, // start: can be any taxonomy within resource
      id: this.route.snapshot.params.id  // id: can be any record
    };
    this.route.params.subscribe((params: Params) => {
      this.theme.name = params.name;
      this.theme.resourcename = params.resourcename;
      this.theme.id = params.id;
       /* runs each time the path parameters change  */
      this.fetchFunction(this.theme.name, this.theme.resourcename);
      this.toolbarservice.show();
    });


    // this.getDropDown(this.theme.name); // theme type is the queryparameter not path
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    // this.isFetching = true;

    // this.postsService.fetchResource(this.panelStartUp).subscribe(
    //   posts => {
    //     this.isFetching = false;
    //     this.loadedPosts = posts;
    //   },
    //   error => {
    //     this.isFetching = false;
    //     this.error = error.message;
    //   }
    // );
  }

  onSelect(post: Post): void {
   // console.log('onSelect called');
    this.selectedPost = post;
  }

  togglePanel() {
    // this.panelOpenState = !this.panelOpenState ;
  }

  toggle() {
   // console.log('toggle');
    this.show = !this.show;
  }

  showToggle() {
    this.show = true;
  }

  onFetchPosts(themename, resourcename) {
    console.log('themename' + themename);
    console.log('resourcename' + resourcename);
    this.router.navigate(['/theme', themename, resourcename]);
  }
    // this.isFetching = true;
    // this.postsService.fetchResource(theme).subscribe(
    //   posts => {
    //     this.isFetching = false;
    //     this.loadedPosts = posts;
    //   },
    //   error => {
    //     this.isFetching = false;
    //     this.error = error.message;
    //     console.log(error);
    //   }
    // );
//

  // getDropDown(myTheme): void {
  //   // accepts myTheme as input where myTheme is the query path: art,panel,plaque,poi or random
  //   // sets one of four startup pictures hereafter known as 'panelStartup'
  //   // sets and populates the drop down list with the appropriate choices using the attraction service into 'resources'

  //   switch (myTheme) {
  //     case 'art': {
  //       console.log(myTheme);
  //       this.dropdownLabel = 'Art Resources';
  //       this.panelStartUp = 'Metro Art';
  //       this.dropdownService.getArtResources().subscribe(resources => {
  //         return (this.taxonomys = resources);
  //       });
  //       break;
  //     }
  //     case 'panel': {
  //       this.dropdownLabel = 'Panel Resources';
  //       this.panelStartUp = 'Jesmond Panel';
  //       this.dropdownService.getPanelResources().subscribe(resources => {
  //         return (this.taxonomys = resources);
  //       });
  //       break;
  //     }
  //     case 'poi': {
  //       console.log(myTheme);
  //       this.dropdownLabel = 'Type of Attraction';
  //       this.panelStartUp = 'Newcastle Mosaics';
  //       this.dropdownService.getAttractionResources().subscribe(resources => {
  //         return (this.taxonomys = resources);
  //       });
  //       break;
  //     }
  //     case 'plaque': {
  //       this.dropdownLabel = 'Plaque Resources';
  //       this.panelStartUp = 'Local Hero Plaque';
  //       this.dropdownService.getPlaqueResources().subscribe(resources => {
  //         return (this.taxonomys = resources);
  //       });
  //       break;
  //     }
  //     case 'random': {
  //       this.dropdownLabel = 'Random Heritage Area';
  //       this.panelStartUp = this.dropdownService.getStartSearch();
  //       this.dropdownService.getPanelResources().subscribe(resources => {
  //         return (this.taxonomys = resources);
  //       });
  //       break;
  //     }
  //     default: {
  //       this.dropdownLabel = 'Heritage Area';
  //       this.panelStartUp = 'Jesmond Panel';
  //       this.dropdownService.getPanelResources().subscribe(resources => {
  //         return (this.taxonomys = resources);
  //       });
  //       break;
  //     }
  //   }
  // }


  fetchFunction(startTheme: string, startQuery: string) {
    console.log('START QUERY is ' + startTheme + ' ' + startQuery);
    this.dropdownLabel = startQuery;
    this.postsService.fetchResource(this.theme.resourcename).subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
        console.log(error);
      }
    );

    switch (startTheme) {
      case 'art': {
        this.dropdownService.getArtResources().subscribe(resources => {
          return (this.taxonomys = resources);
        });
        break;
      }
      case 'attraction': {
       console.log('attraction');
       this.dropdownService.getAttractionResources().subscribe(resources => {
        return (this.taxonomys = resources);
      });
       break;
      }
      case 'panel': {
        this.dropdownService.getPanelResources().subscribe(resources => {
          return (this.taxonomys = resources);
        });
        console.log('panel');
        break;
       }
       case 'plaque': {
        console.log('plaque');
        this.dropdownService.getPlaqueResources().subscribe(resources => {
          return (this.taxonomys = resources);
        });
        break;
       }
       case 'park': {
        console.log('parks');
        this.dropdownService.getParkResources().subscribe(resources => {
          return (this.taxonomys = resources);
        });
        break;
       }
    }
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
    this.ShowHideButton();
  }


  ShowHideButton() {
    console.log('showhidebutton');
    this.showMainContent = this.showMainContent ? false : true;
  }
  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
