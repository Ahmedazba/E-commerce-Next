'use client'
import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from '@/Schema/changeUserPassword'
import { changeUserPassword } from './_action/changeUserPassword'
import { Loader2 } from 'lucide-react'


export default function ChangeUserPassword() {

    const [loading, setLoading] = useState(false);
    const [updateDate, setUpdateDate] = useState(null);

    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {
            currentPassword: '',
            password: '',
            rePassword: '',
        },
        resolver: zodResolver(schema)
    });

    async function updataPassword(userDate: ChangeUserPasswordI) {
        setLoading(true);
        const data = await changeUserPassword(userDate);
         setUpdateDate(data.message);
      
        setLoading(false);


    }



    return <>

        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex-1 cursor-pointer">
                    Change Password
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4 py-4" onSubmit={handleSubmit(updataPassword)}>
                    <div>
                        <Label className="p-3">Current Password</Label>
                        <Input type="password"  {...register("currentPassword")} aria-invalid={Boolean(errors.currentPassword)} />
                        {errors.currentPassword && (
                            <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>
                        )}
                    </div>
                    <div>
                        <Label className="p-3">New Password</Label>
                        <Input type="password" {...register("password")} aria-invalid={Boolean(errors.password)} />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>  
                    <div>
                        <Label className="p-3">Confirm New Password</Label>
                        <Input type="password"  {...register("rePassword")} aria-invalid={Boolean(errors.rePassword)} />
                        {errors.rePassword && (
                            <p className="text-red-500 text-sm">{errors.rePassword.message}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="submit" className='cursor-pointer'>{loading ? <Loader2 className='animate-spin' /> : "Update"}</Button>
                    </DialogFooter>
                    <p className='text-center'>{updateDate}</p>
                </form>

            </DialogContent>
        </Dialog>


    </>
}
