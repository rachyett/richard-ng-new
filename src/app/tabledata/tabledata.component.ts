import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  Input
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Post } from '../services/post.model';
import { Display } from '../services/display.model';
import { DynamoService } from '../services/dynamo.service';
import { DropdownService } from '../services/dropdown.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../environments/environment';
import { HeaderService } from '../services/headertitle.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HostListener } from '@angular/core';



@Component({
  selector: 'app-tabledata',
  templateUrl: './tabledata.component.html',
  styleUrls: ['./tabledata.component.css']
})
export class TableDataComponent implements OnInit, OnDestroy, AfterViewInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  fullImagePath: string;
  localImagePath: string;
  themeTypeStartUp: string;
  private errorSub: Subscription;
  table: { tablename: string; start: string };
  selectedPost: Post;
  displayedColumns = [];
  taxonomys: Display[];
  dropdownLabel: string;
  @Input() dataSource = new MatTableDataSource<Post>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  columnDefinitions = [];
  mobileColumnDefinitions = [];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  showMainContent = true;


  constructor(
    private http: HttpClient,
    private postsService: DynamoService,
    private router: Router,
    private route: ActivatedRoute,
    private dropdownService: DropdownService,
    private breakpointObserver: BreakpointObserver,
    private headerService: HeaderService
  ) {
    this.localImagePath = environment.smallImagePath;
    this.themeTypeStartUp = 'themeTypeStartUp';
    const mobileColumnDefinitions = [
      { def: 'title', showMobile: true },
      { def: 'abstract', showMobile: false },
      { def: 'image', showMobile: true },
      { def: 'theme', showMobile: false },
      { def: 'neighbourhood', showMobile: false },
      { def: 'resource', showMobile: false },
    ];

    const columnDefinitions = [
      { def: 'title', showMobile: true },
      { def: 'abstract', showMobile: true },
      { def: 'image', showMobile: true },
      { def: 'theme', showMobile: true },
      { def: 'neighbourhood', showMobile: true },
      { def: 'resource', showMobile: true },
    ];
  }

  ngOnInit() {
    this.headerService.setTheTitle('Under Construction');
    this.route.queryParams.subscribe();
    this.table = {
      /* runs when component is infirst time  */
      tablename: this.route.snapshot.params.table,  // tablenames: location, theme, theme_type, resource
      start: this.route.snapshot.params.start // start: can be any taxonomy within :- location, theme, theme_type, resource
    };
    this.route.params.subscribe((params: Params) => {
      this.table.tablename = params.table;
      this.table.start = params.start;
      /* runs each time the path parameters change  */
      this.fetchFunction(this.table.tablename, this.table.start);
    });

    /* runs when the component is first loaded */
    this.postsService.fetchThemeType(this.themeTypeStartUp).subscribe(
      posts => {
        this.isFetching = false;
        this.dataSource.data = posts;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    this.isFetching = true;
  }

  onFetchPosts(tableName, resourceName) {
    this.router.navigate(['/tabledata', tableName, resourceName]);
  }

  onHandleError() {
    this.error = null;
  }
  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
}


  fetchFunction(startTable: string, startQuery: string) {
    console.log('START QUERY is ' + startTable + ' ' + startQuery);

    switch (startTable) {
      case 'resource': {
        // this.dropdownLabel = 'Resource';
        this.dropdownLabel = startQuery;
        this.displayedColumns = [
          'image',
          'title',
          'resource'
        ];
        //    console.log('resource');
        this.postsService.fetchResource(this.table.start).subscribe(
          posts => {
            this.isFetching = false;
            this.dataSource.data = posts;
          },
          error => {
            this.isFetching = false;
            this.error = error.message;
          }
        );
        this.dropdownService.getArtResources().subscribe(resources => {
          return (this.taxonomys = resources);
        });

        break;
      }
      case 'location': {
        // this.dropdownLabel = 'Neighbourhood';
        this.dropdownLabel = startQuery;
        this.displayedColumns = [
          'image',
          'neighbourhood',
          'title',
        ];
        //   console.log('location');
        this.postsService.fetchLocation(this.table.start).subscribe(
          posts => {
            this.isFetching = false;
            this.dataSource.data = posts;
          },
          error => {
            this.isFetching = false;
            this.error = error.message;
          }
        );
        this.dropdownService.getTopLocations().subscribe(resources => {
          return (this.taxonomys = resources);
        });
        break;
      }
      case 'theme': {
        //  this.dropdownLabel = 'Theme';
        this.displayedColumns = [
          'image',
          'title',
          'theme'
        ];
        const startSearch = this.table.start
          ? this.table.start
          : this.dropdownService.getRandomTopTheme();
        this.dropdownLabel = startSearch;
        this.postsService.fetchTheme(startSearch).subscribe(
          posts => {
            this.isFetching = false;
            this.dataSource.data = posts;
          },
          error => {
            this.isFetching = false;
            this.error = error.message;
          }
        );
        this.dropdownService.getTopTheme().subscribe(resources => {
          return (this.taxonomys = resources);
        });
        break;
      }
      case 'theme_type': {
        //  this.dropdownLabel = 'Theme Type'; /* works */
        this.displayedColumns = [
          'image',
          'title'
        ];
        const startSearch = this.table.start
          ? this.table.start
          : this.dropdownService.getRandomThemeType();
        this.dropdownLabel = startSearch;
        this.postsService.fetchThemeType(startSearch).subscribe(
          posts => {
            this.isFetching = false;
            this.dataSource.data = posts;
          },
          error => {
            this.isFetching = false;
            this.error = error.message;
          }
        );
        this.dropdownService.getBottomTheme().subscribe(resources => {
          return (this.taxonomys = resources);
        });
        break;
      }
      default: {
        console.log('default');
        // this.postsService.fetchResource(this.resourceStartUp).subscribe(        /* works */
        break;
      }
    }

    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    this.isFetching = true;
  }

  getRecord(row) {
    console.log('Row clicked: ', this.selectedPost);
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
  }

  get isMobile() {
    return this.breakpointObserver.isMatched('(max-width: 767px)');
  }

  getDisplayedColumns(): string[] {
  //   const isMobile = this.currentDisplay === 'mobile';
  //   return this.columnDefinitions
  //     .filter(cd => !isMobile || cd.showMobile)
  //     .map(cd => cd.def);
// https://stackblitz.com/edit/cdk-breakpoint-observer-so?file=app%2Fhome%2Fhome.component.html

    if (this.isMobile) {
          return [
            'image',
            'title'
          ];
    } else {
      return [
        'image',
        'title',
        'abstract',
        'resource'

      ];

    }
}

ShowHideButton() {
  this.showMainContent = this.showMainContent ? false : true;
}

@HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
    this.ShowHideButton();
  }


}
