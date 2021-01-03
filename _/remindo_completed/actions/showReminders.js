'use strict';
const showReminders = (session, agenda) => {
  return ({sessionId, context, entities}) => {
    return new Promise((resolve, reject) => {
      let {fbid} = session.get(sessionId);
      agenda.now('showReminders', {
        fbid
      });

      context.jobDone = true;

      return resolve(context);
    });
  }
}

module.exports = showReminders;
