const { ResumeBuilderSendChat } = require("../../../sockets/events/resume_chat");
const { Worker } = require('bullmq');
const { REDIS, QUEUE_WORKER, OPENAPI } = require('../../../config');
const { addJobGptResultQueue } = require("../queue/gpt_result_queue");
const { getProcessedMessageFromGptThread } = require("../../openai_gpt");

async function processJob(job){
        //check if result is ready from gpt
        //if yes then send to user
        //if no then send back again to gpt_result_worker_queue
        const result = await getProcessedMessageFromGptThread(job.data.thread_id, job.data.run_id);
        console.log('checking result', job.data, result === OPENAPI.RUNNER_STATUS.pending);
        if(result === OPENAPI.RUNNER_STATUS.pending){
            addJobGptResultQueue(job.data);
        }
        else ResumeBuilderSendChat(result)
}

/**
 * gpt result worker
 */
new Worker(QUEUE_WORKER.gpt_result_worker_queue, async job => {
    if(job.name === QUEUE_WORKER.gpt_result_job){
        processJob(job);
    }
}, { 
    connection: {
        host: REDIS.host,
        port: REDIS.port
    }
}).on('failed', (job, error) => {
    console.log({error})
}).on('error', err => {
    console.error({err});
});