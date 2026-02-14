// // import { Button } from "@/components/ui/button";
// // import {
// //   Dialog,
// //   DialogClose,
// //   DialogContent,
// //   DialogDescription,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/components/ui/dialog";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { getUserToken } from "@/Helpers/accessToken";
// // import { Loader2 } from "lucide-react";

// // import { useRef, useState } from "react";

// // export function Checkout({ cartId }: { cartId: string }) {
// //   const [loadingVisa, setLoadingVisa] = useState(false);
// //   const [loadingCash, setLoadingCash] = useState(false);

// //   const cityInput = useRef<HTMLInputElement | null>(null);
// //   const detailsInput = useRef<HTMLInputElement | null>(null);
// //   const phoneInput = useRef<HTMLInputElement | null>(null);

// //   async function checkoutSession() {
// //     const token = await getUserToken();
// //     setLoadingVisa(true);

// //     const shippingAddress = {
// //       details: detailsInput.current?.value,
// //       phone: phoneInput.current?.value,
// //       city: cityInput.current?.value,
// //     };
// //     const response = await fetch(
// //       `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://buy-via.vercel.app`,
// //       {
// //         method: "POST",
// //         body: JSON.stringify({ shippingAddress }),
// //         headers: {
// //           token: token + "",
// //           "Content-Type": "application/json",
// //         },
// //       },
// //     );

// //     const data = await response.json();
// //     if (data.status == "success") {
// //       location.href = data.session.url;
// //       setLoadingVisa(false);
// //     }
// //   }

// //   async function checkoutCash() {
// //     const token = await getUserToken();
// //     setLoadingCash(true);

// //     const shippingAddress = {
// //       details: detailsInput.current?.value,
// //       phone: phoneInput.current?.value,
// //       city: cityInput.current?.value,
// //     };
// //     const response = await fetch(
// //       `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
// //       {
// //         method: "POST",
// //         body: JSON.stringify({ shippingAddress }),
// //         headers: {
// //           token: token + "",
// //           "Content-Type": "application/json",
// //         },
// //       },
// //     );

// //     const data = await response.json();

// //     if (data.status == "success") {
// //       location.href = "/allorders";
// //       setLoadingCash(false);
// //     }
// //   }

// //   return (
// //     <Dialog>
// //       <form>
// //         <DialogTrigger asChild>
// //           <button className="w-full rounded-full bg-black text-white py-1 font-medium hover:opacity-90 transition cursor-pointer">
// //             Proceed to Checkout
// //           </button>
// //         </DialogTrigger>
// //         <DialogContent className="sm:max-w-[425px]">
// //           <DialogHeader>
// //             <DialogTitle>Add Shipping Address</DialogTitle>
// //             <DialogDescription>
// //               Make changes to your profile here. Click save when you&apos;re
// //               done.
// //             </DialogDescription>
// //           </DialogHeader>
// //           <div className="grid gap-4">
// //             <div className="grid gap-3">
// //               <Label htmlFor="city">City</Label>
// //               <Input ref={cityInput} id="city" />
// //             </div>
// //             <div className="grid gap-3">
// //               <Label htmlFor="details">Details</Label>
// //               <Input ref={detailsInput} id="details" />
// //             </div>
// //             <div className="grid gap-3">
// //               <Label htmlFor="phone">Phone</Label>
// //               <Input ref={phoneInput} id="phone" />
// //             </div>
// //           </div>
// //           <DialogFooter>
// //             <DialogClose asChild>
// //               <Button variant="outline">Cancel</Button>
// //             </DialogClose>
// //             <Button
// //               onClick={checkoutSession}
// //               className="cursor-pointer"
// //               type="submit"
// //             >
// //               {loadingVisa ? <Loader2 className="animate-spin" /> : "Visa"}
// //             </Button>
// //             <Button
// //               onClick={checkoutCash}
// //               className="cursor-pointer"
// //               type="submit"
// //             >
// //               {loadingCash ? <Loader2 className="animate-spin" /> : "Cash"}
// //             </Button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </form>
// //     </Dialog>
// //   );
// // }
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { getUserToken } from "@/Helpers/accessToken";
// import { Loader2 } from "lucide-react";

// import { useRef, useState } from "react";

