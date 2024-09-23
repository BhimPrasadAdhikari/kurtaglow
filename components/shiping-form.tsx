
'use client';
// import { AlertModel } from '@/components/models/alert-model';
import { redirect } from 'next/navigation'
import Button from '@/components/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
// import { Checkbox } from "@/components/ui/checkbox"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod'

interface productDetailsProps{
  identity: string,
  name:string,
  total_price: number,
  quantity:1,
  unit_price: number,
}
import useCart from '@/hooks/use-cart';
import useUser from '@/hooks/use-user';
import ShippingModal from './customer-modal';
import { useUser as ClerkUser } from '@clerk/clerk-react'


const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(10),
  address: z.string().min(3),
});
type ShipingFormValues = z.infer<typeof formSchema>;
export const ShipingForm: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const shipingModel=ShippingModal();
  const items = useCart((state) => state.items);
  const User = useUser();
  const {user,isSignedIn} = ClerkUser();
  const emailAttribute=user?.primaryEmailAddress;
  const email=emailAttribute?.emailAddress;  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<ShipingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      firstName: User.info.firstName,
      lastName: User.info.lastName,
      phone: User.info.phone,
      address: User.info.address
    },
  });
  const onSubmit = async ({phone,address,firstName,lastName}: ShipingFormValues) => {
  const fullName=`${firstName} ${lastName}`
    try {
      setLoading(true);
        const response= await axios.post(`${process.env.NEXT_PUBLIC_API_URL}checkout`,
        JSON.stringify({   productIds: items.map((item)=>item.id),
          details:{fullName,email,phone, address}
        }),
         { headers:{
            "Content-Type":"application/x-www-form-urlencoded" 
          }
        }  
)
    setOpen(true);
    User.addItem({info:{firstName,lastName,phone,address}});
toast.success("success");
 console.log(response);
//  window.location.href="https://kurtaglow-y7cc.vercel.app/orders/"
//  router.push("https://kurtaglow-y7cc.vercel.app/orders/")
window.location.href="http://localhost:3001/orders"
    } catch (error) {
      toast.error('sorry something went wrong');
    } finally {
      setLoading(false);
    setOpen(true);

      
    }
  }; 
 
  return (
    <>
    <div className='flex flex-col '>

      <div className="flex items-center justify-between">
        <Heading title="Shipping Details" description="fill up deliver  details" />
             </div>
      <hr />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 lg:space-y-16 w-full"
        >
          
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="first name"
                    value={field.value}
                    onChange={(name) => field.onChange(name)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Last Name"
                    value={field.value}
                    onChange={(name) => field.onChange(name)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder=" "
                    value={field.value}
                    onChange={(name) => field.onChange(name)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="as butwal, milanchauk"
                    value={field.value}
                    onChange={(name) => field.onChange(name)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit">submit</Button>
        </form>
      </Form>
      <hr className="mt-2" />
    </div>
    </>
  );
};
