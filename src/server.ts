import app from "./app";
import "dotenv/config";

const port = Number(process.env.PORT) || 3000;
const host = (process.env.HOST as string) || "192.168.0.12";

app.listen(port, host, () => {
  console.log(`[SERVER IS ON] Server running on http://${host}:${port}`);
});
