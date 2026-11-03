import jwt from "jsonwebtoken";

export function generateToken(user) {
    const token = jwt.sign({
        data: {
            username: user.username,
            role: user.role
        }
    }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
    return token
}

export function decodedToken(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded
}

export function verifyToken(authorization, role) {
    const token = authorization.replace(/^Bearer\s+/i, '');
    const decoded = decodedToken(token)
    if (role.includes(decoded.data.role)) {
        return true
    } else {
        return false
    }
}