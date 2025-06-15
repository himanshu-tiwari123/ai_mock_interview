import {generateText} from 'ai'
import { google } from '@ai-sdk/google';;
import { GoogleGenerativeAI } from '@google/generative-ai'
import { getRandomInterviewCover } from '@/lib/utils';
import { db } from '@/firebase/admin';
export async function GET(){
    return Response.json({
        success:true,
        data:'Hello from VAPI Generate Route',
        status:200,
    })
        
}
//responsible for generating question from gemini and store it in firebase:
export async function POST(request:Request){
    if(!process.env.GOOGLE_GENERATIVE_API_KEY){
        return Response.json({
            success:false,
            message:'Google Generative API Key is not set',
            status:500,
        })
    }
    const {type,role,level,techstack,amount,userid} = await request.json();
    try{
         // Initialize the Google AI model
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_API_KEY)
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-05-20' })

        // Generate content
        const result = await model.generateContent(`Prepare questions for a job interview.
            The job role is ${role}.
            The job experience level is ${level}.
            The tech stack used in the job is: ${techstack}.
            The focus between behavioural and technical questions should lean towards: ${type}.
            The amount of questions required is: ${amount}.
            Please return only the questions, without any additional text.
            The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
            Return the questions formatted like this:
            ["Question 1", "Question 2", "Question 3"]
        `)

        const response = await result.response
        const questions = response.text()

        const interview={
            role,type,level,
            techstack:techstack.split(','),
            questions:JSON.parse(questions),
            userId:userid,
            finalized : true,
            coverImage:getRandomInterviewCover(),
            createdAt:new Date().toISOString(),
        }

        await db.collection('interviews').add(interview);

        return Response.json({
            success:true,
            status:200,
            message:'Interview questions generated successfully',
        })


    }catch(err){
        console.error('Error in VAPI Generate Route:', err);
        return Response.json({
            success:false,
            message:'Error in VAPI Generate Route',
            status:500,
        })
    }
}
// gemini-2.5-pro-preview-05-06


