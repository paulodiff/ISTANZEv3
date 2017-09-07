import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Photo } from '../models/photo';
import 'rxjs/add/operator/map'

// import { AuthenticationService } from '../_services/authentication.service';
// import { User } from '../_models/user';

@Injectable()
export class PhotosService {
    constructor(
        private http: Http  ) {
    }

    getAllPhotosObservable(): Observable<Photo[]> {
        // add authorization header with jwt token
        // let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        // let options = new RequestOptions({ headers: headers });
        console.log('PhotosService.getAllPhotosObservable');
        let options = new RequestOptions({ headers: this.getHeaders() });

        // get users from api
        return this.http.get('https://jsonplaceholder.typicode.com/photos', options)
            // .map((response: Response) => response.json())
            .map(this.parseData)
            .catch(this.handleErrorObservable);
    }

    getAllUsersObservable(): Observable<any[]> {
        // add authorization header with jwt token
        // let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        // let options = new RequestOptions({ headers: headers });
        console.log('PhotosService.getAllPhotosObservable');
        let options = new RequestOptions({ headers: this.getHeaders() });

        // get users from api
        return this.http.get('http://localhost:9988/phone/getData', options)
            // .map((response: Response) => response.json())
            .map(this.parseData)
            .catch(this.handleErrorObservable);
    }


    getPhoneDataObservable( model: any): Observable<any[]> {
        // add authorization header with jwt token
        // let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        // let options = new RequestOptions({ headers: headers });
        console.log('PhotosService.getPhoneDataObservable', model);
        let options = new RequestOptions({ headers: this.getHeaders(), params : model });

        // get users from api
        return this.http.get('http://localhost:9988/phone/getData', options)
            // .map((response: Response) => response.json())
            .map(this.parseData)
            .catch(this.handleErrorObservable);
    }

    // This method parses the data to JSON
    private parseData(res: Response)  {
        // console.log('--parseData ---');
        // console.log(res.json());
        return res.json() || [];
    }

    getAllPhotosPromise(): Promise<Photo[]> {
        let options = new RequestOptions({ headers: this.getHeaders() });
        return this.http.get('https://jsonplaceholder.typicode.com/photos', options)
             .toPromise()
             .then(response => response.json().data as Photo[])
             .catch(this.handleErrorPromise);
    }

    getPhoto(id: number): Observable<Photo> {
        let person$ = this.http
        // .get(`${this.baseUrl}/people/${id}`, {headers: this.getHeaders()})
        .get('https://jsonplaceholder.typicode.com/photos/1', {headers: this.getHeaders()})
        .map(this.mapPhoto);
        return person$;
    }

    save(person: Photo) : Observable<Response>{
         // this won't actually work because the StarWars API doesn't 
        // is read-only. But it would look like this:
        return this
        .http
        .put('https://jsonplaceholder.typicode.com/photos', JSON.stringify(person), {headers: this.getHeaders()});
    }

    private handleErrorPromise(error: any): Promise<any> {
            console.error('An error occurred', error); // for demo purposes only
            return Promise.reject(error.message || error);
    }

    private handleErrorObservable (error: any) {
        // log error
        // could be something more sofisticated
        console.log('PhotosService:handleErrorObservable');
        console.error(error);
        let errorMsg = error.message || `handleErrorObservable ...`;
        console.error(errorMsg);
          // throw an application level error
        return Observable.throw(errorMsg);
    }

    private getHeaders(){
        // I included these headers because otherwise FireFox
        // will request text/html instead of application/json
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }

    private mapPhoto(response:Response): Photo{
        // toPerson looks just like in the previous example
        return this.toPhoto(response.json());
    }

/*
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    note:string;
*/

    private toPhoto(r:any): Photo{
        let photo = <Photo>({
            id: this.extractId(r),
            albumId: r.id
        });
        console.log('Parsed person:', photo);
        return photo;
    }

    private extractId( a: any): any {
        return a;
    }

}