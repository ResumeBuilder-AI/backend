const OpenAI = require('openai');
const { OPENAI_API_KEY } = require('../config');

// const openai = new OpenAI({
//     apiKey: OPENAI_API_KEY,
// });

/**
    
    1 doc = 1 thread
    store thread id with doc id
    keep in redis also doc id -> thread id
 */

async function main(){
    const assistant = await openai.beta.assistants.retrieve("asst_RKuxzHCj7EFf1TnOm37CfZcj");
    const thread = await openai.beta.threads.create();

    const message = await openai.beta.threads.messages.create(
        thread.id,
        {
            role: "user",
            content: "Tackled early obstacles in Travel Team by initiating the creation of codebase documentation, kickstarting knowledge sharing efforts that contributed to enhanced team productivity."
        }
    );

    const run = await openai.beta.threads.runs.create(
        thread.id,
        { 
            assistant_id: assistant.id,
        }
    );

    setInterval(async () => {
        const run_status = await openai.beta.threads.runs.retrieve(
            thread.id,
            run.id
        );
        console.log(run_status)
        if(run_status.status === 'completed'){
            const msg = await openai.beta.threads.messages.list(
                thread.id
            );

            console.log(JSON.stringify(msg))
        }

    }, 1000);

   
}
// main()