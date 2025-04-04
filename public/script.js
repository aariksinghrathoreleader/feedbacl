import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;

public class SimpleWebServer {
    public static void main(String[] args) throws IOException {
        // Create an HTTP server on port 8000
        HttpServer server = HttpServer.create(new java.net.InetSocketAddress(8000), 0);
        server.createContext("/", new RootHandler());
        server.setExecutor(null); // creates a default executor
        server.start();
        System.out.println("Server started at http://localhost:8000");
    }

    static class RootHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String response = "";
            String path = exchange.getRequestURI().getPath();
            Path filePath = Paths.get("public", path.equals("/") ? "index.html" : path.substring(1)); // Serve from 'public' directory

            // Serve files based on the request path
            if (Files.exists(filePath) && !Files.isDirectory(filePath)) {
                response = new String(Files.readAllBytes(filePath));
                String contentType = determineContentType(filePath);
                exchange.getResponseHeaders().add("Content-Type", contentType);
                exchange.sendResponseHeaders(200, response.length());
            } else {
                response = "404 Not Found";
                exchange.sendResponseHeaders(404, response.length());
            }

            // Send response
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response.getBytes());
            }
        }

        private String determineContentType(Path filePath) {
            String fileName = filePath.toString().toLowerCase();
            if (fileName.endsWith(".html")) {
                return "text/html";
            } else if (fileName.endsWith(".css")) {
                return "text/css";
            } else if (fileName.endsWith(".js")) {
                return "application/javascript";
            } else if (fileName.endsWith(".png")) {
                return "image/png";
            } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
                return "image/jpeg";
            } else if (fileName.endsWith(".gif")) {
                return "image/gif";
            } else {
                return "application/octet-stream"; // Default for unknown types
            }
        }
    }
}
