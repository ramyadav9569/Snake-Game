/*developed by Ram Yadav*/
import java.io.*;
import java.net.*;

public class SnakeGameServer {
    public static void main(String[] args) throws IOException {
        int port = 8080; // Server port
        ServerSocket serverSocket = new ServerSocket(port);
        System.out.println("Server started on port " + port);
        
        while (true) {
            try (Socket clientSocket = serverSocket.accept()) {
                System.out.println("New connection established");
                
                BufferedReader input = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                PrintWriter output = new PrintWriter(clientSocket.getOutputStream(), true);
                
                // Read request from client
                String requestLine = input.readLine();
                if (requestLine != null && requestLine.contains("GET /")) {
                    // Respond with a simple HTML page
                    output.println("HTTP/1.1 200 OK");
                    output.println("Content-Type: text/html");
                    output.println();
                    output.println("<html><body><h1>Welcome to Snake Game Server</h1></body></html>");
                }
                
                input.close();
                output.close();
            }
        }
    }
}
