const { Queue } = require('bullmq');
const { REDIS, QUEUE_WORKER } = require('../../../config');

let gpt_result_queue = null;

createGptResultQueue();
function createGptResultQueue(){
    if(!!gpt_result_queue) return;
    gpt_result_queue = new Queue(QUEUE_WORKER.gpt_result_worker_queue,{ 
        connection: {
            host: REDIS.host,
            port: REDIS.port
        }
    });
}

function addJobGptResultQueue(gpt_ques) {
    if(!gpt_ques){
        return;
    }
    gpt_result_queue.add(QUEUE_WORKER.gpt_result_job, gpt_ques, { delay: QUEUE_WORKER.RESULT_DELAY });
}

module.exports = {
    addJobGptResultQueue,
}