
import * as zod from 'zod'

export const schema = zod.object({

  email: zod.string().nonempty("Email is required")
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , "Invaild email")
       
})