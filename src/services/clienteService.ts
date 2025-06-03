import { Cliente } from "@prisma/client";

import { db } from "../db/db";

interface CreateClienteBody {
  username: string,
  email: string,
  password: string,
  telefono: number,
}

export class ClienteService {
  async createCliente(body: CreateClienteBody) {
  } 

  async getAllUsers() {
    try {
      const users = await db.cliente.findMany({
        where: {
          deletedAt: null
        },
        include: {
          posts: true
        }
      })

      return users;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener usuarios. Mira los logs para más información.")
    }
  }

  async getUserById(userId: string) {
    try {
      const user = await db.cliente.findFirst({
        where: {
          id: userId,
          deletedAt: null
        },
        include: {
          posts: true
        }
      })

      if (!user) {
        throw new Error(`No se encontró el usuario con id ${userId}`)
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new Error(`Error al obtener usuario con id ${userId}. Mira los logs para más información.`)
    }
  }

}

class UserValidator {
    function validate(body:CreateClienteBody) {
        
        let state = validateUsername()
    }

    function validateUsername(username: string) {
        let special_caracters = /[<>'"{}()\/\\]/ // Usamos regex (tema visto en redes) para que sea mas facil validar
        let state:boolean = true
        if (username.length < 6 && special_caracters.test(username)) {
            
        }
    }
}