import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LibConfigService } from './granp-lib.module';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  private apiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
  http = inject(HttpClient);
  config = inject(LibConfigService);
  auth = inject(AuthService);

  getAddressLocation(address: string) {
    const url = `${this.apiUrl}/${encodeURIComponent(address)}.json?access_token=${this.config.mapboxAccessToken}`;

    return this.http.get(url);
  }

  getReverseGeocodeLocation(latitude: number, longitude: number) {
    const url = `${this.apiUrl}/${longitude},${latitude}.json?access_token=${this.config.mapboxAccessToken}`;

    return this.http.get(url);
  }
}
