import { Component } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config';

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
    parent:any;

    constructor(public viewCtrl:ViewController, params:NavParams, public config:ConfigProvider) {
        this.parent = params.get('parent');
        this.arrondissement = this.config.configs['arrondissement'];

        console.log(this.arrondissement);
    }

    ionViewDidEnter() {
    }

    close() {
        this.viewCtrl.dismiss();
    }
    
    onChanged() {
        console.log(this.arrondissement);
        this.config.configs['arrondissement'] = this.arrondissement;
        this.config.save();

        this.parent.scheduleDates();
    }
}
