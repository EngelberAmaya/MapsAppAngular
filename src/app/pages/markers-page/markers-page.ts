import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { environment } from '../../../environments/environment';
import { v4 as uuidv4 } from 'uuid';

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.html',
  styleUrl: './markers-page.css',
})
export class MarkersPage implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([]);

  async ngAfterViewInit(){
    if (!this.divElement()?.nativeElement) return;

    const mapElement = this.divElement()?.nativeElement;

    const map = new mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: mapElement,
      center: [-69.388438, 10.088658],
      zoom: 14
    });

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {

    map.on('click', (event) => this.mapClick(event));

    this.map.set(map);
  }

  mapClick(event: mapboxgl.MapMouseEvent) {

    if (!this.map()) return;

    const map = this.map()!;
    const coordinates = event.lngLat;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

     const mapboxMarker = new mapboxgl.Marker({
      color: color,
      draggable: false,
    })
    .setLngLat(coordinates)
    .addTo(map);

    const newMarker: Marker = {
      id: uuidv4(),
      mapboxMarker: mapboxMarker,
    };

    this.markers.set([newMarker, ...this.markers()]);

    console.log('markers', this.markers());
  }
}
