import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class DynamoService {
  error = new Subject<string>();
  constructor(private http: HttpClient) {}
  statusUpdated = new EventEmitter<string>();

  fetchResource(theResource: string) {
    // fetches all resources based on resource name for example 'Jesmond Panel'
    let searchParams = new HttpParams();
    searchParams = searchParams.append('resource', theResource);

    return this.http
      .get<{ [key: string]: Post }>(
        'https://xyzcnzpgfb.execute-api.us-east-1.amazonaws.com/prod/route',
        {
          params: searchParams
        }
      )
      .pipe(
        map(responseData => {
          console.log(responseData);
          const postsArray: Post[] = [];
          console.log(responseData);
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key] });
            }
          }
          postsArray.sort(function(a, b) {
            const keyA = a.rank;
            const keyB = b.rank;
            // Compare the 2 dates
            if (keyA < keyB) {
              return -1;
            }
            if (keyA > keyB) {
              return 1;
            }
            return 0;
          });
          return postsArray;
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }

  fetchTheme(theTheme: string) {
    // fetches all resources based on resource name for example 'Jesmond Panel'
    let searchParams = new HttpParams();
    searchParams = searchParams.append('theme', theTheme);

    return this.http
      .get<{ [key: string]: Post }>(
        'https://xyzcnzpgfb.execute-api.us-east-1.amazonaws.com/prod/theme',
        {
          params: searchParams
        }
      )
      .pipe(
        map(responseData => {
          console.log(responseData);
          const postsArray: Post[] = [];
          console.log(responseData);
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key] });
            }
          }
          postsArray.sort(function(a, b) {
            const keyA = a.theme_type;
            const keyB = b.theme_type;
            // Compare the 2 dates
            if (keyA < keyB) {
              return -1;
            }
            if (keyA > keyB) {
              return 1;
            }
            return 0;
          });
          return postsArray;
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }


  fetchThemeType(theThemeType: string) {
    // untested fetches all resources based on theme type for example 'Coastal Heritage Panel'
    let searchParams = new HttpParams();
    searchParams = searchParams.append('themetype', theThemeType);

    return this.http
      .get<{ [key: string]: Post }>(
        'https://xyzcnzpgfb.execute-api.us-east-1.amazonaws.com/prod/themetype',
        {
          params: searchParams
        }
      )
      .pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key] });
            }
          }
          postsArray.sort(function(a, b) {
            const keyA = a.title;
            const keyB = b.title;
            // Compare the 2 dates
            if (keyA < keyB) {
              return -1;
            }
            if (keyA > keyB) {
              return 1;
            }
            return 0;
          });
          return postsArray;
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }

  fetchLocation(theNeighbourhood: string) {
    // untested fetches all resources based on theme type for example 'Coastal Heritage Panel'
    let searchParams = new HttpParams();
    searchParams = searchParams.append('neighbourhood', theNeighbourhood);

    return this.http
      .get<{ [key: string]: Post }>(
        'https://xyzcnzpgfb.execute-api.us-east-1.amazonaws.com/prod/location',
        {
          params: searchParams
        }
      )
      .pipe(
        map(responseData => {
          console.log(responseData);
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key] });
            }
          }
          postsArray.sort(function(a, b) {
            const keyA = a.title;
            const keyB = b.title;
            // Compare the 2 dates
            if (keyA < keyB) {
              return -1;
            }
            if (keyA > keyB) {
              return 1;
            }
            return 0;
          });
          return postsArray;
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }

  fetchOnePost(thePID: string) {
    // fetches a single resources based on resource ID PID for example 'p00073'
    let searchParams = new HttpParams();
    searchParams = searchParams.append('pid', thePID);

    return this.http
      .get<{ [key: string]: Post }>(
        'https://xyzcnzpgfb.execute-api.us-east-1.amazonaws.com/prod/poi',
        {
          params: searchParams
        }
      )
      .pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key] });
            }
          }
          return postsArray;
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }
}
