import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { GeolocationService } from '../../../services/geolocation.service';
@Component({
  selector: 'location',
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent implements OnInit {
  position = { lat: 38.9987208, lng: -77.2538699 };
  lat: number;
  lng: number;
  mapOptions: google.maps.MapOptions;
  marker: {
    position: { lat: number; lng: number };
  };

  @Input() latitude = '';
  @Input() Longitude = '';
  constructor(private geolocationService: GeolocationService) {}
  ngOnInit(): void {
    //this.getGeoLocation();
    this.lat = parseFloat(this.latitude);
    this.lng = parseFloat(this.Longitude);
    console.log(this.lat);
    console.log(this.lng);

    this.mapOptions = {
      center: { ...this.position, lat: this.lat, lng: this.lng },
      zoom: 14,
      // disableDefaultUI: true,
      // zoomControl: false,
      // mapTypeControl: false,
      // streetViewControl: false,
      // fullscreenControl: false,
    };
    this.marker = {
      position: {
        ...this.position,
        lat: this.lat,
        lng: this.lng,
      },
    };

    document.getElementById('showmyloc')?.addEventListener('click', () => {
      document.getElementById('link')?.click();
    });
  }

  getGeoLocation() {
    this.geolocationService.getCurrentPosition().subscribe({
      next: (position) => {
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.mapOptions = {
          center: { ...this.position, lat: this.lat, lng: this.lng },
          zoom: 14,
          // disableDefaultUI: true,
          // zoomControl: false,
          // mapTypeControl: false,
          // streetViewControl: false,
          // fullscreenControl: false,
        };
        this.marker = {
          position: {
            ...this.position,
            lat: this.lat,
            lng: this.lng,
          },
        };
      },
      error: (error) => {
        console.error('Error getting geolocation:', error);
      },
    });

    document.getElementById('showmyloc')?.addEventListener('click', () => {
      document.getElementById('link')?.click();
    });
  }

  // ngOnInit(): void {
  //   document
  //     .querySelector('.my-google-map')
  //     ?.addEventListener('click', function () {
  //       document.getElementById('link')?.click();
  //     });

  //   document.getElementById('showmyloc')?.addEventListener('click', () => {
  //     navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
  //   });
  // }
  // onError(err: any) {
  //   console.log(err);
  // }

  // onSuccess(position: any) {
  //   let lat = position.coords.latitude;
  //   let lng = position.coords.longitude;
  //   this.position.lat = lat;
  //   this.position.lng = lng;
  //   // api, google, opencagedata
  //   console.log(lat, lng);
  // }
  // display: any; // Property to store latitude and longitude data from the map
  // center: google.maps.LatLngLiteral = {
  //   // Initial center coordinates for the map
  //   lat: 31.51679331043587,
  //   lng: 74.35149289364826,
  // };
  // zoom = 4; // Initial zoom level for the map
  // move(event: google.maps.MapMouseEvent) {
  //   // Method to handle map click event and update the display property
  //   if (event.latLng != null) {
  //     this.display = event.latLng.toJSON();
  //   }
  // }
}
