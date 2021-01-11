import { MockService } from 'ngx-fw4c';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs'
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})

export class IndexService extends MockService {
    private href = 'http://localhost:8080';
    constructor(private _httpClient: HttpClient) {
        super();
    }
    public getstatistic(): Observable<any> {
        return this._httpClient.get<any[]>(`${this.href}/menu` + '/getstatistic').pipe(retry(2));
    }
    public getLineChat(): Observable<any> {
        return this._httpClient.get<any[]>(`${this.href}/menu` + '/getLineChat').pipe(retry(2));
    }
}