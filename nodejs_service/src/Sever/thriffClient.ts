import thrift from "thrift";
const UserServiceThrift = require("../../thrift_gen/UserServiceThrift.js");

const connection = thrift.createConnection("localhost", 9090, {
  transport: thrift.TBufferedTransport,
  protocol: thrift.TBinaryProtocol,
});

connection.on("error", (err) => {
  console.error("❌ Thrift connection error:", err);
});

const client = thrift.createClient(UserServiceThrift, connection);

export default client;
