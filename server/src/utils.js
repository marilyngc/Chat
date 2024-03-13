import path from "path";
import { fileURLToPath } from "url";


// __dirname hace referencia a src/
export const __dirname = path.dirname(fileURLToPath(import.meta.url));