import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { writeFileSync } from "fs";
import { join } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "admin-api",
      configureServer(server) {
        server.middlewares.use("/api/admin", async (req, res, next) => {
          // Only allow in development
          if (process.env.NODE_ENV === "production") {
            res.statusCode = 403;
            res.end("Admin API only available in development");
            return;
          }

          // Only allow from localhost
          const host = req.headers.host || "";
          if (!host.includes("localhost") && !host.includes("127.0.0.1")) {
            res.statusCode = 403;
            res.end("Admin API only available on localhost");
            return;
          }

          if (req.method === "POST" && req.url === "/save") {
            let body = "";
            req.on("data", (chunk) => {
              body += chunk.toString();
            });
            req.on("end", () => {
              try {
                const { file, data } = JSON.parse(body);
                const filePath = join(process.cwd(), "public", "data", file);
                writeFileSync(filePath, JSON.stringify(data, null, 4), "utf-8");
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true }));
              } catch (error) {
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 500;
                res.end(
                  JSON.stringify({ success: false, error: String(error) })
                );
              }
            });
          } else {
            next();
          }
        });
      },
    },
  ],
  server: {
    port: 3000,
  },
});
