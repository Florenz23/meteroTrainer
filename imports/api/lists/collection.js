import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Lists = new Mongo.Collection('lists');
Lists.allow({
    insert(userId, list) {
        return userId && list.owner === userId;
    },
    update(userId, list, fields, modifier) {
        return userId && list.owner === userId;
    },
    remove(userId, list) {
        return userId && list.owner === userId;
    }
});
