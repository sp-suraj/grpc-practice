const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

// Load the protobuf
const PROTO_PATH = path.join(__dirname, "service.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const proto = grpc.loadPackageDefinition(packageDefinition).example;

// Create a client
const client = new proto.Greeter("localhost:50051", grpc.credentials.createInsecure());

// Call the SayHello method
client.SayHello({ name: "World" }, (err, response) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log("Greeting:", response.message);
});
