import { baseUrl } from "../utils/Constants.utils"

const userUrl = `${baseUrl}/product`
export const productRoutes = {
    show: `${userUrl}/show`,
    add: `${userUrl}/add`,
    edit: `${userUrl}/edit`,
    uploadImg: `${userUrl}/uploadImg`
}