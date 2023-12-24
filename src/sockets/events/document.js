const { SOCKET_EVENTS } = require("../../config");
const { generateUUIDV4 } = require("../../utilities/utils");

const doc = {};

let _socket = null;

exports.CreateBlankDocumentSocket = (socket) => {
    _socket = socket;
    
    socket.on(SOCKET_EVENTS.V1CreateBlankDocumentTempId, (data) => {
        const uuidv4 = generateUUIDV4();
        socket.emit(SOCKET_EVENTS.V1CreateBlankDocumentTempId, {id: uuidv4});
    })

    socket.on(SOCKET_EVENTS.V1GetDocumentMeta, (data) => {
        if(!data || !data.docId) return;
        if(!doc[data.docId]){
            doc[data.docId] = {};
        }
        socket.emit(SOCKET_EVENTS.V1GetDocumentMeta, {...doc[data.docId]});
    })

    socket.on(SOCKET_EVENTS.V1SetDocumentMeta, (data) => {
        if(!data || !data.docId) return;
        if(!doc[data.docId]){
            doc[data.docId] = {};
        }
        doc[data.docId] = {...data}
        socket.emit(SOCKET_EVENTS.V1SetDocumentMeta, {...doc[data.docId]});
    })
}