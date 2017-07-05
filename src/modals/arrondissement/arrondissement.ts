import { Component } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config';
import { DataProvider } from '../../providers/data';

@Component({
    selector: 'arrondissement-modal',
    templateUrl: 'arrondissement.html'
})

export class ArrondissementModal {
    arrondissements:Array<string> = [
         'Rock Forest-St-Élie-Deauville',
         'Arrondissement de Jacques-Cartier',
         'Centre-ville',
         'Arrondissement de Brompton',
         'Arrondissement de Fleurimont',
         'Arrondissement du Mont-Bellevue',
         'Arrondissement de Lennoxville'
    ];

    arrondissement:string = "";
    day:string = "";
    parent:any;

    constructor(public viewCtrl:ViewController, params:NavParams, public config:ConfigProvider, public data:DataProvider) {
        this.parent = params.get('parent');

        this.arrondissement = this.config.configs['arrondissement'];
        this.day = this.config.configs['day'];
    }

    close() {
        this.viewCtrl.dismiss();
    }

    onChanged() {
        this.config.configs['arrondissement'] = this.arrondissement;
        this.config.configs['day'] = this.day;
        this.config.save();

        this.parent.scheduleDates();
    }
}
