import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  getCurrentPosition(): Observable<any> {
    return new Observable((observer) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      } else {
        observer.error('Geolocation is not available in this browser.');
      }
    });
  }

  apiKey = 'AIzaSyAJ0UiyZ42ojmfHCvTltXjy3tT8j9H9Zkw';

  // Adresi latitude ve longitude'a dönüştüren fonksiyon
  async getCoordinates(address: string): Promise<any[]> {
    let encode = encodeURIComponent(address);
    const response = await fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        encode +
        '&key=' +
        this.apiKey
    );
    const data = await response.json();
    let locationCordinates: any[] = [];
    if (data.status === 'OK') {
      const location = data.results[0].geometry.location;

      console.log('lat: ' + location.lat + 'lng:' + location.lng);
      locationCordinates.push(location.lat);
      locationCordinates.push(location.lng);
      console.log(locationCordinates);

      return locationCordinates;
    } else {
      return locationCordinates;
    }
  }
}
