export class NgxTranslateConfig {
    name: string;
    path: string;
    json: string[];

    constructor(obj?: any) {
        this.name = obj && obj.name;
        this.path = obj && obj.path;
        this.json = obj && obj.json || [];
    }
}
