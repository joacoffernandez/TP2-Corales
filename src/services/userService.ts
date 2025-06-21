import { Rol, User } from "@prisma/client";

import { db } from "../db/db";
import { UserRepository } from "../repositories/userRepository";
import { AuthError, ConflictError, NotFoundError, ValidationError } from "../auth/authErrors";
import bcrypt from "bcryptjs";
import { jwtHandler } from "../auth/jwtHandler";


export class UserService {
  private userRepository = new UserRepository;
  
  async registerUser(username: string, password: string, email: string, telefono: number, direccion:string  ): Promise<{ user: User, token: string }> {

    await UserValidator.validate(username, password, email, telefono, direccion, this.userRepository);

    try {
      const hashed_password = await bcrypt.hash(password, 10);
      const user = await this.userRepository.createUser(username, email, hashed_password, telefono, direccion);

      const token = await jwtHandler.generateAccessToken({
        id: user.idUser,
        username: user.username,
        rol: user.rol as Rol
      });

      return {user, token};
    } catch (error) {
      throw new Error((error as any).message || "Error al crear el usuario. Mira los logs para más información.");
    }

  } 

  async loginUser(username: string, password: string): Promise<{ user: User, token: string }> {

    UserValidator.validateUsernameSintax(username);
    UserValidator.validatePassword(password);

    try {
      const user = await this.userRepository.getUserByUsername(username);
      if (!user) {
        throw new NotFoundError("Usuario o contraseña incorrectos.");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid || !user) {
        throw new NotFoundError("Usuario o contraseña incorrectos.");
      }

      const token = await jwtHandler.generateAccessToken({
        id: user.idUser,
        username: user.username,
        rol: user.rol as Rol
      });

      return {
        user,
        token
      };
    } catch (error) {
      if (error instanceof AuthError) {
        throw error
      } else {
        console.error(error);
        throw new Error("Error al iniciar sesión. Mira los logs para más información.");
      }
    }
  }

  async changeUserRol(username: string, newRole: Rol): Promise<User | null> {
    try {
      const user = await this.userRepository.getUserByUsername(username);
      if (!user) {
        throw new NotFoundError(`Usuario '${username}' no encontrado.`);
      }

      if (user.rol === newRole) {
        throw new ConflictError(`El usuario ya tiene el rol ${newRole}.`);
      }

      const updatedUser = await this.userRepository.changeUserRole(username, newRole);
      return updatedUser;

    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ConflictError) {
        throw error;
      } else {
        console.error(error);
        throw new Error("Error al cambiar el rol del usuario. Mira los logs para más información.");
      }

    }
  }

  async getAllUsers() {
    
    try {
      const users = await db.user.findMany()
      return users;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener usuarios. Mira los logs para más información.")
    }
  }

  async getUserByUsername(username: string) {
    try {
      const user = await this.userRepository.getUserByUsername(username);

      if (!user) {
        throw new Error(`No se encontró el usuario con username '${username}'`)
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new Error(`Error al obtener usuario con username '${username}'. Mira los logs para más información.`)
    }
  }

}




class UserValidator {
  static async validate(username: string, password: string, email: string, telefono: number, direccion:string, repository: UserRepository) {
    await UserValidator.validateUsername(username, repository);
    await UserValidator.validateEmail(email, repository);
    UserValidator.validatePassword(password);
    UserValidator.validateTelefono(telefono);
    UserValidator.validateDireccion(direccion); 
  }

  static async validateUsername(username: string, repository: UserRepository) {
    UserValidator.validateUsernameSintax(username);
    
    const existingUser = await repository.getUserByUsername(username);
    if (existingUser) {
      throw new ConflictError(`El usuario con username ${username} ya existe.`);
    }
  }

  static validateUsernameSintax(username: string) {
    if (!username) {
      throw new ValidationError("El username es obligatorio.");
    }

    let special_caracters = /[<>'"{}()\/\\]/ // Usamos regex (tema visto en redes) para que sea mas facil validar
    let sintax: boolean = (username.length >= 6 && !special_caracters.test(username))
    if (!sintax) {
      throw new ValidationError(`El username '${username}' no es válido. Debe tener al menos 6 caracteres y no contener caracteres especiales.`);
    }
  }


  static async validateEmail(email: string, repository: UserRepository) {
    if (!email) {
      throw new ValidationError("El email es obligatorio.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(email)) {
        throw new ValidationError(`El email '${email}' no tiene un formato válido.`);
      }

      const existingUser = await repository.getUserByEmail(email);
      if (existingUser) {
        throw new ConflictError(`Ese email ya esta registrado.`);
      }
  }

  static validatePassword(password: string) {
    if (!password) {
      throw new ValidationError("La contraseña es obligatoria.");
    }

    if (password.length < 8) {
      throw new ValidationError("La contraseña debe tener al menos 8 caracteres.");
    }
  }

  static validateTelefono(telefono: number) {
    if (!telefono) {
      throw new ValidationError("El teléfono es obligatorio.");
    }

    const telefonoRegex = /^\d{10}$/; // Validación simple para un número de teléfono de 10 dígitos
    if (!telefonoRegex.test(telefono.toString())) {
      throw new ValidationError("El teléfono debe ser un número de 10 dígitos.");
    }
  }

  static validateDireccion(direccion: string) {
    if (!direccion) {
      throw new ValidationError("La dirección es obligatoria.");
    }
  }
}
