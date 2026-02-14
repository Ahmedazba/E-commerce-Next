


import * as zod from 'zod'

export const schema = zod.object({

       
  currentPassword: zod.string().nonempty("Current Password is required")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ , "Invaild password"),
  password: zod.string().nonempty("Password is required")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ , "Invaild password"),
        
  rePassword: zod.string().nonempty("Confirm password is required"),

  
}).refine((date) => date.password === date.rePassword , {path:["rePassword"] , message:"Password and confirm password dont match"});