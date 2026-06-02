import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [],
  templateUrl: './fullscreen-map-page.html',
  styleUrl: './fullscreen-map-page.css',
})
export class FullscreenMapPage implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');

  async ngAfterViewInit() {

    if (!this.divElement()?.nativeElement) return;

    const mapElement = this.divElement()?.nativeElement;

    const map = new mapboxgl.Map({
      accessToken: environment.mapboxKey, // associates the map with your Mapbox account and its permissions
      container: mapElement, // container ID
      center: [-71.06776, 42.35816], // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: 9 // starting zoom
    });
  }
}
