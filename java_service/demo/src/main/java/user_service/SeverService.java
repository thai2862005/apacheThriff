package user_service;

import org.apache.thrift.server.TServer;
import org.apache.thrift.server.TSimpleServer;
import org.apache.thrift.transport.TServerSocket;
import org.apache.thrift.transport.TServerTransport;

public class SeverService {
    public static void main(String[] args) {
        try {
            // 1. Khởi tạo handler
            UserServiceHandler handler = new UserServiceHandler();

            // 2. Processor từ Thrift IDL
            UserServiceThrift.Processor<UserServiceThrift.Iface> processor =
                    new UserServiceThrift.Processor<>(handler);

            // 3. Khởi tạo server socket (port 9090)
            TServerTransport serverTransport = new TServerSocket(9090);

            // 4. Tạo server
            TServer server = new TSimpleServer(
                    new TServer.Args(serverTransport).processor(processor)
            );

            System.out.println("🚀 Thrift server is running at port 9090...");
            server.serve(); // Bắt đầu phục vụ các yêu cầu

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
