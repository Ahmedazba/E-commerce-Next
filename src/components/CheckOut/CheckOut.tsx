"use client";
import React, { useRef } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input"; 
import { FieldGroup, Field } from "../ui/field";

export default function CheckOut({ cartId }: { cartId: string }) {
  const detailsInput = useRef<HTMLInputElement | null>(null);
  const phoneInput = useRef<HTMLInputElement | null>(null);
  const cityInput = useRef<HTMLInputElement | null>(null);
  //CheckOut
  async function checkOutSession() {
    const shippingAddress = {
      details:detailsInput.current?.value,
      phone:phoneInput.current?.value,
      city:cityInput.current?.value,
    };
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2JlMzEyYzUzODE4YjBiZmMyNDVhMSIsIm5hbWUiOiJBaG1lZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY5NzI2ODExLCJleHAiOjE3Nzc1MDI4MTF9.MnrO_19FXqUzZPLpIyDySjEHTZWFlk3dkXlzcMe1YI8",
          "content-type": "application/json",
        },
      },
    );

    const data = await response.json();
    console.log(data);
    if (data.status == 'success') {
        location = data.session.url
    }
  }
  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-100 mb-6 cursor-pointer">
              Proceed to Checkout
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Add Address</DialogTitle>
              <DialogDescription>
                Add a shipping address for your deliveries.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="Details">Details :</Label>
                <Input ref={detailsInput} id="Details" name="Details" />
              </Field>
              <Field>
                <Label htmlFor="Phone">Phone :</Label>
                <Input ref={phoneInput} id="Phone" name="Phone" />
              </Field>
              <Field>
                <Label htmlFor="City">City :</Label>
                <Input ref={cityInput} id="City" name="City" />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={()=>checkOutSession()}>Checout</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
