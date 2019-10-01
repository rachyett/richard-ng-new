import { Component, OnInit } from '@angular/core';
import {IImage} from '../datamodel';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {

  title = 'simple-slideshow';
    slideshowImagePath: string;
  //    this.localImagePath = environment.imagePath;


  imageUrls: (string | IImage)[] = [
    { url: 'assets/slideshow/7-slideshow.jpg', caption: 'River God' },
    { url: 'assets/slideshow/6-universityart-2.jpg', caption: 'Siren', href: 'https://www.apple.com/', backgroundPosition: 'middle' },
    { url: 'assets/slideshow/1-universityart-2.jpg', caption: 'Tyne Bridges', href: '/about' },
    { url: 'assets/slideshow/2-universityart-2.jpg', caption: 'St George\'s Jesmond' , clickAction: () => alert('custom click function') },
    // { url: 'assets/2-slideshow.jpg', caption: 'Newcastle\'s Parks', href: 'https://www.apple.com/', backgroundPosition: 'bottom' },
    { url: 'assets/slideshow/4-universityart-2.jpg', caption: 'University Quadrangle', href: '#config' },
    { url: 'assets/slideshow/5-universityart-2.jpg', caption: 'Tyne Bridge', clickAction: () => alert('custom click function') },
    { url: 'assets/slideshow/1-slideshow.jpg', caption: 'Look through any window',  backgroundPosition: 'middle' },
    { url: 'assets/slideshow/4-slideshow.jpg', caption: 'Lady Justice' },
    { url: 'assets/slideshow/8-slideshow.jpg', caption: 'Benton Bank Spring', backgroundPosition: 'bottom' },
    { url: 'assets/slideshow/5-slideshow.jpg', caption: 'Benton Bank Autumn', backgroundPosition: 'bottom' },
    { url: 'assets/slideshow/6-slideshow.jpg', caption: 'Whitley Bay Metro' }


    // { url: 'assets/3-slideshow.jpg', caption: 'Jesmond Dene', backgroundSize: 'contain', backgroundPosition: 'center' }
  ];

  height: string = '400px';
  minHeight: string;
  arrowSize: string = '30px';
  showArrows: boolean = true;
  disableSwiping: boolean = false;
  autoPlay: boolean = true;
  autoPlayInterval: number = 5333;
  stopAutoPlayOnSlide: boolean = true;
  debug: boolean = false;
  backgroundSize: string = 'cover';
  backgroundPosition: string = 'center center';
  backgroundRepeat: string = 'no-repeat';
  showDots: boolean = true;
  dotColor: string = '#FFF';
  showCaptions: boolean = true;
  captionColor: string = '#FFF';
  captionBackground: string = 'rgba(0, 0, 0, .35)';
  lazyLoad: boolean = false;
  hideOnNoSlides: boolean = false;
  width: string = '100%';
  fullscreen: boolean = false;
  enableZoom: boolean = false;
  enablePan: boolean = false;

  constructor() { }

  ngOnInit() {
    this.slideshowImagePath = environment.slideshowImagePath;
    console.log('help ' , this.slideshowImagePath);
  }

}
