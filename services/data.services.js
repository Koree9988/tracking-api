import { config } from "../config.js";
import { prisma } from "./prisma.client.js";
const machineId = config.MECHINE_ID;
export const DataService = {
  getAllDailyData: async (where) => {
    return await prisma.dailyData.findMany({
      where: where,
    });
  },
  getAllRawData: async (where) => {
    return await prisma.dailyData.findMany({
      where: where,
    });
  },
  createDailyData: async (data) => {
    return await prisma.$transaction(async (tx) => {
      const dailyData = await tx.dailyData.findFirst({
        where: data,
      });
      if (dailyData) return dailyData;
      return await tx.dailyData.create({
        data: data,
      });
    });
  },
  getByMachineId: async () => {
    return await prisma.dailyData.findMany({
      where: {
        machineId: machineId,
      },
    });
  },
  updateDailyData: async (data, updateData) => {
    return await prisma.$transaction(async (tx) => {
      const dailyData = await tx.dailyData.findFirst({
        where: data,
      });
      if (dailyData) {
        return await tx.dailyData.update({
          where: {
            id: dailyData.id,
          },
          data: updateData,
        });
      }
      const createdData = await tx.dailyData.create({
        data: data,
      });
      return await tx.dailyData.update({
        where: {
          id: createdData.id,
        },
        data: updateData,
      });
    });
  },
};
