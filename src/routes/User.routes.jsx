import { baseUrl } from "../utils/Constants.utils"

const userUrl = `${baseUrl}/user`
export const userRoutes = {
    login: `${userUrl}/login`,
    register: `${userUrl}/register`,
    profile: `${userUrl}/profile`
}