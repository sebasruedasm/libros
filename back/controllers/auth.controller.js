import { getUsuarioModel } from "../models/auth.model.js";
import { generateToken } from "../services/token.service.js";


export const login = async (req, res) => {
    try {
        const { email, password } = req.body; 
        console.log("Login request received:", email, password); 
        let data = await getUsuarioModel(email, password);
        console.log("User data:", data); 
        if (!data) {
            throw new Error("Credenciales no validas");
        }

        res.status(200).json({
            token: generateToken(data),
            success: true,
            msg: 'Login correcto',
        });
    } catch (e) {
        console.log(e);
        res.status(401).json({
            success: false,
            msg: 'Datos incorrectos',
            token: '',
        });
    }
};