// export function Checkout({ cartId }: { cartId: string }) {
//   const [loadingVisa, setLoadingVisa] = useState(false);
//   const [loadingCash, setLoadingCash] = useState(false);

//   const cityInput = useRef<HTMLInputElement | null>(null);
//   const detailsInput = useRef<HTMLInputElement | null>(null);
//   const phoneInput = useRef<HTMLInputElement | null>(null);

//   async function checkoutSession() {
//     try {
//       setLoadingVisa(true);

//       const token = await getUserToken();
//       if (!token) throw new Error("User token not found");

//       const shippingAddress = {
//         details: detailsInput.current?.value,
//         phone: phoneInput.current?.value,
//         city: cityInput.current?.value,
//       };

//       const redirectURL = `${window.location.origin}/allorders`;

//       // فتح نافذة الدفع (popup)
//       const width = 500;
//       const height = 700;
//       const left = window.screenX + (window.innerWidth - width) / 2;
//       const top = window.screenY + (window.innerHeight - height) / 2;

//       const paymentWindow = window.open(
//         "",
//         "_blank",
//         `width=${width},height=${height},left=${left},top=${top}`,
//       );

//       if (!paymentWindow) {
//         alert("Please allow popups to proceed with payment.");
//         setLoadingVisa(false);
//         return;
//       }

//       const response = await fetch(
//         `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(
//           redirectURL,
//         )}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             token: token,
//           },
//           body: JSON.stringify({ shippingAddress }),
//         },
//       );

//       const data = await response.json();

//       if (data.status === "success" && data.session?.url) {
//         paymentWindow.location.href = data.session.url;

//         // مراقبة إغلاق نافذة الدفع
//         const interval = setInterval(() => {
//           if (paymentWindow.closed) {
//             clearInterval(interval);
//             // بعد إغلاق popup، تحديث الصفحة الرئيسية (التاب الأصلي)
//             window.location.reload();
//           }
//         }, 500);
//       } else {
//         paymentWindow.close();
//         console.error("Checkout failed:", data.message || "Unknown error");
//         setLoadingVisa(false);
//       }
//     } catch (error) {
//       console.error("Error during checkout:", error);
//       setLoadingVisa(false);
//     }
//   }

//   async function checkoutCash() {
//     try {
//       setLoadingCash(true);

//       const token = await getUserToken();
//       if (!token) throw new Error("User token not found");

//       const shippingAddress = {
//         details: detailsInput.current?.value,
//         phone: phoneInput.current?.value,
//         city: cityInput.current?.value,
//       };

//       const response = await fetch(
//         `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             token: token,
//           },
//           body: JSON.stringify({ shippingAddress }),
//         },
//       );

//       const data = await response.json();

//       if (data.status === "success") {
//         window.location.href = `${window.location.origin}/allorders`;
//       } else {
//         console.error("Cash checkout failed:", data.message || "Unknown error");
//       }
//     } catch (error) {
//       console.error("Error during cash checkout:", error);
//     } finally {
//       setLoadingCash(false);
//     }
//   }

//   return (
//     <Dialog>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault(); // منع إعادة تحميل الصفحة عند الضغط على أي زر
//         }}
//       >
//         <DialogTrigger asChild>
//           <button className="w-full rounded-full bg-black text-white py-1 font-medium hover:opacity-90 transition cursor-pointer">
//             Proceed to Checkout
//           </button>
//         </DialogTrigger>

//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Add Shipping Address</DialogTitle>
//             <DialogDescription>
//               Make changes to your profile here. Click save when you&apos;re
//               done.
//             </DialogDescription>
//           </DialogHeader>

//           <div className="grid gap-4">
//             <div className="grid gap-3">
//               <Label htmlFor="city">City</Label>
//               <Input ref={cityInput} id="city" />
//             </div>
//             <div className="grid gap-3">
//               <Label htmlFor="details">Details</Label>
//               <Input ref={detailsInput} id="details" />
//             </div>
//             <div className="grid gap-3">
//               <Label htmlFor="phone">Phone</Label>
//               <Input ref={phoneInput} id="phone" />
//             </div>
//           </div>

//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant="outline">Cancel</Button>
//             </DialogClose>

