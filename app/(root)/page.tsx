import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InterviewCard'
import { getCurrentUser } from '@/lib/actions/auth.action'
import { getInterviewByUserId, getLatestInterviews } from '@/lib/actions/general.actions'



const page =async () => {

  const user = await getCurrentUser();
  //Allows you to fetch multiple promises in parallel
  const [userInterviews,latestInterviews] = await Promise.all([
      await getInterviewByUserId(user?.id!),
      await getLatestInterviews({userId:user?.id!})
  ]);
  

  const hasPastInterviews = (userInterviews?.length ?? 0) > 0;
  const hasUpcomingInterviews = latestInterviews?.length!=0;
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
            <Link href="/interview">Start an Interview <span role="img" aria-label="handshake">🤝</span>
            </Link>
        </Button>
      </div>
      <Image src="/robot.png" alt="robo-image" width={400} height={400} className="max-sm:hidden"></Image>
      
    </section>
    <section className='flex flex-col gap-6 mt-8'>
      <h2>Your Past Interviews</h2>

      <div className='interviews-section'>

        { hasPastInterviews ?(
          userInterviews?.map((interview)=>(
            (
              <InterviewCard {...interview} key={interview.id}/>
            )
          ))
        ) : (
          <div className='flex flex-col items-center justify-center gap-4'>
            {/* <Image src="/empty-interviews.png" alt="no-interviews" width={200} height={200} className='object-cover'/> */}
            <p className='text-lg text-gray-100'>You have no past interviews yet. Start one now!</p>
          </div>
        )
        }
      </div>

    </section>

    <section className='flex flex-col gap-6 mt-8'>
      <h2>Take an Interview</h2>
      <div className='interviews-section'>
        <div className='interviews-section'>

        { hasUpcomingInterviews ?(
          latestInterviews?.map((interview)=>(
            (
              <InterviewCard {...interview} key={interview.id}/>
            )
          ))
        ) : (
          <div className='flex flex-col items-center justify-center gap-4'>
            {/* <Image src="/empty-interviews.png" alt="no-interviews" width={200} height={200} className='object-cover'/> */}
            <p className='text-lg text-gray-100'>There are no upcoming interviews available at the moment. Check back later or start your own interview! <span role="img" aria-label="hourglass">⏳</span>
            </p>
          </div>
        )
        }
      </div>
        
      </div>
    </section>
    </>
  )
}

export default page


