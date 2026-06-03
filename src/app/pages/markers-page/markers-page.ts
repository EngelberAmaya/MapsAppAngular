import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.html',
  styleUrl: './markers-page.css',
})
export class MarkersPage implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);

  async ngAfterViewInit(){
    if (!this.divElement()?.nativeElement) return;

    const mapElement = this.divElement()?.nativeElement;

    const map = new mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: mapElement,
      center: [-69.388438, 10.088658],
      zoom: 14
    });

    const marker = new mapboxgl.Marker({
      color: 'red',
      draggable: false,
    })
    .setLngLat([-69.388438, 10.088658])
    .addTo(map);

    marker.on('dragend', (event) => {
      console.log(event);
    });

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {
    console.log(map);
  }
}
