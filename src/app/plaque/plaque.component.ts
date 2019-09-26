import { Component, OnInit, OnDestroy} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Post } from '../services/post.model';
import { DynamoService } from '../services/dynamo.service';
import { environment } from '../../environments/environment';

export interface Plaque {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-plaque',
  templateUrl: './plaque.component.html',
  styleUrls: ['./plaque.component.css']
})
export class PlaqueComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  fullImagePath: string;
  localImagePath: string;
  private errorSub: Subscription;
  searchStartUp = 'Local Hero Plaque';

  plaques: Plaque[] =[
    {value: 'Heaton Plaque', viewValue: 'Heaton'},
    {value: 'Gosforth Plaque', viewValue: 'Gosforth'},
    {value: 'Local Hero Plaque', viewValue: 'Quayside Local Hero'},
    {value: 'Newcastle Plaque', viewValue: 'Newcastle'}
  ];

  constructor(private http: HttpClient, private postsService: DynamoService) {
    this.localImagePath = environment.imagePath;
  }

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.isFetching = true;

    this.postsService.fetchResource(this.searchStartUp).subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
  }

  onFetchPosts(theme) {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchResource(theme).subscribe(
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
  }

 onHandleError() {
  this.error = null;
}

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

}
