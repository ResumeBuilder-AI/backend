
exports.PORT = 3000;
exports.BOT = 'Bot';
exports.API_URL = "http://localhost:3000";
exports.APP_NAME = "api.resumebuilder.com";

exports.SOCKET_EVENTS = {
    connection: "connection",
    disconnect: "'disconnect'",
    V1CreateBlankDocumentTempId: "v1:create-blank-document-temp-id",
    V1ResumeBuilderChat: "v1:resume:builder:chat",
    V1ResumeBuilderSessionChats: "v1:resume:builder:session:chat",
    V1GetDocumentMeta: "v1:get:document:meta",
    V1SetDocumentMeta: "v1:set:document:meta",
    V1SetResumeData: "v1:set:resume:data",
    V1GetResumeData: "v1:get:resume:data",
    V1ResumeBuilderGetChat: 'v1:resume:builder:get:chat',
    V1ResumeBuilderSendChat: 'v1:resume:builder:send:chat'
}

exports.WEB_URL = "http://localhost:3001";
exports.JWKS_URI = 'http://localhost:3000/auth/jwt/jwks.json';

exports.SUPERTOKENS = {
    host: "http://localhost:3567",
    authPath: "/auth",
    FRAMEWORK: "express",
    PROVIDERS : {
        google: "google"
    }
}

exports.GOOGLE = {
    clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
    clientSecret: "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"
}

exports.OPENAPI = {
    API_KEY: "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",
    ASSISTANT_ID: "asst_RKuxzHCj7EFf1TnOm37CfZcj",
    RUNNER_STATUS: {
        pending: "pending",
        completed: "completed"
    }
}

exports.REDIS = {
    host: "127.0.01",
    port: 6379
}

exports.QUEUE_WORKER = {
    gpt_ques_worker_queue: "gpt_ques_worker_queue",
    gpt_ques_job: "gpt_ques_job",
    gpt_result_worker_queue: "gpt_result_worker_queue",
    gpt_result_job: "gpt_result_job",
    RESULT_DELAY: 6000
}
