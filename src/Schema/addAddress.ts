


import * as zod from 'zod'

export const schema = zod.object({
    name: zod.string().nonempty("Name is required")
        .min(3, "Name must be at least 3 characters long")
        .max(20, "Name must be no more than 20 characters long"),
    details: zod.string().nonempty("details is required")
        .min(3, "details must be at least 3 characters long")
        .max(40, "details must be no more than 20 characters long"),
    phone: zod.string().nonempty("Phone is required"),
    city: zod.string().nonempty("city is required")
        .min(3, "city must be at least 3 characters long")
        .max(20, "city must be no more than 20 characters long"),

})