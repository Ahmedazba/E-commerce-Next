


import * as zod from 'zod'

export const schema = zod.object({
  name: zod.string().nonempty("Name is required")
        .min(3 , "Name must be at least 3 characters long")
        .max(20 , "Name must be no more than 20 characters long"),
  email: zod.string().nonempty("Email is required")
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , "Invaild email"),

  phone: zod.string().nonempty("Phone is required"),
})