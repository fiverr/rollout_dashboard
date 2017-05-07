import * as moment from 'moment';

export interface IFeature {
    history: Array<{updated_at: string, author_mail: string, percentage: number, author: string}>;
    name: string;
    users: number[];
    description: string;
    author: string;
    authorMail: string;
    createdAt: string;
    percentage: number;
}

export class Feature {
    public history: any[];
    public users: any[];
    public description: string;
    public author: string;
    public authorMail: string;
    public name: string;
    public createdAt: string;
    public percentage: number;

    public constructor(payload: IFeature) {
        this.description = payload.description || '';
        this.history = payload.history || [];
        this.users = payload.users || [];
        this.authorMail = payload.authorMail || '';
        this.author = payload.author || '';
        this.createdAt = payload.createdAt || '';
        this.name = payload.name || '';
        this.percentage = payload.percentage || 0;
    }

    public getUpdatedAt(): moment.Moment {
        if (this.history.length === 0) { return;}

        const lastRecord = (this.history[this.history.length - 1] as any);
        return moment(lastRecord.updated_at);
    }
}

