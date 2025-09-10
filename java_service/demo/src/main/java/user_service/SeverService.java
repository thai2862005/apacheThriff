package user_service;

import org.apache.thrift.server.TServer;
import org.apache.thrift.server.TSimpleServer;
import org.apache.thrift.transport.TServerSocket;
import org.apache.thrift.transport.TServerTransport;

public class SeverService {
    public static void main(String[] args) {
        try {
            UserServiceHandler handler = new UserServiceHandler();

            UserServiceThrift.Processor<UserServiceThrift.Iface> processor =
                    new UserServiceThrift.Processor<>(handler);

            TServerTransport serverTransport = new TServerSocket(9090);

            TServer server = new TSimpleServer(
                    new TServer.Args(serverTransport).processor(processor)
            );

            System.out.println("🚀 Thrift server is running at port 9090...");
            server.serve(); 

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
