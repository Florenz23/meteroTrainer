import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Lists } from './collection';

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('lists', function tasksPublication() {
        return Lists.find();
    });
}