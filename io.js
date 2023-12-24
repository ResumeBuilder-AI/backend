const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const config = require("./src/config")
const SocketEvents = require('./src/sockets/index');

var client = jwksClient({
    jwksUri: config.JWKS_URI
});
  
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    let signingKey = key.getPublicKey();
    callback(err, signingKey);
  });
}

function ioAttachToServer(server){
    const io = socketIO(server, {
        cors: {
          origin: config.WEB_URL, // Replace with your frontend origin
          methods: ['GET', 'POST'],
          credentials: true, // Enable credentials (cookies, headers) for cross-origin requests
        },
    });
    
    io.use((socket, next) => {
        if (socket.handshake.query && socket.handshake.query.token) {
            jwt.verify(socket.handshake.query.token, getKey, {}, function (err, decoded) {
                if (err) {
                return next(new Error('Authentication error'));
                }
                socket.decoded = decoded;
                next();
            });
          }
        else {
            next(new Error('Authentication error'));
        }
    });
    
    io.on(config.SOCKET_EVENTS.connection, (socket) => {
        console.log('A user connected', socket.id);
    
        // Handle socket events here...
        SocketEvents(socket);

        socket.on(config.SOCKET_EVENTS.disconnect, () => {
            console.log('User disconnected');
        });
    });

}

module.exports = { ioAttachToServer };