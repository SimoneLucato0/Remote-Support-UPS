import axios from "axios";
import User from "src/model/User";

export const login = async (email: string, password: string) => {
  try {
    const apiResponse: any = await axios({
      method: "POST",
      //url: "https://reqres.in/api/login",
      url: `${process.env.REACT_APP_AUTH_ENDPOINT}/auth/login`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      /* data: {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      }, */

      data: { email, password },
    });

    if (apiResponse.status === 200) return apiResponse.data;
    return `Another error occurred - Code: ${apiResponse.status}`;
  } catch (error) {
    console.log(error);
  }
};
