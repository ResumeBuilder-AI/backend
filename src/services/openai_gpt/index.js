const OpenAI = require('openai');
const { OPENAPI } = require('../../config');

const openai = new OpenAI({
    apiKey: OPENAPI.API_KEY,
});

async function retrieveAssistant(){
    if(!openai){
        return;
    }
    const assistant = await openai.beta.assistants.retrieve(OPENAPI.ASSISTANT_ID);
    return assistant;
}

async function createThread(){
    if(!openai){
        return;
    }
    const thread = await openai.beta.threads.create();
    return thread; 
}

async function retrieveThread(thread_id){
    if(!openai || !thread_id){
        return;
    }
    const thread = await openai.beta.threads.retrieve(thread_id);
    return thread; 
}

async function sendMsgToThread(thread_id, message){
    const msg = await openai.beta.threads.messages.create(
        thread_id,
        {
            role: "user",
            content: message
        }
    );
    return msg;
}

async function runAssistantForThread(assistant_id, thread_id){
    if(!openai || !assistant_id || !thread_id){
        return;
    }
    const run = await openai.beta.threads.runs.create(
        thread_id,
        { 
            assistant_id,
        }
    );
    return run;
}

async function checkRunningStatus(thread_id, run_id){
    if(!openai || !thread_id || !run_id){
        return;
    }
    const run_status = await openai.beta.threads.runs.retrieve(
        thread_id,
        run_id
    );
    return run_status;
}

async function getMessage(thread_id){
    if(!openai || !thread_id){
        return;
    }
    const msg = await openai.beta.threads.messages.list(
        thread_id
    );
    return msg;
}

async function askQuesFromGPT(thread_id, {text}){
    const assistant = await retrieveAssistant();
    let thread = null;
    if(!thread_id){
        thread = await createThread();
    }else{
        thread = await retrieveThread(thread_id);
    }
    const msg = await sendMsgToThread(thread.id, text);
    const run = await runAssistantForThread(assistant.id, thread.id);
    return {assistant_id: assistant.id, thread_id: thread.id, msg_id: msg.id, run_id: run.id};
}

async function getProcessedMessageFromGptThread(thread_id, run_id){
    const run = await checkRunningStatus(thread_id, run_id);
    if(run.status === OPENAPI.RUNNER_STATUS.completed){
        const msg = await getMessage(thread_id);
        return msg;
    }else{
        return OPENAPI.RUNNER_STATUS.pending;
    }
}

module.exports = {
    askQuesFromGPT,
    getProcessedMessageFromGptThread
}