//             <Button
//               onClick={checkoutSession}
//               type="button"
//               className="cursor-pointer"
//             >
//               {loadingVisa ? <Loader2 className="animate-spin" /> : "Visa"}
//             </Button>

//             <Button
//               onClick={checkoutCash}
//               type="button"
//               className="cursor-pointer"
//             >
//               {loadingCash ? <Loader2 className="animate-spin" /> : "Cash"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </form>
//     </Dialog>
//   );
// }
"use client";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserToken } from "@/Helpers/accessToken";
import { Loader2 } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function Checkout({ cartId }: { cartId: string }) {
  const [loadingVisa, setLoadingVisa] = useState(false);
  const [loadingCash, setLoadingCash] = useState(false);

  const cityInput = useRef<HTMLInputElement | null>(null);
  const detailsInput = useRef<HTMLInputElement | null>(null);
  const phoneInput = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get("tab") || "defaultTab"; // التاب الحالي إذا موجود

  async function checkoutSession() {
    try {
      setLoadingVisa(true);

      const token = await getUserToken();
      if (!token) throw new Error("User token not found");

      const shippingAddress = {
        details: detailsInput.current?.value,
        phone: phoneInput.current?.value,
        city: cityInput.current?.value,
      };

      const redirectURL = `${window.location.origin}/allorders?tab=${currentTab}`;

      // فتح نافذة الدفع (popup)
      const width = 500;
      const height = 700;
      const left = window.screenX + (window.innerWidth - width) / 2;
      const top = window.screenY + (window.innerHeight - height) / 2;

      const paymentWindow = window.open(
        "",
        "_blank",
        `width=${width},height=${height},left=${left},top=${top}`,
      );

      if (!paymentWindow) {
        alert("Please allow popups to proceed with payment.");
        setLoadingVisa(false);
        return;
      }

      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(
          redirectURL,
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({ shippingAddress }),
        },
      );

      const data = await response.json();

      if (data.status === "success" && data.session?.url) {
        paymentWindow.location.href = data.session.url;

        // مراقبة إغلاق نافذة الدفع
        const interval = setInterval(() => {
          if (paymentWindow.closed) {
            clearInterval(interval);
            // بعد إغلاق popup، نحدث الصفحة ونمرر التاب الحالي و orderId
            if (data.session.orderId) {
              router.push(
                `/allorders?tab=${currentTab}&orderId=${data.session.orderId}`,
              );
            } else {
              router.push(`/allorders?tab=${currentTab}`);
            }
          }
        }, 500);
      } else {
        paymentWindow.close();
        console.error("Checkout failed:", data.message || "Unknown error");
        setLoadingVisa(false);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      setLoadingVisa(false);
    }
  }

  async function checkoutCash() {
    try {
      setLoadingCash(true);

      const token = await getUserToken();
      if (!token) throw new Error("User token not found");

      const shippingAddress = {
        details: detailsInput.current?.value,
        phone: phoneInput.current?.value,
        city: cityInput.current?.value,
      };

      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({ shippingAddress }),
        },
      );

      const data = await response.json();

      if (data.status === "success") {
        router.push(`/allorders?tab=${currentTab}&orderId=${data.data._id}`);
      } else {
        console.error("Cash checkout failed:", data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error during cash checkout:", error);
    } finally {
      setLoadingCash(false);
    }
  }

  return (
    <Dialog>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // منع إعادة تحميل الصفحة عند الضغط على أي زر
        }}
      >
        <DialogTrigger asChild>
          <button className="w-full rounded-full bg-black text-white py-1 font-medium hover:opacity-90 transition cursor-pointer">
            Proceed to Checkout
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Shipping Address</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="city">City</Label>
              <Input ref={cityInput} id="city" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="details">Details</Label>
              <Input ref={detailsInput} id="details" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone">Phone</Label>
              <Input ref={phoneInput} id="phone" />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button
              onClick={checkoutSession}
              type="button"
              className="cursor-pointer"
            >
              {loadingVisa ? <Loader2 className="animate-spin" /> : "Visa"}
            </Button>

            <Button
              onClick={checkoutCash}
              type="button"
              className="cursor-pointer"
            >
              {loadingCash ? <Loader2 className="animate-spin" /> : "Cash"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
