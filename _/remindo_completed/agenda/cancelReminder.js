'use strict';
const ObjectID = require('mongodb').ObjectID;
module.exports = (agenda, f) => {
  return agenda.define('cancelReminder', job => {
    const {fbid, id} = job.attrs.data;
    agenda.cancel({
      name: 'reminder',
      _id: new ObjectID(id)
    }, (error, numRemoved) => {
      if(!error) {
        f.txt(fbid, (numRemoved > 0 ? "Alright. I've canceled the reminder." : "I've already canceled this reminder. Don't worry, it won't bother you. :)"));
      } else {
        f.txt(fbid, "Uh Oh! Something's not right with our servers. Could you try again after a while?");
      }
    });
  });
}
