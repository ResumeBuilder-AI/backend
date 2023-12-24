const { SOCKET_EVENTS, BOT } = require("../../config");
const { addJobToGptQuesQueue } = require("../../services/queue_worker/queue/gpt_ques_queue");

const session = {};
const resumeData = {};

let _socket = null

const ResumeBuilderSocket = (socket) => {
    _socket = socket;

    socket.on(SOCKET_EVENTS.V1ResumeBuilderChat, (data) => {
        if(!data || !data.text) return;
        if(!session[data.docId]){
            session[data.docId] = [];
        }
        session[data.docId].push(data)
        socket.emit(SOCKET_EVENTS.V1ResumeBuilderChat, {text: data.text, source: BOT})
        session[data.docId].push({text: data.text, source: BOT})
    })

    socket.on(SOCKET_EVENTS.V1ResumeBuilderGetChat, (data) => {
        if(!data || !data.text) return;
        addJobToGptQuesQueue({docId: data.docId, text: data.text});
    })

    socket.on(SOCKET_EVENTS.V1ResumeBuilderSessionChats, (data) => {
        if(!data || !data.docId) return;
        if(!session[data.docId]){
            session[data.docId] = [];
        }
        socket.emit(SOCKET_EVENTS.V1ResumeBuilderSessionChats, {chats: session[data.docId]});
    })

    socket.on(SOCKET_EVENTS.V1SetResumeData, (data) => {
        if(!resumeData[data.docId]){
            resumeData[data.docId] = "";
        }
        resumeData[data.docId] = data.text;
    })

    socket.on(SOCKET_EVENTS.V1GetResumeData, (data) => {
        if(!resumeData[data.docId]){
            resumeData[data.docId] = "";
        }
        socket.emit(SOCKET_EVENTS.V1GetResumeData, {text:  resumeData[data.docId]});
    })
}

const ResumeBuilderSendChat = (msg) => {
    _socket.emit(SOCKET_EVENTS.V1ResumeBuilderSendChat, msg);
}

module.exports = {
    ResumeBuilderSocket,
    ResumeBuilderSendChat
}