import axios from "axios";
import { authorization } from "./authorization";

export const getAccessRoles = async () => {
    return axios.get('/api/accesses', authorization());
};
