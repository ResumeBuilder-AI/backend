const { CreateBlankDocumentSocket } = require("./events/document");
const {ResumeBuilderSocket} = require("./events/resume_chat")

function SocketEvents(socket){
    CreateBlankDocumentSocket(socket);
    ResumeBuilderSocket(socket);
}

module.exports = SocketEvents;