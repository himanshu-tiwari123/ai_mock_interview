"use client"
import React from 'react'
import Link from 'next/link';
import {z} from "zod";
import {useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {Form} from "@/components/ui/form"
import { toast } from 'sonner';
import FormField from './FormField';
import { useRouter } from 'next/navigation';




const authFormSchema = (type:FormType)=>{
    return z.object({
      name : type === 'sign-up'?z.string().min(3) : z.string(),
      email:z.string().email(),
      password : z.string().min(3),

    })
}
const AuthForm = ({type}:{type:FormType}) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
     // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password:"",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
   try{
    if(type==="sign-up"){
      toast.success("Account Created Successfully.Please Sign In.")
      router.push('/sign-In');
    }else{
      toast.success('Logged In Successfully');
      router.push("/");
    }

   }catch(err){
    console.log(err);
    toast.error(`Something went wrong : ${err}`);
   }
  }

  const isSignIn = type === "sign-in";
//   const isSignUp = type === "sign-up";
  return (
    <div className="card-border lg:min-w-[566px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2 justify-center">
                <Image src="/logo1.jpg" alt="logo" height={70} width={90}></Image>
                <h2 className="text-primary-100">AI Recruiter</h2>
            </div>
            <h3>Practice Job Interviews with AI</h3>
        
        <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
      {!isSignIn && (
        <FormField
          control={form.control}
          name="name"
          label="Name"
          placeholder="Enter your Name"
        />
      )}
      <FormField
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter your Email Address"
          type="email"
        />
      <FormField
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter your Password"
          type="password"
        />
      <Button className="btn" type="submit">{isSignIn?"Sign In":"Sign Up"}</Button>
      
    </form>
  </Form>
  <p className="text-center">
    {isSignIn ? "No account yet ?":"Have an account already ?"}
    <Link href={!isSignIn ? '/sign-In' : "/sign-Up"} className='font-bold text-user-primary ml-1'>{!isSignIn ? 'Sign In':"Sign Up"}</Link>
  </p>
  </div>
  </div>
  )
}

export default AuthForm