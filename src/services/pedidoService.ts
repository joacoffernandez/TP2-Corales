import { Mesa } from "@prisma/client";

import { db } from "../db/db";
import { UserRepository } from "../repositories/userRepository";
import { AuthError, ConflictError, NotFoundError, ValidationError } from "../auth/authErrors";
import bcrypt from "bcryptjs";
import { jwtHandler } from "../auth/jwtHandler";
import { MesaRepository as PedidoRepository } from "../repositories/mesaRepository";


export class PedidoService {
  private pedidoRepository = new PedidoRepository;
  
  async getAllPedidos() {
    try {
      const pedidos = this.pedidoRepository.getAllPedidos();
      return pedidos;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener usuarios. Mira los logs para más información.")
    }
  }

  async createPedido(id: number, capacidad: number): Promise<Mesa | null> {
    try {
      const mesa = await this.pedidoRepository.createMesa(id, capacidad);
      return mesa;
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear la mesa. Mira los logs para más información.");
    }
  }

  async reservarMesa(id: number, idUser:string): Promise<Mesa | null> {
    try {
      const mesa = await this.pedidoRepository.getMesaById(id);
      if (!mesa) {
        throw new NotFoundError("Mesa no encontrada.");
      }

      if (!mesa.disponible) {
        throw new ConflictError("La mesa ya está reservada.");
      }

      const updatedMesa = await this.pedidoRepository.reservarMesa(id, idUser);

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

}

