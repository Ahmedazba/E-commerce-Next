'use client'
import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from '@/Schema/editProfile'
import { updateProfile } from './_action/editProfile'
import { Loader2 } from 'lucide-react'

import { signOut, useSession } from 'next-auth/react'
export default function EditProfile() {

  const [loading, setLoading] = useState(false);
  const [updateDate, setUpdateDate] = useState(null);


  const session = useSession();

  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
    resolver: zodResolver(schema)
  });

  async function editProfile(userDate: EditProfileI) {
    setLoading(true);
    const data = await updateProfile(userDate);

    setUpdateDate(data.message);


    if (data.message == 'success') {
      signOut({ callbackUrl: "/login" });
    }
    setLoading(false);


  }


  return <>

    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1 cursor-pointer">Edit Info</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Info</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(editProfile)} className="grid gap-4 py-4">
          <div>
            <Label className="p-3">Full Name</Label>
            <Input  type='text'  {...register("name")} aria-invalid={Boolean(errors.name)} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label className="p-3">Email</Label>
            <Input defaultValue={session.data?.user.email} type='email'  {...register("email")} aria-invalid={Boolean(errors.email)} />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label className="p-3">Phone</Label>
            <Input type='phone'  {...register("phone")} aria-invalid={Boolean(errors.phone)} />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button className='cursor-pointer' type="submit">{loading ? <Loader2 className='animate-spin' /> : "Save"}</Button>
          </DialogFooter>
          <p className='text-center'>{updateDate}</p>
        </form>

      </DialogContent>
    </Dialog>

  </>
}
