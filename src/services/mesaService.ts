import { Mesa } from "@prisma/client";

import { db } from "../db/db";
import { UserRepository } from "../repositories/userRepository";
import { AuthError, ConflictError, NotFoundError, ValidationError } from "../auth/authErrors";
import bcrypt from "bcryptjs";
import { jwtHandler } from "../auth/jwtHandler";
import { MesaRepository } from "../repositories/mesaRepository";


export class MesaService {
  private mesaRepository = new MesaRepository;
  
  async getAllMesas() {
    try {
      const mesas = this.mesaRepository.getAllMesas();
      return mesas;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener usuarios. Mira los logs para más información.")
    }
  }

  async createMesa(id: number): Promise<Mesa | null> {
    try {
      const mesa = await this.mesaRepository.createMesa(id);
      return mesa;
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear la mesa. Mira los logs para más información.");
    }
  }

  async reservarMesa(id: number, idUser:string): Promise<Mesa | null> {
    try {
      const mesa = await this.mesaRepository.getMesaById(id);
      if (!mesa) {
        throw new NotFoundError("Mesa no encontrada.");
      }

      if (!mesa.disponible) {
        throw new ConflictError("La mesa ya está reservada.");
      }

      const updatedMesa = await this.mesaRepository.reservarMesa(id, idUser);

      return updatedMesa;
    } catch (error) {
        if (error instanceof AuthError) {
            throw error;
        } else {
            console.error(error);
            throw new Error("Error al reservar la mesa. Mira los logs para más información.");
        }

    }
  }

  async disponibilizarMesa(id: number) {
      try {
          const mesa = await this.mesaRepository.getMesaById(id);
          if (!mesa) {
              throw new NotFoundError("Mesa no encontrada.");
          }

          if (mesa.disponible) {
              throw new ConflictError("La mesa ya está disponible.");
          }

          const updatedMesa = await this.mesaRepository.disponibilizarMesa(id);
          return updatedMesa;
      } catch (error) {
          if (error instanceof AuthError) {
              throw error;
          } else {
              console.error(error);
              throw new Error("Error al disponibilizar la mesa. Mira los logs para más información.");
          }
      }
  }

}

