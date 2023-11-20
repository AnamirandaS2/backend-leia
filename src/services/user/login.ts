import { sign } from "jsonwebtoken";

export default function generateToken(id: string) {
    const token = sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
    return token
}