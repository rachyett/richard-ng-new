import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Display } from './display.model';
import {
  startSearch,
  ARTSRESOURCES,
  PLAQUESRESOURCES,
  ATTRACTIONSRESOURCES,
  PANELSRESOURCES,
  TOPTHEME,
  TOPLOCATIONS,
  BOTTOMTHEME,
  PARKRESOURCES
} from './display-data';


@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor() { }
  getBottomTheme(): Observable<Display[]> {
    // TODO: send the message _after_ fetching the heroes
    return of(BOTTOMTHEME);
  }
  getTopTheme(): Observable<Display[]> {
    // TODO: send the message _after_ fetching the heroes
    return of(TOPTHEME);
  }
  getTopLocations(): Observable<Display[]> {
    // TODO: send the message _after_ fetching the heroes
    return of(TOPLOCATIONS);
  }
  getArtResources(): Observable<Display[]> {
    // TODO: send the message _after_ fetching the heroes
    return of(ARTSRESOURCES);
  }

  getPlaqueResources(): Observable<Display[]> {
    // TODO: send the message _after_ fetching the heroes
    return of(PLAQUESRESOURCES);
  }

  getAttractionResources(): Observable<Display[]> {
    // TODO: send the message _after_ fetching the heroes
    return of(ATTRACTIONSRESOURCES);
  }

  getPanelResources(): Observable<Display[]> {
    // TODO: send the message _after_ fetching the heroes
    return of(PANELSRESOURCES);
  }

  getParkResources(): Observable<Display[]> {
    // TODO: send the message _after_ fetching the heroes
    return of(PARKRESOURCES);
  }

  getStartSearch() {
    // TODO: send the message _after_ fetching the heroes
   return startSearch[Math.floor(Math.random() * startSearch.length)];
  }

  getRandomTopTheme() {
   return TOPTHEME[Math.floor(Math.random() * TOPTHEME.length)].value;
  }
  getRandomThemeType() {
    return BOTTOMTHEME[Math.floor(Math.random() * BOTTOMTHEME.length)].value;
   }
}

