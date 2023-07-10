import { config } from "../config.js";
import moment from "moment";
import { DataService } from "../services/data.services.js";
const machineId = config.MECHINE_ID;

export const DataController = {
  getDailyData: async (req, reply) => {
    const date = new Date();
    const date2 = new Date(String(moment(date).subtract(1, "days")));
    const strDate = new Date(
      date.toLocaleDateString("en-CA", {
        timeZone: "Asia/Bangkok",
      })
    );
    const strDate2 = new Date(
      date2.toLocaleDateString("en-CA", {
        timeZone: "Asia/Bangkok",
      })
    );
    const where = {
      machineId: machineId,
      storeStatus: false,
      createdAt: {
        gte: strDate2,
        lt: strDate,
      },
    };

    const summary = await DataService.getAllDailyData(where);
    const data = await DataService.getAllRawData(where);
    reply.send({ summary: summary, data: data });
  },
  updateDailyData: async (req, reply) => {
    const updatedDate = new Date();
    updatedDate.setHours(4);
    updatedDate.setMinutes(0);
    updatedDate.setSeconds(0);
    const data = {
      machineId: machineId,
      timestamp: updatedDate,
    };
    const updateData = {
      numberOfUser: {
        increment: req.body.numberOfUser ? req.body.numberOfUser : 0,
      },
      numberOfPeople: {
        increment: req.body.numberOfPeople ? req.body.numberOfPeople : 0,
      },
      timestamp: updatedDate,
    };
    const dailyRec = await DataService.updateDailyData(data, updateData);
    reply.send(dailyRec);
  },

  updateRawData: async (req, reply) => {
    const reqData = req.body;
    const data = {
      machineId: machineId,
      userId: reqData.userId,
      zone: reqData.zone ? reqData.zone : null,
    };
    if (reqData?.userInFrame) {
      // const {createData,...updateData} = data
      // reply.send(await DataService.updateDailyData(data));
    }
  },
};
