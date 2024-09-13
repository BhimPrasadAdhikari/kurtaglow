
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
  const items = useCart((state) => state.items);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<ShipingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      firstName: '',
      lastName: '',
      phone: '',
      address: ''
    },
  });
  const onSubmit = async ({phone,address,firstName,lastName}: ShipingFormValues) => {

    try {
      setLoading(true);
        const response= await axios.post(`${process.env.NEXT_PUBLIC_API_URL}checkout`,
        JSON.stringify({   productIds: items.map((item)=>item.id),
          details:{phone, address}
        }),
         { headers:{
            "Content-Type":"application/x-www-form-urlencoded"
          }
        }

     
)
    setOpen(true);
    const details=response.data.details
    console.log(process.env.NEXT_PUBLIC_TEST_SECRET_KEY)
    const totalPrice=details?.reduce((total:any,product:any)=>{ return total+product.total_price},0)
    const Khalti_response = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/',
      JSON.stringify({
          "return_url": `${process.env.NEXT_PUBLIC_STORE_PUBLIC_URL}cart/`,
          "website_url": `${process.env.NEXT_PUBLIC_STORE_PUBLIC_URL}`,
          "amount": totalPrice+totalPrice*0.13,
          "purchase_order_id": "test12",
          "purchase_order_name": "test",
          "customer_info": {
              "name": `${firstName} ${lastName}`,
              "email": "example@gmail.com",
              "phone": phone
          },
          "amount_breakdown": [
              {
                  "label": "Mark Price",
                  "amount": totalPrice
              },
              {
                  "label": "VAT",
                  "amount": totalPrice*0.13
              }
          ],
          "product_details": details,
          "merchant_username": "kurta glow ",
          "merchant_extra": "merchant_extra"
        }),
       { headers:{
          "Authorization":`Key ${process.env.NEXT_PUBLIC_TEST_SECRET_KEY}`,
          "Content-Type":"application/json"
        }
}
 ); 
 console.log(Khalti_response)

 window.location.href=Khalti_response.data.payment_url
// toast.success("success");
    } catch (error) {
      toast.error('sorry something went wrong');
    } finally {
      setLoading(false);
      
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
          
          <Button type="submit">Khalti payment</Button>
        </form>
      </Form>
      <hr className="mt-2" />
    </div>
    </>
  );
};
