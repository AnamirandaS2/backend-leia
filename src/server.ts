import app from "./app";
import "dotenv/config";

const port = Number(process.env.PORT) || 3001;
const host = (process.env.HOST as string) || "0.0.0.0";

app.listen(port, host, () => {
  console.log(`[SERVER IS ON] Server running on http://${host}:${port}`);
});
