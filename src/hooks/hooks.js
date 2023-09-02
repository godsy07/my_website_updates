import { useQuery } from "react-query"
import { fetchApiData } from "../api/api"
import { BASE_URL } from "../config/config"

export const useGetAllUsers = () => {
    return useQuery('apiData', () => fetchApiData(`${BASE_URL}/user/get-all-users`));
}

export const useGetAllProjects = () => {
    return useQuery('apiData', () => fetchApiData(`${BASE_URL}/project/get-all-projects`));
}

