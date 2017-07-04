import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataProvider {
    public dates:Array<Object> = [];
    constructor(public http:Http) { }

    load():Promise<Boolean> {
        return this.http.get('assets/2017.json').toPromise().then(res => {
            this.parseJSON(res.json());
            return Promise.resolve(true);
        });
    }

    private parseJSON(json:Array<any>) {
        let now = new Date().toJSON().slice(0,10);

        json['CALENDRIER_COLLECTES']['COLLECTE_MATIERES_RESIDUELLES'].forEach(single_date => {
            if (now <= single_date.DT01) {
                this.dates.push(single_date);
            }
        });
    }
}
