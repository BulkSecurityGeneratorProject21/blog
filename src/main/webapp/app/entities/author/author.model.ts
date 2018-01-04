import { BaseEntity } from './../../shared';

export class Author implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public displayName?: string,
        public posts?: BaseEntity[],
        public comments?: BaseEntity[],
    ) {
    }
}
