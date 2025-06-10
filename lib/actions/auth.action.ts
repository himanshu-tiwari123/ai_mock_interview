'use server';

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
import { use } from "react";

export async function signUp(params:SignUpParams){
    const {uid,name,email,password} = params;
    try{

        const userRecord = await db.collection('users').doc(uid).get();
        if(userRecord.exists){
            return{
                success:false,
                message:'User already exists.Please Sign In instead'
            }
        }

        await db.collection('users').doc(uid).set({
            name : name,
            email:email,
        })

        return{
            success:true,
            message:'User created successfully. Please Sign In.',
        }

    }catch(error : any){
        console.error('Error creating user:', error);

        if(error.code === 'auth/email-already-exists'){
            return {
                success:false,
                message:'Email already exists. Please use a different email address.'
            }
        }

        return{
            succeess:false,
            message:'An error occurred while creating the user. Please try again later.'
        }
    }

 }

export async function signIn(params:SignInParams){
    const {email,idToken} = params;
    try{
        const userRecord = await auth.getUserByEmail(email);
        if(!userRecord){
            return{
                success:false,
                message:'User does not exist.Please Create an account first.'
            }
        }

        await setSessionCookie(idToken)

    }catch(error:any){
        console.log(error);
        return{
            success:false,
            message:'An error occurred while signing in. Please try again later.'
        }
    }
}

export async function setSessionCookie(idToken:string){
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken,{
        expiresIn:60*60*24*7*1000, //1 week

    })
    cookieStore.set('session',sessionCookie,{
        maxAge:60*60*24*7,
        httpOnly:true,
        secure:process.env.NODE_ENV=== 'production',
        path:'/',
        sameSite:'lax',
    })
}

export async function getCurrentUser():Promise<User | null>{
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if(!sessionCookie){
        return null;
    }

    try{
        const decodedClaims = await auth.verifySessionCookie(sessionCookie,true);
        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

        if(!userRecord.exists){
            return null;
        }
        return{
            ...userRecord.data(),
            id:userRecord.id,
        }as User;
    }catch(error:any){
        console.error('Error getting current user:', error);
        return null;
    }

}

export async function isAuthenticated(){
    const user = await getCurrentUser();
    return user !== null;
}