import { BaseEntity } from './../../shared';

export class Comment implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public body?: string,
        public created?: any,
        public authorId?: number,
    ) {
    }
}
