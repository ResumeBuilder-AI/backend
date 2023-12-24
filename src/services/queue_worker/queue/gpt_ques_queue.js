const { Queue } = require('bullmq');
const { REDIS, QUEUE_WORKER } = require('../../../config');

let gpt_ques_queue = null;

createGptQuesQueue();
function createGptQuesQueue(){
    if(!!gpt_ques_queue) return;
    gpt_ques_queue = new Queue(QUEUE_WORKER.gpt_ques_worker_queue,{ 
        connection: {
            host: REDIS.host,
            port: REDIS.port
        }
    });
}

function addJobToGptQuesQueue({docId, text}) {
    if(!gpt_ques_queue || !text){
        return;
    }
    gpt_ques_queue.add(QUEUE_WORKER.gpt_ques_job, { docId, text });
}

module.exports = {
    addJobToGptQuesQueue,
}