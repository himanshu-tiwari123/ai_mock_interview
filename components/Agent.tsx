
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils';

enum CallStatus{
  INACTIVE ='INACTIVE',
  CONNECTING ='CONNECTING',
  ACTIVE ='ACTIVE',
  FINISHED ='FINISHED',
}

const Agent = ({userName}:AgentProps) => {

  const callStatus= CallStatus.FINISHED;

  const isSpeaking = true;

  const message = ['Whats your name?','My name is Himanshu,nice to meet you'];

  const lastMessage = message[message.length-1];

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
    {message.length>0 && <div className='transcript-border'>
      <div className='transcript'>
        <div>
          <p key={lastMessage} className={cn('transition-opacity duration-500 opacity-0','animate-fadeIn opacity-100')}>
            {lastMessage}
          </p>
        </div>
      </div>
      </div>}
    <div className='w-full flex justify-center'>
        {callStatus !== 'ACTIVE'? <button className='relative btn-call'>
          <span>{callStatus === 'INACTIVE' || callStatus==='FINISHED' ? 'Call' : '....'}</span>
        </button> : <button className='btn-disconnect'>End Call
          </button>}
    </div>
  </>
  )
}

export default Agent