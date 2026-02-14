

'use client'

import { schema } from "@/Schema/resetCode";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import verifyResetPassword from "./_action/verifyResetPassword";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function ResetCode() {

    const [loading, setLoading] = useState(false);

    const [signUpData, setSignUpData] = useState(null);
    const router = useRouter();
    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {

            resetCode: '',
        },
        resolver: zodResolver(schema)
    });

    async function verifyResetUserPassword(userDate: ResetCodeI) {
        setLoading(true);

        const res = await verifyResetPassword(userDate.resetCode);



        setSignUpData(res.status);
        if (res.status == 'Success') {
            router.push("/change-password");
        }



        setLoading(false);
    }

    return <>


        <div className='max-h-[70vh] mt-10 flex flex-col justify-center items-center gap-8'>
            <Card className="w-full max-w-sm py-5">
                <CardHeader>
                    <CardTitle className="text-center text-4xl font-bold">Reset Code</CardTitle>
                </CardHeader>
                <CardContent>


                    <form onSubmit={handleSubmit(verifyResetUserPassword)} >
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">

                                <Input aria-invalid={Boolean(errors.resetCode)} className="text-black" {...register("resetCode")} id="resetCode" type="text" placeholder="123456" required />
                                {errors.resetCode && (
                                    <p className="text-red-500 text-sm">{errors.resetCode.message}</p>
                                )}
                            </div>
                            <div className="flex-col gap-2">
                                <Button type="submit" className="w-full cursor-pointer">
                                    {loading ? <Loader2 className="animate-spin" /> : 'Submit'}
                                </Button>
                            </div>
                            <p className='text-center text-black'>{signUpData}</p>
                        </div>
                    </form>

                </CardContent>
            </Card>
        </div>

    </>
}
