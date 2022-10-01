import Bull, { DoneCallback, Job } from 'bull';
//import emailProcess from '../processes/email.process';
import { setQueues, BullAdapter } from 'bull-board';

// https://optimalbits.github.io/bull

const redisUrl = process.env.REDIS_URL!;

const emailQueue = new Bull('email', 'local:redis:6379');

setQueues([new BullAdapter(emailQueue)]);

emailQueue.process(async (job: Job, done: DoneCallback) => {
   console.log('job data', job.data); 

   done(new Error('smth bad happen'))

});

export const sendNewEmail = (data: any) => {
  emailQueue.add(data, { attemps: 3, delay: 5000 });
};
 