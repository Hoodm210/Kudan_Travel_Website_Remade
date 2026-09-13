 "use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
const schema=z.object({name:z.string().min(2),email:z.string().email(),phone:z.string().min(7),destination:z.string().min(2),dates:z.string().min(2),passengers:z.string().min(1),message:z.string().min(5)});
type FormData=z.infer<typeof schema>;
export default function InquiryForm(){
 const {register,handleSubmit,formState:{errors,isSubmitting},reset}=useForm<FormData>({resolver:zodResolver(schema)});
 const submit=(data:FormData)=>{console.log(data); reset(); alert("Thank you! Your inquiry has been received. Connect your preferred email/API endpoint in this form handler.");};
 const input="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100";
 return <form onSubmit={handleSubmit(submit)} className="grid gap-5 sm:grid-cols-2">
  {(["name","email","phone","destination","dates","passengers"] as const).map((f)=><label key={f} className="text-xs font-bold uppercase tracking-wide text-slate-600">{f==="dates"?"Travel dates":f==="passengers"?"Passengers":f}<input {...register(f)} className={input} placeholder={f==="destination"?"e.g. Thailand, Everest Base Camp":""}/>{errors[f]&&<span className="mt-1 block text-[11px] text-red-600">Please enter a valid value.</span>}</label>)}
  <label className="text-xs font-bold uppercase tracking-wide text-slate-600 sm:col-span-2">Special requirements<textarea {...register("message")} rows={4} className={input} placeholder="Tell us about your trip, hotel preferences, transport, dietary needs, etc." /></label>
  <button disabled={isSubmitting} className="btn-primary sm:col-span-2">{isSubmitting?"Sending...":"Send Inquiry"} <Send size={16}/></button>
 </form>
}