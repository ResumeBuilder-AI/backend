const { addJobGptResultQueue } = require('../queue/gpt_result_queue');
const { Worker } = require('bullmq');
const { REDIS, QUEUE_WORKER } = require('../../../config');
const { askQuesFromGPT } = require('../../openai_gpt');

async function processJob(job){
    //ask gpt
    console.log('asking ques from gpt', job.data);
    const ques = await askQuesFromGPT(null, {text: job.data.text})
    addJobGptResultQueue(ques)
}

/**
 * gpt ques worker
 */
new Worker(QUEUE_WORKER.gpt_ques_worker_queue, async job => {
    if(job.name === QUEUE_WORKER.gpt_ques_job){
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