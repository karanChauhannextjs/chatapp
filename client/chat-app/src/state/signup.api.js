import { API } from "@/axios/api";
import instance from "@/axios/intance";

export const Signup = async (body) => {
  console.log(body, "body1234");
  const response = await instance.post(API.auth.register, body);
  console.log(response, "response1234");
  return response.data;
};
