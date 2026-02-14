"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { schema } from "@/Schema/register"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signUp } from "./_action/signUp.action"
import { useState } from "react"
import { Loader2 } from "lucide-react"

import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Register() {


  const [loading, setLoading] = useState(false);
  const [signUpData, setSignUpData] = useState(null);
  const router = useRouter();

  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    resolver: zodResolver(schema)
  });

  async function signUpUser(userDate: RegisterDataI) {
    setLoading(true);
    const data = await signUp(userDate);
   
    setSignUpData(data.message);

    if (data.message == 'success') {
      router.push("/login");
    }
    setLoading(false);


  }


  return (
    <div className='min-h-dvh flex flex-col justify-center items-center gap-8'>
      <Card className="w-full max-w-sm py-5">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold">Register</CardTitle>


        </CardHeader>



        <CardContent>
          <form onSubmit={handleSubmit(signUpUser)} >
            <div className="flex flex-col gap-6">


              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input aria-invalid={Boolean(errors.name)} className="text-black" {...register("name")} id="name" type="text" placeholder="Ahmed Azab" required />

                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>


              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input aria-invalid={Boolean(errors.email)} className="text-black" {...register("email")} id="email" type="email" placeholder="ahmed55@example.com" required />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>




              <div className="grid gap-2">

                <Label htmlFor="password">Password</Label>
                <Input aria-invalid={Boolean(errors.password)} className="text-black" {...register("password")} id="password" type="password" placeholder="******" required />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
              <div className="grid gap-2">

                <Label htmlFor="repassword">Confirm Password</Label>


                <Input aria-invalid={Boolean(errors.rePassword)} className="text-black" {...register("rePassword")} id="repassword" type="password" placeholder="******" required />
                {errors.rePassword && (
                  <p className="text-red-500 text-sm">{errors.rePassword.message}</p>
                )}

              </div>
              <div className="grid gap-2">

                <Label htmlFor="phone">phone</Label>


                <Input aria-invalid={Boolean(errors.phone)} className="text-black" {...register("phone")} id="phone" type="tel" placeholder="0123456789" required />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              <div className="flex-col gap-2">
                <Button type="submit" className="w-full cursor-pointer">
                  {loading ? <Loader2 className="animate-spin" /> : 'Sign Up'}
                </Button>
                {loading == false ? <p className={signUpData == 'success' ? "text-green-500 text-center text-md mt-3" : "text-red-500 text-center text-md mt-3"}>{signUpData}</p> : null}
              </div>
              <span>Do you have an account <Link href={'/login'}>Login</Link></span>


            </div>
          </form>
        </CardContent>




      </Card>
    </div>
  )
}
