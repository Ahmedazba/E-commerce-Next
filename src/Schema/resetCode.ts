

import * as zod from 'zod'

export const schema = zod.object({

 
   resetCode: zod.string()
    // 1. يجب أن يكون موجوداً
    .nonempty("Reset code is required")
    // 2. يجب أن يتكون من 6 أرقام على الأقل (كمثال شائع)
    .min(5, "Reset code must be at least 6 characters"),
})