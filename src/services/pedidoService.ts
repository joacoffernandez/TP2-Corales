import { Estado, Mesa, PedidoCab, Plato } from "@prisma/client";

import { db } from "../db/db";
import { UserRepository } from "../repositories/userRepository";
import { AuthError, ConflictError, NotFoundError, ValidationError } from "../auth/authErrors";
import bcrypt from "bcryptjs";
import { jwtHandler } from "../auth/jwtHandler";
import { PedidoRepository } from "../repositories/pedidoRepository";
import { PlatoRepository } from "../repositories/platoRepository";


export class PedidoService {
  private pedidoRepository = new PedidoRepository;
  private userRepository = new UserRepository;
  private platoRepository = new PlatoRepository;
  
  async getAllPedidosCab() {
    try {
      const pedidos = this.pedidoRepository.getAllPedidosCab();
      return pedidos;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener usuarios. Mira los logs para más información.")
    }
  }

  async getPedidosDetByCab(idPedidoCab: string) {
    try {
      const pedidos = this.pedidoRepository.getPedidosDetByCab(idPedidoCab);
      return pedidos;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener usuarios. Mira los logs para más información.")
    }
  }

  private async calcularDescuento(userId: string): Promise<number> {
    try {
      const user = await this.userRepository.getUserById(userId);
      if (!user) {
        throw new NotFoundError("Usuario no encontrado.");
      }

      const pedidos = await this.pedidoRepository.getPedidosByUserId(userId);
      if (pedidos.length <= 3) {
        return 1; // porcentaje pasado a numero
      } else if (pedidos.length <= 5) {
        return 0.9; // 10% --> 0.1
      } else {
        return 0.8; // 20% --> 0.2
      }

    } catch (error) {
      console.error(error);
      throw new Error("Error al calcular el descuento. Mira los logs para más información.");
    }
  }

  async createPedido(userId: string, direccion: string, platos: string[]): Promise<PedidoCab | null> {
    try {
      if (!userId || !platos || platos.length === 0) {
        throw new ValidationError("Datos inválidos para crear el pedido.");
      }

      if (!direccion) {
        const user = await this.userRepository.getUserById(userId) 
        direccion = user?.direccion || "";
      }

      const descuento = await this.calcularDescuento(userId);

      const pedido = await this.pedidoRepository.createPedidoCab(userId, direccion, descuento);
      if (!pedido) {
        throw new Error("No se pudo crear el pedido.");
      }

      let montoTotal = 0;
      for (let name of platos) {
        const platoExists = await this.platoRepository.getPlatoByNombre(name);
        if (!platoExists) {
          throw new NotFoundError(`Plato con nombre ${name} no encontrado.`);
        }
        await this.pedidoRepository.createPedidoDet(pedido.idPedidoCab, platoExists.idPlato);
        montoTotal += platoExists.precio;
      }

      const updatedPedido = await this.pedidoRepository.updatePedidoCab(pedido.idPedidoCab, montoTotal*descuento);

      return updatedPedido;
    } catch (error) {
        if (error instanceof ValidationError || error instanceof NotFoundError) {
            throw error;
        } else {
            console.error(error);
            throw new Error("Error al crear el pedido. Mira los logs para más información.");
        }

    }
  }

  async updateEstadoPedido(idPedidoCab: string, estado: Estado): Promise<PedidoCab | null> {
    try {
      const pedido = await this.pedidoRepository.getPedidoCabById(idPedidoCab);
      if (!pedido) {
        throw new NotFoundError("Pedido no encontrado.");
      }

      const updatedPedido = await this.pedidoRepository.updateEstadoPedidoCab(idPedidoCab, estado);
      return updatedPedido;
    } catch (error) {
      console.error(error);
      throw new Error("Error al actualizar el estado del pedido. Mira los logs para más información.");
    }
  }

}

