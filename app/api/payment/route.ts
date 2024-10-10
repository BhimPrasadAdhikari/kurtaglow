import { NextResponse } from "next/server";
import axios from "axios";
export async function POST(req: Request) {
  try {
    const {
      paymentMethod,
      amount,
      purchase_order_id,
      purchase_order_name,
      customer_info,
      amount_breakdown,
      product_details,
      totalPrice,
      total_amount,
      transaction_uuid,
      product_code,
      signature,
    } = await req.json();

    switch (paymentMethod) {
      case "khalti":
        try {
          const Khalti_response = await axios.post(
            `${process.env.KHALTI_PAYMENT_API}initiate/`,
            JSON.stringify({
              return_url: `${process.env.STORE_URL}payment/`,
              website_url: `${process.env.STORE_URL}`,
              amount,
              purchase_order_id,
              purchase_order_name,
              customer_info,
              amount_breakdown,
              product_details,
              merchant_username: `${process.env.KHALTI_MERCHANT_USERNAME}`,
              merchant_extra: `${process.env.KHALTI_MERCHANT_EMAIL}`,
            }),
            {
              headers: {
                Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
                "Content-Type": "application/json",
              },
            }
          ); //Khalti_post ends here
           console.log(Khalti_response.data)
          const lookup_response = await axios.post(
            `${process.env.KHALTI_PAYMENT_API}lookup/`,
            JSON.stringify({
              pidx: Khalti_response.data.pidx,
            }),
            {
              headers: {
                Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (lookup_response.data.status === "Pending") {
            return NextResponse.json({
              redirect_url: Khalti_response.data.payment_url,
              success:true,
              message: "payment initiated",
            });
          }
        } catch (error) {
          console.error("KHALTI_PAYMENT_ERROR", error);
          return NextResponse.json({ message: "payment not initiated",success:false });
        } //outer try catch ends here

        break;
      case "esewa":
        try {
          // Construct the form data required by eSewa
          const formData = new URLSearchParams();
          formData.append("amount", totalPrice);
          formData.append("tax_amount", `${totalPrice * 0.13}`);
          formData.append("total_amount", total_amount);
          formData.append("transaction_uuid", transaction_uuid);
          formData.append("product_code", product_code);
          formData.append("product_service_charge", "0");
          formData.append("product_delivery_charge", `${0.02 * totalPrice}`);
          formData.append(
            "success_url",
            `${process.env.STORE_URL}/payment`
          );
          formData.append(
            "failure_url",
            `${process.env.STORE_URL}/payment`
          );
          formData.append(
            "signed_field_names",
            "total_amount,transaction_uuid,product_code"
          );
          formData.append("signature", signature);

          // Send the request to eSewa API
          const esewaResponse = await axios.post(
            `${process.env.ESEWA_FORM_API}`,formData,{
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
           
          );
const verifyesewatest= await axios.post(`https://uat.esewa.com.np/api/epay/transaction/status/?product_code=${product_code}&total_amount=${total_amount}&transaction_uuid=${transaction_uuid}`);


           console.log(verifyesewatest.data)
          if (esewaResponse.data.ok) {
            const esewaResult = await esewaResponse.data; // Parse response (depends on eSewa API)
            // Assuming eSewa redirects the user after payment
            return NextResponse.json({
              success: true,
              redirect_url: esewaResult,
              message:'payment initiated with esewa'
            });
          } else {
            return NextResponse.json({
              success: false,
              message: "Failed to initiate payment with eSewa",
            });
          }
        } catch (error) {
          console.error("Error processing payment with eSewa:", error);
          return NextResponse.json({ success: false, message: "Server error" });
        }
        break;
      case "paypal":
        break;
      case "stripe":
        break;
      default:
        return NextResponse.json({
          success: false,
          message: "Invalid payment method",
        });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" });
  }
}
