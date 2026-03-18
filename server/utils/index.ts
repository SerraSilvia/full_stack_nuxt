// server/utils/index.ts
import { compare } from 'bcrypt';

/**
 * Verifica si una contraseña en texto plano coincide con un hash.
 * @param hash - El hash de la contraseña almacenado en la base de datos.
 * @param plainTextPassword - La contraseña en texto plano introducida por el usuario.
 * @returns {Promise<boolean>} - True si la contraseña es válida, false en caso contrario.
 */
export async function verifyPassword(hash: string, plainTextPassword: string): Promise<boolean> {
  return await compare(plainTextPassword, hash);
}