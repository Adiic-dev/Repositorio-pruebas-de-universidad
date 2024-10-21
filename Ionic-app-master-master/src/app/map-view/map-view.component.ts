import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map, Marker, Popup } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    // Coordenadas predeterminadas de Viña del Mar
    const defaultCoordinates: [number, number] = [-71.551, -33.0244];

    // Inicia el mapa
    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: defaultCoordinates,
      zoom: 13,
    });

    // Intentar obtener la ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoordinates: [number, number] = [
            position.coords.longitude,
            position.coords.latitude,
          ];

          // Centrar el mapa en la ubicación del usuario
          map.setCenter(userCoordinates);

          // Añadir un círculo en la ubicación del usuario
          map.on('load', () => {
            map.addLayer({
              id: 'user-location-circle',
              type: 'circle',
              source: {
                type: 'geojson',
                data: {
                  type: 'FeatureCollection',
                  features: [
                    {
                      type: 'Feature',
                      geometry: {
                        type: 'Point',
                        coordinates: userCoordinates,
                      },
                      properties: {},
                    },
                  ],
                },
              },
              paint: {
                'circle-radius': 50, // Radio del círculo (fijo)
                'circle-color': '#FF0000', // Color
                'circle-opacity': 0.6, // Opacidad
              },
            });
          });
        },
        (error) => {
          console.error('Error obteniendo la ubicación del usuario:', error);
          // Centrar el mapa en las coordenadas predeterminadas si hay un error
          map.setCenter(defaultCoordinates);
        }
      );
    } else {
      console.error('No es soportada por este navegador.');
      // Centrar el mapa en las coordenadas predeterminadas si geolocalización no está disponible
      map.setCenter(defaultCoordinates);
    }

    // Ubicaciones de caja vecia
    const cajasVecinas = [
      {
        name: 'Panaderia Katty',
        coordinates: [-71.53636679908482, -33.006163740103155] as [
          number,
          number
        ],
      },
      {
        name: 'Mi kioskito',
        coordinates: [-71.57058817980005, -33.02403876831767] as [
          number,
          number
        ],
      },

      {
        name: 'Bazar de los Estudiantes',
        coordinates: [-71.53339117712126, -33.03199775045686] as [
          number,
          number
        ],
      },
    ];

    // Añadir marcadores de cajas vecinas al mapa
    cajasVecinas.forEach((caja) => {
      const popup = new Popup({ offset: 25 })
        .setText(caja.name)
        .setHTML(
          `<div style="color: #FF0000; background-color: #fff; padding: 5px;">${caja.name}</div>`
        );

      new Marker().setLngLat(caja.coordinates).setPopup(popup).addTo(map);
    });

    // Opcional: Ajustar el tamaño del mapa al contenedor
    map.resize();
  }
}
