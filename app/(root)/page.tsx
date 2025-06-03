import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InterviewCard'

const page = () => {
  return (
    <>
    <section className='card-cta'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-3xl font-bold flex items-center gap-2'>
          AI Recruiter <span role="img" aria-label="robot">🤖</span>
        </h1>
        <p className='text-lg text-gray-100 font-bold flex items-center gap-2'>
          Your AI-powered recruitment assistant <span role="img" aria-label="sparkles">✨</span>
        </p>
        <p className='text-lg text-gray-100 flex items-center gap-2'>
          Practice on real Interview Questions and get Instant Feedback <span role="img" aria-label="target">🎯</span>
        </p>
        <p className='text-lg text-gray-100 flex items-center gap-2'>
          Get ready for your next job interview with AI Recruiter <span role="img" aria-label="rocket">🚀</span>
        </p>
        <Button asChild className='btn-primary w-full max-sm:w-auto flex items-center justify-center'>
            <Link href="/Interview">Start an Interview <span role="img" aria-label="handshake">🤝</span>
            </Link>
        </Button>
      </div>
      <Image src="/robot.png" alt="robo-image" width={400} height={400} className="max-sm:hidden"></Image>
      
    </section>
    <section className='flex flex-col gap-6 mt-8'>
      <h2>Your Past Interviews</h2>

      <div className='interviews-section'>
        {dummyInterviews.map((interview)=>{
          return(
            <InterviewCard {...interview} key={interview.id}/>
          )
        })}
      </div>

    </section>

    <section className='flex flex-col gap-6 mt-8'>
      <h2>Take an Interview</h2>
      <div className='interviews-section'>
        <div className='interviews-section'>
        {dummyInterviews.map((interview)=>{
          return(
            <InterviewCard {...interview} key={interview.id}/>
          )
        })}
      </div>
        
      </div>
    </section>
    </>
  )
}

export default page