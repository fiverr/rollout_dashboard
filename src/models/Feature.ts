import * as moment from 'moment';

export interface IFeature {
    name: string;
    history?: Array<{updated_at: string, author_mail: string, percentage: number, author: string}>;
    users?: number[];
    description?: string;
    author?: string;
    author_mail?: string;
    created_at?: string;
    percentage?: number;
    enriched_data?: Array<{}>;
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
    public updatedAt: (moment.Moment | null);
    public enriched_data: any[];

    public constructor(payload: IFeature) {
        this.description = payload.description || '';
        this.users = payload.users || [];
        this.authorMail = payload.author_mail || '';
        this.author = payload.author || '';
        this.createdAt = payload.created_at || '';
        this.name = payload.name || '';
        this.percentage = payload.percentage || 0;
        this.setHistory(payload.history || []);
        this.setUpdatedAt();
        this.enriched_data = [{}];
    }

    private setHistory(history: any[]): void {
        this.history = history.reverse();
    }

    private setUpdatedAt(): void {
        if (this.history.length === 0) { return; }

        const lastRecord = (this.history[0] as any);
        this.updatedAt = moment(lastRecord.updated_at);
    }

    public static searchByPattern(features: Feature[], patten) {
        const regex = new RegExp(patten, 'gi');
        return features.filter((f) => {
            return (f.name.match(regex) ||
            f.description.match(regex) ||
            f.author.match(regex) ||
            f.authorMail.match(regex) ||
            f.percentage.toString().match(regex));
        });
    }

    public static compareFeaturesByUpdatedAt(a: Feature, b: Feature): (1 | 0 | -1) {
        const lastRecordA = a.updatedAt;
        const lastRecordB = b.updatedAt;

        if (!lastRecordA && !lastRecordB) {
            return 0;
        } else if (!lastRecordA) {
            return 1;
        } else if (!lastRecordB) {
            return -1;
        }
        return lastRecordA.isBefore(lastRecordB) ? 1 : -1;
    }
}
