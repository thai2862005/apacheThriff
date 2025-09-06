import thrift from "thrift";
// ✅ Import đúng file service sinh ra
import * as UserServiceThrift from "../thrift_gen/UserServiceThrift";

const connection = thrift.createConnection("localhost", 9090, {
  transport: thrift.TBufferedTransport,
  protocol: thrift.TBinaryProtocol,
});

connection.on("error", (err) => {
  console.error("❌ Thrift connection error:", err);
});
const client = thrift.createClient(UserServiceThrift, connection);

export default client;