import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.html',
  styleUrl: './mini-map.css',
})
export class MiniMap implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  lngLat = input.required<{lng: number, lat: number}>();
  zoom = input<number>(14);

  ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    const mapElement = this.divElement()?.nativeElement;

    const map = new mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: mapElement,
      center: this.lngLat(),
      zoom: this.zoom(),
      interactive: false,
      pitch: 30
    });

    new mapboxgl.Marker().setLngLat(this.lngLat()).addTo(map);

  }

}
