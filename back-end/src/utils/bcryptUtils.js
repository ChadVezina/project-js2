import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const SALT = parseInt(process.env.BCRYPT_SALT) || 12;

export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(SALT);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error("Erreur lors du hashage du mot de passe");
    }
};

export const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error("Erreur lors de la comparaison des mots de passe");
    }
};
