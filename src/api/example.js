import { authorization } from "./authorization";
import { api } from "./index";

export const getExample = () => {
  return api.get(`/example`, authorization());
};

export const createExample = (data) => {
  return api.post(`/example`, data, authorization());
};

export const getExampleById = (Id) => {
  return api.get(`/example/${Id}`, authorization());
};
