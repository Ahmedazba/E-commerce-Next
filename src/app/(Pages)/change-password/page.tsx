'use client'
import { schema } from "@/Schema/changePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import resetPassword from "./_action/resetPassword";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";





export default function ChangePassword() {
    const [loading, setLoading] = useState(false);
   
    const [signUpData, setSignUpData] = useState(null);
    const router = useRouter();

    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {

            email: '',
            newPassword: '',
        },
        resolver: zodResolver(schema)
    });

    async function resetUserPassword(userDate: ResetPasswordData) {
        setLoading(true);
        const res = await resetPassword(userDate.email, userDate.newPassword);
       
        setSignUpData(res.message);
        if (res.token) {
            router.push("/login");
        }

        setLoading(false);

    }


    return (
        <div className= 'max-h-[70vh] mt-10 flex flex-col justify-center items-center gap-8'>
            <Card className="w-full max-w-sm py-5">
                <CardHeader>
                    <CardTitle className="text-center text-4xl font-bold">Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(resetUserPassword)} >
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input aria-invalid={Boolean(errors.email)} className="text-black" {...register("email")} id="email" type="email" placeholder="m@example.com" required />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input aria-invalid={Boolean(errors.newPassword)} className="text-black" {...register("newPassword")} id="newPassword" type="password" placeholder="Ali@123" required />
                                {errors.newPassword && (
                                    <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
                                )}

                            </div>
                            <div className="flex-col gap-2">
                                <Button type="submit" className="w-full cursor-pointer">
                                    {loading ? <Loader2 className="animate-spin" /> : 'Save'}
                                </Button>
                            </div>
                            <p className='text-center text-black'>{signUpData}</p>
                        </div>
                    </form>



                </CardContent>
            </Card>
        </div>
    )
}
