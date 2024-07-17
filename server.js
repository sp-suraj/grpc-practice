const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

// Load the protobuf
const PROTO_PATH = path.join(__dirname, "service.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const proto = grpc.loadPackageDefinition(packageDefinition).example;

// Implement the SayHello RPC method
const sayHello = (call, callback) => {
	callback(null, { message: `Hello ${call.request.name}` });
};

// Create and start the gRPC server
const server = new grpc.Server();
server.addService(proto.Greeter.service, { SayHello: sayHello });
const address = "0.0.0.0:50051";
server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err, port) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log(`Server running at ${address}`);
	server.start();
});
