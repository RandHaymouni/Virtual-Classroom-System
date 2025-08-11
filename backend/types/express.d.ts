import { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: CustomJwtPayload;
    }
  }
}
