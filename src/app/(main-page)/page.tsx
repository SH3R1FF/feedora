// import Link from "next/link";

// export default function Home() {
//   return (
//     <>
//      <section className="relative overflow-hidden bg-gray-900 text-white">
//   <div className="absolute inset-0">
 
//     <div className="absolute inset-0 bg-black opacity-50"></div>
//   </div>
//   <div className="relative container mx-auto px-4 py-32 lg:flex lg:h-screen lg:items-center">
//     <div className="mx-auto max-w-3xl text-center">
//       <h1 className="text-4xl font-extrabold sm:text-5xl">
//         <span className="bg-gradient-to-r from-teal-400 via-green-500 to-blue-600 bg-clip-text text-transparent">
//           Understand User Flow.
//         </span>
//         <span className="block mt-2 sm:inline">
//           <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
//             Increase Conversion.
//           </span>
//         </span>
//       </h1>

//       <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed">
//         Unlock the full potential of your platform with insights and strategies designed to enhance user experience and boost conversions.
//       </p>

//       <div className="mt-8 flex justify-center gap-4">
//         <Link
//           className="block rounded-lg border border-blue-600 bg-blue-600 px-6 py-3 text-lg font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-blue-800"
//           href="/signup"
//         >
//           Get Started
//         </Link>
//       </div>
//     </div>
//   </div>
// </section>

//       {/* <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
//         <div className="mx-auto max-w-3xl text-center">
//         <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
//           Our Impact
//         </h2>

//         <p className="mt-4 text-gray-500 sm:text-xl">
//           Discover how we’re making a difference and earning trust.
//         </p>
//         </div>
//       </div> */}

//     </>
//   );
// }

'use client';


// import Lottie from "lottie-react"
// import key from "@/app/assets/lottie/key.json"
// import feedbacks from "@/app/assets/lottie/feedbacks.json"
import { ChevronRight, Mail } from 'lucide-react'; // Assuming you have an icon for messages
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12  text-white">

      {/* <Lottie animationData={key} className="w-52 h-52"/> */}
      

        {/* <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Feedora - Where your identity remains a secret.
          </p>
        </section> */}

        <div className="container relative">

          {/* <div className="w-52 h-52 sm:w-[500px] sm:h-[500px] flex justify-center items-center"> */}
            
          {/* </div> */}
          {/* <div className="py-20"> */}
            <h1 className="text-9xl md:text-[148px] md:leading-none font-semibold tracking-tighter bg-white bg-[radial-gradient(100%_100%_at_top_left,white,white,#4ca1af)] text-transparent bg-clip-text text-center ">
            {/* <h1 className="text-7xl md:text-[148px] md:leading-none font-semibold tracking-tighter bg-white bg-[radial-gradient(100%_100%_at_top_left,white,white,#de4a7b)] text-transparent bg-clip-text text-center "> */}
            {/* <h1 className="text-7xl md:text-[148px] md:leading-none font-semibold tracking-tighter bg-white bg-[radial-gradient(100%_100%_at_top_left,white,white,rgb(74,32,138,.5))] text-transparent bg-clip-text text-center "> */}
              Quick Feeds
            </h1>

            <p className="text-lg md:text-xl max-w-xl mx-auto text-white/70 mt-16 text-center ">
              {/* Convert feedback into actionable insights that drive improvements, enhance performance, and fuel growth effortlessly. */}
              Transform feedback into meaningful insights that spark improvements,  performance, and accelerate growth with ease.
            </p>

            <div className="flex justify-center my-8 ">
              {/* <Button>Join waitlist</Button> */}
              <Link href="/sign-up">
                <Button className="w-full md:w-auto bg-white/85 text-black rounded-full px-3 py-2 flex flex-row justify-between items-center gap-2" variant={'secondary'}>
                  Join Feedora
                  <ChevronRight className='h-4 w-4 text-gray-500 ' />  
                </Button>
              </Link>
            </div>


          </div>


        {/* </div> */}

        {/* Carousel for Messages */}
        <Carousel
          plugins={[Autoplay({ delay: 3000 })]}
          className="w-full max-w-lg md:max-w-xl "
        >
          <CarouselContent className="ml-0">
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card className='bg-transparent border border-white/15 bg-zinc-950 text-zinc-300'>
                  <CardHeader>
                    <CardTitle>{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex md:flex-row items-start items-center space-y-2 md:space-y-0 space-x-4 md:space-x-4">
                    <Mail className="flex-shrink-0" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* <Lottie animationData={feedbacks} className="pl-10 rounded h-96"/> */}
      </main>


      {/* Footer */}

      <Footer/>

      {/* <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        © 2024 Feedora . All rights reserved.
      </footer> */}
    </>
  );
}
