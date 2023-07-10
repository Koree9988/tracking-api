import axios from "axios";
export const ConfigInterval = {
  getInterval: async () => {
    return axios
      .get("http://localhost:3030/interval")
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return null;
      });
  },
};
