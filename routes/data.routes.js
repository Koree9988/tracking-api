import { DataController } from "../controllers/data.controllers.js";
export function dataRoutes(fastify, option, done) {
  fastify.get(
    "/all",
    {
      schema: {
        description: "Get data waiting for update",
        tags: ["data"],
      },
    },
    DataController.getDailyData
  );
  fastify.put(
    "/summary",
    {
      schema: {
        description: "Create or update summary data",
        tags: ["data"],
        body: {
          type: "object",
          required: [],
          properties: {
            numberOfUser: {
              type: "number",
              description: "Number of user",
            },
            numberOfPeople: {
              type: "number",
              description: "Number of people",
            },
          },
        },
      },
    },
    DataController.updateDailyData
  );

  fastify.put(
    "/raw",
    {
      schema: {
        description: "Update or create user raw data",
        tags: ["data"],
        body: {
          type: "object",
          required: ["userId"],
          properties: {
            userInFrame: {
              type: "boolean",
              description: "Have user in frame or not",
            },
            userOutFrame: {
              type: "boolean",
              description: "Have user out frame or not",
            },
            userId: {
              type: "string",
              description: "Device detected ID of user",
            },
            zone: {
              type: "string",
              description: "Zone of user",
            },
          },
        },
      },
    },
    DataController.updateRawData
  );

  done();
}
