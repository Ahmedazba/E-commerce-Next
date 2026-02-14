"use client"


import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



import { useSession } from "next-auth/react"
import ChangeUserPassword from "@/components/ChangeUserPassword/ChangeUserPassword"
import EditProfile from "@/components/EditProfile/EditProfile"

export default function Profile() {

  const session = useSession();

 
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="flex items-center gap-4">
          <Avatar className="h-16 w-16">

            <AvatarFallback className="text-white text-3xl uppercase bg-amber-500">{session?.data?.user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{session?.data?.user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{session?.data?.user.email}</p>
          </div>
        </CardHeader>

        <CardContent className="mt-6 grid gap-4">
          <div className="p-4 border rounded-lg">
            <p className="text-xs text-muted-foreground">Full Name</p>
            <p className="mt-1 font-medium">{session?.data?.user.name}</p>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="mt-1 font-medium">{session?.data?.user.email}</p>
          </div>

          <div className="flex gap-2 mt-4">
            {/* Edit Info */}
            <EditProfile/>

            {/* Change Password */}
            <ChangeUserPassword/>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
