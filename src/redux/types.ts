export type IUser = {
    "location": {
        "type": "Point"
    },
    "_id": string,
    "email": string,
    "__v": 0,
    "belt_rank": string | null,
    "competition": string | null,
    "contact": string,
    "createdAt": string,
    "disciplines": string[],
    "favourite_quote": string | null,
    "first_name": string,
    "height": {
        "amount": number,
        "category": string,
        "_id": string
    },
    "home_gym": null | string,
    "image": string | null,
    "last_name": string | null,
    "weight": string,
    role : "admin",
    status : 1 | 0
}

export interface ISchedule { day: string, from: number, from_view : string, to: number, to_view : string }
export interface IClsSchedule { name : string, day: string, from: number, from_view : string, to: number, to_view : string }

export interface IGym {
    _id : string
    images: { key: string; url: string, _id : string }[],
    name: string,
    description: string,
    street: string,
    state: string,
    city: string,
    zip_code: string,
    phone: string,
    email: string,
    website: string,
    facebook: string,
    instagram: string,
    mat_schedules: ISchedule[],
    class_schedules: IClsSchedule[],
    disciplines: string[],

    isClaimed: boolean,

    user: IUser,

    location: { type: string, coordinates: number[] }
}

export interface ICalimRes {
    "_id": string,
    "email": string,
    "phone": string,
    "gym": null | IGym,
    "user": IUser,
    "business_license": {
        "key": string,
        "url": string,
        "_id": string
    },
    "utility_bill": {
        "key": string,
        "url": string,
        "_id": string
    },
    "tax_document": {
        "key": string,
        "url": string,
        "_id": string
    },
    "status": "approved" | "rejected" | "pending",
    createdAt : Date
}

export interface IMeta {
    "page": number,
    "limit": number,
    "total": number,
    "totalPage": number
}

export interface IEarning {
    "_id": string,
    "clientName": string,
    "amount": number,
    "transactionDate": string,
    "createdAt": string,
}

export interface IAdminStats {
    "totalUsers": number,
    totalGym: number
}
export interface INotification {
    _id: string
    title: string,
    message: string,
    "isRead": boolean,
    "createdAt": string,
    "updatedAt": string,
    "__v": 0
}

export interface IStore {
    _id: string
    name: string,
    cover_photo: string,
    photo: string,
    open_time: string,
    address: string,

    location: { type: string, coordinates: number[] },

    status: "pending" | "approved" | "rejected",
    user: IUser,
    "createdAt": string,
    "updatedAt": string,
}

export interface IProduct {
    title: string;
    category: "womens_clothes" | "mens_clothes" | "health/beauty" | "purses" | "accessories",
    sub_category: string | null
    images: string[],
    brand: { name: string, _id: string } | null,
    price: number,
    quantity: number,
    details: string,
    // location : {type : string, coordinates : number[]}
    sizes: string[],
    colors: string[],
    isDeleted: boolean,
    user: IUser,
    store: IStore,
    total_views: number,

    could_not_find_reqs: IUser[]
    bought_reqs: { user: IUser, type: "available" | "unavailable" }[],
    "avgRating": number,
    "reviewCount": number,
}

export interface Icontact {
    _id: string
    firstName: string;
    lastName: string;
    email: string;
    contact: string;
    description: string;
    isReplied: boolean;
    reply_message: null | string,
    replied_At: Date
}

export interface IReport {
    _id: string,
    product: IProduct,
    user: IUser,
    reason: string,
    status: "pending" | "resolved",
    createdAt: Date
}

export interface IBrand {
    _id: string,
    name: string,
    status: "pending" | "approved" | "rejected"
}