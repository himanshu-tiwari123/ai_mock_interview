'use client'
import React, {useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { vapi} from '@/lib/vapi.sdk';
import { interviewer } from '@/constants';
import { createFeedback } from '@/lib/actions/general.actions';

enum CallStatus{
  INACTIVE ='INACTIVE',
  CONNECTING ='CONNECTING',
  ACTIVE ='ACTIVE',
  FINISHED ='FINISHED',
}

interface SavedMessage{
  role:'user'|'assistant';
  content:string;
}

// interface AgentProps {
//   userName: string;
//   userId: string;
//   type: string;
// }

const Agent = ({userName,userId,type,interviewId,questions}:AgentProps) => {

  const router = useRouter();

  const [isSpeaking,setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages,setMessages] = useState<SavedMessage[]>([]);

useEffect(()=>{
    const onCallStart = ()=>{
      console.log('Call started');
      setCallStatus(CallStatus.ACTIVE);
    }
    
    const onCallEnd = ()=>{
      console.log('Call ended');
      setCallStatus(CallStatus.FINISHED);
    }
    
    const onMessage=(message:any)=>{
      console.log('Message received:', message);
      if(message.type==='transcript' && message.transcriptType==='final'){
        const role = message.role === 'user' ? "user" : "assistant";
        const newMessage: SavedMessage = { role, content: message.transcript };
        setMessages((prev)=>[...prev,newMessage]);
      }
    }

    const onSpeechStart=()=>{
      console.log('Speech started');
      setIsSpeaking(true);
    }
    
    const onSpeechEnd=()=>{
      console.log('Speech ended');
      setIsSpeaking(false);
    }

    const onError =(error:any)=>{
      console.error('Vapi Error:', error);
      
      // Better error handling
      let errorMessage = 'An unknown error occurred';
      
      if (error && typeof error === 'object') {
        if (error.message) {
          errorMessage = error.message;
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
      }
      
      console.error('Processed error message:', errorMessage);
      setCallStatus(CallStatus.FINISHED);
      alert(`Call error: ${errorMessage}`);
    }

    // Add event listeners
    vapi.on('call-start',onCallStart);
    vapi.on('call-end',onCallEnd);
    vapi.on('message',onMessage);
    vapi.on('speech-start',onSpeechStart);
    vapi.on('speech-end',onSpeechEnd);
    vapi.on('error',onError);

    return ()=>{
      // Cleanup event listeners
      vapi.off('call-start',onCallStart);
      vapi.off('call-end',onCallEnd);
      vapi.off('message',onMessage);
      vapi.off('speech-start',onSpeechStart);
      vapi.off('speech-end',onSpeechEnd);
      vapi.off('error',onError);
    }
  },[])

const handleGenerateFeedback = async(messages:SavedMessage[])=>{
    console.log('Generating feedback for messages:', messages);
    //Create a server action that generates feedback based on the messages:
    const {success,feedbackId:id}=await createFeedback({
      interviewId:interviewId!,
      userId: userId!,
      transcript:messages,
    })

    if(success && id){
      router.push(`/interview/${interviewId}/feedback`);
    }else{
      console.error('Error saving feedback');
      router.push('/');
    }
}

 useEffect(()=>{
      if(callStatus === CallStatus.FINISHED){
        if(type === 'generate'){
          router.push('/');
        }else{
          handleGenerateFeedback(messages);
          
        }
      }
 },[messages,callStatus,type,userId])

  const handleCall = async()=>{
    try {
      // Debug logging
      console.log('Environment check:', {
        workflowId: process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID,
        webToken: process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN ? `${process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN.substring(0, 8)}...` : 'Not set',
        webTokenLength: process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN?.length,
        userName,
        userId
      });
      
      setCallStatus(CallStatus.CONNECTING);

      // Make sure environment variable exists
      if (!process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID) {
        throw new Error('NEXT_PUBLIC_VAPI_WORKFLOW_ID environment variable is not set');
      }

      // Try to start the call
      console.log('Attempting to start call...');
      
      // Option 1: Using workflow ID (current approach)
      if(type === 'generate'){
          await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues:{
          username: userName,
          userid: userId,
        }
      });
     }else{
      let formattedQuestions = '';

      if(questions){
        formattedQuestions = questions.map((question: any)=>`- ${question}`).join('\n');
      }

      await vapi.start(interviewer,{
        variableValues:{
          questions: formattedQuestions,
        }
      })
     }
      
      
      console.log('Call started successfully');
      
    } catch (error) {
      console.error('Error starting call:', error);
      console.error('Error type:', typeof error);
      console.error('Error keys:', error ? Object.keys(error) : 'No keys');
      
      setCallStatus(CallStatus.FINISHED);
      
      let errorMessage = 'Failed to start call';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = String(error.message);
      }
      alert(`Failed to start call: ${errorMessage}`);
    }
  }

  const handleDisconnect = async()=>{
    try {
      console.log('Disconnecting call');
      setCallStatus(CallStatus.FINISHED);
      await vapi.stop();
    } catch (error) {
      console.error('Error disconnecting call:', error);
      setCallStatus(CallStatus.FINISHED);
    }
  }

  const lastMessage = messages[messages.length-1]?.content;
  const isCallInactiveOrFinished = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

  return (
  <>
    <div className='call-view'>
      <div className='call-interviewer card-border flex flex-col justify-center items-center'>
        <div className='avatar'>
            <Image src="/logo1.jpg" alt="vapi" width={400} height={450} className='rounded object-cover flex justify-center align-items-center'></Image>
            {isSpeaking && <span className='animate-speak'></span>}
        </div>
          <h3>AI Interviewer</h3>
      </div>
      <div className='card-border'>
        <div className='card-content'>
          <Image src="/user-avatar.png" alt="user-avatar" width={400} height={450} className='rounded-full object-cover size-[120px]'></Image>
          <h3>{userName}</h3>
        </div>
      </div>
    </div>
    
    {messages.length > 0 && (
      <div className='transcript-border'>
        <div className='transcript'>
          <div>
            <p key={lastMessage} className={cn('transition-opacity duration-500 opacity-0','animate-fadeIn opacity-100')}>
              {lastMessage}
            </p>
          </div>
        </div>
      </div>
    )}
    
    <div className='w-full flex justify-center'>
      {callStatus !== 'ACTIVE' ? (
        <button 
          className='relative btn-call' 
          onClick={handleCall}
          disabled={callStatus === CallStatus.CONNECTING}
        >
          <span className={cn('absolute animate-ping rounded-full opacity-75', callStatus !== 'CONNECTING' && 'hidden')}/>
          <span>{isCallInactiveOrFinished ? 'Call' : 'Connecting...'}</span>
        </button>
      ) : (
        <button className='btn-disconnect' onClick={handleDisconnect}>
          End Call
        </button>
      )}
    </div>
  </>
  )
}

export default Agent