import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataProvider {
    public dates:Array<Object> = [];
    public weekdays:Array<string> = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    constructor(public http:Http) { }

    load():Promise<Boolean> {
        return this.http.get('assets/2017.json').toPromise().then(res => {
            this.parseJSON(res.json());
            return Promise.resolve(true);
        });
    }

    private parseJSON(json:Array<any>) {
        let now = new Date();
        let day = now.getDay();
        let diff = now.getDate() - day + (day == 0 ? -6:1);
        let monday = new Date(now.setDate(diff)).toJSON().slice(0,10);

        json['CALENDRIER_COLLECTES']['COLLECTE_MATIERES_RESIDUELLES'].forEach(single_date => {
            if (monday <= single_date.DT01) {
                this.dates.push(single_date);
            }
        });
        console.log(this.dates);
    }

    getDay(day):string {
        day--;
        if (day < 0) {
            day = this.weekdays.length - 1;
        }
        return this.weekdays[day];
    }
}
