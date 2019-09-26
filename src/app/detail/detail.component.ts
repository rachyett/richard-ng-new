import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from '../services/post.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  @Input() post: Post;
  isFetching = false;
  error = null;
  fullImagePath: string;
  zoom: number;
  localImagePath: string;
  pid: string;
  lat: number;
  lng: number;


  constructor(private route: ActivatedRoute , private router: Router ) {

    this.localImagePath = environment.largeImagePath;
    this.pid = this.route.snapshot.params.pid;


  }
  navigateToOrders() {
    this.router.navigate(['theme', this.pid], { relativeTo: this.route.parent })
  }
  ngOnInit() {
    this.lat = parseFloat(this.post.lat);
    this.lng = parseFloat(this.post.lg);
    this.zoom = 18;
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    console.log('closed DetailComponent');
  }
}
