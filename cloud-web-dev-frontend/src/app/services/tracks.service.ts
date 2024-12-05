import { Injectable } from '@angular/core';
import { Track } from '../interfaces/track';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  constructor(private http: HttpClient) {}

  public getAllTracks(): Observable<Array<Track>> {
    return this.http.get<Array<Track>>('http://localhost:3040/');
  }
}
