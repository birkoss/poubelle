import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { LocalNotifications } from '@ionic-native/local-notifications';

import { ArrondissementModal } from '../../modals/arrondissement/arrondissement';

import { ConfigProvider } from '../../providers/config';
import { DataProvider } from '../../providers/data';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    notifications:Array<Object> = [];

    constructor(public navCtrl: NavController, public localNotifications:LocalNotifications, public modalCtrl:ModalController, public config:ConfigProvider, public data:DataProvider) {
    }

    ionViewDidLoad() {
        //this.notifications.push({data:'2017-01-01', text:'AAA'});
        //this.notifications.push({data:'2017-01-01', text:'AAA'});
        //this.scheduleDates();
        this.getNotifications();
    }

    showModal(event) {
        let modal = this.modalCtrl.create(ArrondissementModal, {parent: this});
        modal.present();
    }

    isConfigured() {
        return (this.config.configs['arrondissement'] != "");
    }

    scheduleDates() {
        let dates = {};

        this.data.dates.forEach(single_date => {
            if (single_date['ARROND'] == this.config.configs['arrondissement']) {
                let d = new Date(single_date['DT01']);
                d.setUTCDate(d.getUTCDate() + this.config.configs['day']);
                let date = d.toISOString().substr(0, 10);

                if (dates[date] == null) {
                    dates[date] = {'type':[]};
                }
                dates[date].type.push(single_date['DESC']);
            }
        });

        /* Delete previous notifications and create new one */
        let lastDate = "";
        this.localNotifications.cancelAll().then(response => {
            for (let date in dates) {
                lastDate = date;
                var notificationDate = new Date(date);
                var yesterday = new Date(date);
                yesterday.setUTCDate(notificationDate.getUTCDate() - 1);

                yesterday.setUTCHours(17);
                yesterday.setUTCMinutes(0);
                yesterday.setUTCSeconds(0);

                this.scheduleNotification(dates[date].type.join(", "), yesterday, notificationDate);
            }

            //this.scheduleNotification(dates[lastDate].type.join(", "), new Date("2001-01-01"), new Date("2001-01-02"));

            this.getNotifications();
        });

    }

    getNotifications() {
        this.localNotifications.getAllScheduled().then(notifications => {
            this.notifications = notifications;

            this.notifications.sort(function (a, b) {
                if (a['id'] < b['id']) {
                    return -1
                } else if (a['id'] > b['id']) {
                    return 1;
                }
                return 0;
            });
        });
    }

    formatDate(date) {
        let d = new Date(date);

        let m = new Array(12);
        m[0] = "Janvier";
        m[1] = "Février";
        m[2] = "Mars";
        m[3] = "Avril";
        m[4] = "Mai";
        m[5] = "Juin";
        m[6] = "Juillet";
        m[7] = "Août";
        m[8] = "Septembre";
        m[9] = "Octobre";
        m[10] = "Novembre";
        m[11] = "Décembre";

        return d.getDate() + " " + m[d.getMonth()] + " " + d.getFullYear();
    }

    getDay(date) {
        let d = new Date(date);
        return this.data.getDay(d.getUTCDay());
    }

    scheduleNotification(text, notificationDate, date) {
        this.localNotifications.schedule({
            id: date.toISOString().substr(0, 10).replace(/-/g, ''),
            title: "Collecte des poubelles - " + this.data.getDay(date.getUTCDay()),
            text: text,
            data: date.toISOString().substr(0, 10),
            at: notificationDate,
            led: 'ff00ff',
            icon: 'ic_notifications',
            sound: null
        });
    }
}
