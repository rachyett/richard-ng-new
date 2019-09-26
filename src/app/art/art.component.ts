import { Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { Post } from '../services/post.model';
import { Display } from '../services/display.model';
import { DropdownService } from '../services/dropdown.service';
import { DynamoService } from '../services/dynamo.service';
import { environment } from '../../environments/environment';



@Component({
  selector: 'app-art',
  templateUrl: './art.component.html',
  styleUrls: ['./art.component.css'],
  encapsulation: ViewEncapsulation.None,
 // changeDetection: ChangeDetectionStrategy.onFetchPosts
})
export class ArtComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  fullImagePath: string;
  localImagePath: string;
  private errorSub: Subscription;
  searchStartUp = 'Metro Art';
  selectedPost: Post;
  themes: Display[] ;
  items = Array.from({length: 100}).map((_, i) => `Item #${i}`);


  constructor( private http: HttpClient, private postsService: DynamoService, private dropdownService: DropdownService) {
    this.localImagePath = environment.imagePath;
   }

   ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    this.getTheme();
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


  onSelect(post: Post): void {
    this.selectedPost = post;
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

getTheme(): void {
  // id to dictate which returned function
  this.dropdownService.getArtResources()
      .subscribe(themes => this.themes = themes);
}

 tabClick(tab) {
  console.log(tab);
}

 onHandleError() {
  this.error = null;
}

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

}
