import Fastify from "fastify";
import { config } from "./config.js";
import routes from "./routes/index.js";
import swagger from "@fastify/swagger";
import cron from "node-cron";
import { ConfigInterval } from "./services/config.interval.js";

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "SYS:yyyy-mm-dd HH:MM:ss Z",
        ignore: "pid,hostname,reqId,responseTime,req,res",
        colorize: true,
        customColors: "error:red,info:blue",
        messageFormat: "{msg} [id={reqId} {req.method} {req.url}]",
      },
    },
  },
});

fastify.register(swagger, {
  routePrefix: "/swagger",
  swagger: {
    info: {
      title: "Test swagger",
      description: "testing the fastify swagger api",
      version: "0.1.0",
    },
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
  hideUntagged: true,
  exposeRoute: true,
});

fastify.register(routes.dataRoutes, { prefix: "/api" });

const start = async () => {
  try {
    fastify.listen({ port: config.port, host: config.host });
    const intervalTime = config.INTERVAL_TIME;
    const storeInterval = config.STORE_INTERVAL;
    let interval = await ConfigInterval.getInterval();
    let time = interval ? interval : storeInterval; //set time for cron job subTask
    let subTask;
    const serviceUpdate = () => {
      console.log(new Date()); //update data to cloud database
    };
    const option = {
      timezone: "Asia/Bangkok",
    };
    async function UpdateIntervalTime() {
      interval = await ConfigInterval.getInterval();
      if (subTask && interval != time) {
        subTask.stop();
        // console.log("🚀  stop subTask");
        time = interval ? interval : time;
        // console.log("🚀  new interval time:", time);
        subTask = undefined;
      }
      subTask = cron.schedule(time, serviceUpdate, option);
      // console.log("🚀  start subTask");
    }
    UpdateIntervalTime();

    cron.schedule(intervalTime, UpdateIntervalTime, option); //mainTask for check interval time
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

export default fastify;
