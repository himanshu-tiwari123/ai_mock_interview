'use server';
export async function signUp(params:SignUpParams){
    const {uid,name,email,password} = params;
    try{

    }catch(error : any){
        console.error('Error creating user:', error);

        if(error.code === 'auth/email-already-exists'){
            return {
                success:false,
                message:'Email already exists. Please use a different email address.'
            }
        }
    }

 }
