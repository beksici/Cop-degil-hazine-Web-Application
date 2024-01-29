import { Component, Input, OnInit } from '@angular/core';
import { GeolocationService } from '../services/geolocation.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-treasures',
  templateUrl: './treasures.component.html',
  styleUrl: './treasures.component.css',
})
export class TreasuresComponent implements OnInit {
  position = { lat: 39.925533, lng: 32.866287 };
  error: string = '';
  lat: number;
  lng: number;
  mapOptions: google.maps.MapOptions;

  marker: {
    position: { lat: number; lng: number };
  };

  products: Product[] = [];
  markers: Marker[] = [];
  markersLink: string = 'https://www.google.com/maps/dir/';
  label: {
    color: 'blue';
    text: 'You';
  };
  title: string = 'You';
  locationNotAllowed: number = 0;
  // @Input() latitude = '';
  // @Input() Longitude = '';
  constructor(
    private geolocationService: GeolocationService,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    //this.getGeoLocation();
    // this.lat = parseFloat(this.latitude);
    // this.lng = parseFloat(this.Longitude);
    // console.log(this.lat);
    // console.log(this.lng);
    this.getLocation();
    this.getAllTreasures();
  }
  showClicked() {
    document.getElementById('treasuresLink')?.click();
  }
  getLocation() {
    this.geolocationService.getCurrentPosition().subscribe({
      next: (position) => {
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.mapOptions = {
          center: { ...this.position, lat: this.lat, lng: this.lng },
          zoom: 6,
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
        this.error = 'Lütfen Konum Erişimine İzin Verin ve Tekrar Deneyin';
        this.locationNotAllowed++;
        if (this.locationNotAllowed == 3) {
          return;
        } else {
          this.getLocation();
          return;
        }

        // console.error('Error getting geolocation:', error);
      },
    });
  }

  getAllTreasures() {
    this.productService.getProductsAll().subscribe((data) => {
      this.products = data;
      this.clearNotActiveProducts();
      for (let product of this.products) {
        let marker: Marker = {
          position: { lat: 0, lng: 0 },
          title: '',
          label: '',
        };
        marker.position.lat = parseFloat(product.latitude);
        marker.position.lng = parseFloat(product.longitude);
        marker.title = product.adNo;
        marker.label = product.adNo;
        this.markers.push(marker);
        // this.markersLink +=
        //   marker.position.lat + ',' + marker.position.lng + '+';
      }
      // this.markersLink += this.lat + ',' + this.lng;
      console.log(this.markers);

      //tüm ürünler şuan burada
      // burada kaldın !!!!!!!!!
      // !!!!!!!!! burada tüm katagoriler seçildiği için ürün bazında filtreleme yapıp tekrar ürün içine atıcaz
      // this.categoryService.getCategories().subscribe((data) => {
      //   this.categories = data;
      //   for (let categoryy of this.categories) {
      //     this.allCategoriesParam += categoryy.id + '~';
      //   }
      //   environment.categoryId = this.allCategoriesParam;
      //   console.log(environment.categoryId);
      // });
    });
  }
  clearNotActiveProducts(): boolean {
    this.products = this.products.filter((p) => p.isActive == true);
    return true;
  }
  markerClicked(event: any, marker: any) {
    let currentMarkerLink = this.markersLink;
    if (this.lat != marker.position.lat && this.lng != marker.position.lng) {
      currentMarkerLink +=
        this.lat +
        ',' +
        this.lng +
        '/' +
        marker.position.lat +
        ',' +
        marker.position.lng;
      //console.log('Event:', event);
      let link = document.getElementById('treasuresLink');
      link?.setAttribute('href', currentMarkerLink);
      link?.click();
    }
  }
}
interface Marker {
  position: { lat: number; lng: number };
  title: string;
  label: string;
}
