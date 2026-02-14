'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import addAddress from './_action/addAddress'
import { schema } from '@/Schema/addAddress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Adress() {


    const [loading, setLoading] = useState(false);
    const [addAddressStatus, setAddAddressStatue] = useState(null);
    const [addAddressMessage, setAddAddressMessage] = useState(null);
    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            details: '',
            phone: '',
            city: ''
        },
        resolver: zodResolver(schema)
    });
    async function addUserAddress(userDate: unknown) {
        setLoading(true);
        const data = await addAddress(userDate);
        setAddAddressStatue(data.status);
        setAddAddressMessage(data.message);
        setLoading(false);
    }


    return <>
        <div className='w-ful p-5'>
            <Card className="w-full py-5">
                <CardHeader>
                    <CardTitle
                        className="text-center text-4xl font-bold">Add Address</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(addUserAddress)} >
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input aria-invalid={Boolean(errors.name)} className="text-black" {...register("name")} id="name" type="text" placeholder="Ahmed ali" required />

                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="city">City</Label>
                                <Input aria-invalid={Boolean(errors.city)} className="text-black" {...register("city")} id="city" type="tel" required />
                                {errors.city && (
                                    <p className="text-red-500 text-sm">{errors.city.message}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="details">Details</Label>
                                <Input aria-invalid={Boolean(errors.details)} className="text-black" {...register("details")} id="details" type="text" placeholder="m@example.com" required />
                                {errors.details && (
                                    <p className="text-red-500 text-sm">{errors.details.message}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input aria-invalid={Boolean(errors.phone)} className="text-black" {...register("phone")} id="phone" type="tel" required />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm">{errors.phone.message}</p>
                                )}
                            </div>
                            <div className="flex-col gap-2">
                                <Button type="submit" className="w-full cursor-pointer">
                                    {loading ? <Loader2 className="animate-spin" /> : 'Add'}
                                </Button>
                                {loading == false ? <p className={addAddressStatus == 'success' ? "text-green-500 text-center text-md mt-3" : "text-red-500 text-center text-md mt-3"}>{addAddressMessage}</p> : null}
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </>
}
