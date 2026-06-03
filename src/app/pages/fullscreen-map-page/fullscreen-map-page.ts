import { AfterViewInit, Component, ElementRef, effect, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { environment } from '../../../environments/environment';
import { DecimalPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [DecimalPipe, JsonPipe ],
  templateUrl: './fullscreen-map-page.html',
  styleUrl: './fullscreen-map-page.css',
})
export class FullscreenMapPage implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  zoomLevel = signal(14);
  map = signal<mapboxgl.Map | null>(null);
  cordinates = signal({
    lng: -71.06776,
    lat: 42.35816,
  })

  zoomEffect = effect(() => {
    if (!this.map()) return;
    this.map()?.zoomTo(this.zoomLevel());
  });

  async ngAfterViewInit() {

    if (!this.divElement()?.nativeElement) return;

    const mapElement = this.divElement()?.nativeElement;
    const { lng, lat } = this.cordinates();

    const map = new mapboxgl.Map({
      accessToken: environment.mapboxKey, // associates the map with your Mapbox account and its permissions
      container: mapElement, // container ID
      center: [lng, lat], // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: this.zoomLevel() // starting zoom
    });

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {

    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoomLevel.set(newZoom);
    });

    map.on('moveend', () => {
      const center = map.getCenter();
      this.cordinates.set(center)
    });

    map.on('load', () => {
      console.log('map loaded');
    });

    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());

    this.map.set(map);

  }
}
