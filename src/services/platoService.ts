import { Categoria, Mesa, Plato } from "@prisma/client";

import { db } from "../db/db";
import { UserRepository } from "../repositories/userRepository";
import { AuthError, ConflictError, NotFoundError, ValidationError } from "../auth/authErrors";
import bcrypt from "bcryptjs";
import { jwtHandler } from "../auth/jwtHandler";
import { PlatoRepository } from "../repositories/platoRepository";


export class PlatoService {
  private platoRepository = new PlatoRepository;
  
  async getAllPlatos() {
    try {
      const platos = this.platoRepository.getAllPlatos();
      return platos;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener usuarios. Mira los logs para más información.")
    }
  }

  async createPlato(nombre: string, descripcion: string, precio: number, categoria: Categoria): Promise<Plato | null> {
    try {
      const mesa = await this.platoRepository.createPlato(nombre, descripcion, precio, categoria);
      return mesa;
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear la mesa. Mira los logs para más información.");
    }
  }

  async reservarMesa(id: number, idUser:string): Promise<Mesa | null> {
    try {
      const mesa = await this.platoRepository.getMesaById(id);
      if (!mesa) {
        throw new NotFoundError("Mesa no encontrada.");
      }

      if (!mesa.disponible) {
        throw new ConflictError("La mesa ya está reservada.");
      }

      const updatedMesa = await this.platoRepository.reservarMesa(id, idUser);

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
          const mesa = await this.platoRepository.getMesaById(id);
          if (!mesa) {
              throw new NotFoundError("Mesa no encontrada.");
          }

          if (mesa.disponible) {
              throw new ConflictError("La mesa ya está disponible.");
          }

          const updatedMesa = await this.platoRepository.disponibilizarMesa(id);
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

