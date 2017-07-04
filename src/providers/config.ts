import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable()
export class ConfigProvider {
    public configs: Object = {};

    constructor(public storage: Storage) { }

    load() {
        this.configs['arrondissement'] = '';

        return this.storage.get("config").then(config => {
            if (config != null && config != undefined) {
                config = JSON.parse(config);
                this.configs['arrondissement'] = config['arrondissement'];
            }
        });
    }

    save() {
        this.storage.set('config', JSON.stringify(this.configs));
    }
}

