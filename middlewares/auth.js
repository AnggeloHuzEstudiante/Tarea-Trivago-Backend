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
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded
    } catch(err) {
        return null
    }
}

export function verifyToken(authorization, role) {
    if (authorization === undefined) {
        return ({
            status: false,
            message: "No hay token registrado"
        })
    }
    const token = authorization.replace(/^Bearer\s+/i, '');
    const decoded = decodedToken(token)

    if (decoded === null) {
        return ({
            status: false,
            message: "Token invalido"
        })
    }

    if (role.includes(decoded.data.role)) {
        return ({
            status: true,
        })
    } else {
        return ({
            status: false,
            message: "No tienes el rol permitido"
        })
    }
}