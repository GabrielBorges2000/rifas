import React, { useState } from 'react';
import Link from 'next/link';
import ButtonWhats from '../buttonWhats';

const MobileButton = () => {
  const [isHeaderVisible, setHeaderVisible] = useState(false);

  const toggleHeaderVisibility = () => {
    setHeaderVisible(!isHeaderVisible);
  };

  return (

    <header className="p-4  bg-white mx-2 my-2  rounded-md border-[1px] bg-white shadow-lg ring-1 ring-black ring-opacity-5">
      <div className='flex flex-row justify-between'>
        <div className="w-20 h-20 cursor-pointer">
          <Link rel="noopener noreferrer" href="/" >
            <img src="https://cdn.discordapp.com/attachments/1128206660335304764/1196600708141678682/Logo.png?ex=65b83840&is=65a5c340&hm=b78eb949e9ef10344a1cdfb42cb9b2ea85a6c13fbbecec01bd22c944c56ae04b&" />

          </Link>
        </div>

        <button
          onClick={toggleHeaderVisibility}
          className="mt-2  text-black font-bold py-2 px-4 "
        >
          {isHeaderVisible ? <svg className="h-8 w-8 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg> : (<svg className="h-8 w-8 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
          </svg>)}
        </button>
      </div>
      <div className='container flex justify-between my-4 mx-auto'>


        <div className="w-[100%] justify-center ">
          {isHeaderVisible && (
            <div className='w-[100%]'>
              <Link href="/" className="cursor-pointer w-full ">
                <div className='w-full flex flex-row cursor-pointer rounded-md p-3 border-b-4 border-zinc-100'>
                  <div className='flex self-center '>
                    <svg className="h-5 w-5 flex-shrink-0 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path>
                    </svg>
                  </div>
                  <p className="text-base px-4 py-2 text-black font-medium ">Menu Principal</p>
                </div>
              </Link>

              <Link href="/ganhadores" className="cursor-pointer w-full">
                <div className='w-full flex flex-row cursor-pointer rounded-md p-3 border-b-4 border-zinc-100'>
                  <div className='flex self-center '>
                    <svg className="h-5 w-5 flex-shrink-0 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"></path>
                    </svg>
                  </div>
                  <p className="text-base px-4 py-2 text-black font-medium ">Ganhadores</p>
                </div>
              </Link>

              <Link href="/sorteios" className="  cursor-pointer w-full">
                <div className='w-full flex flex-row cursor-pointer rounded-md p-3 border-b-4 border-zinc-100'>
                  <div className='flex self-center '>
                    <svg className="h-5 w-5 flex-shrink-0 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"></path>
                    </svg>
                  </div>
                  <p className="text-base px-4 py-2 text-black font-medium ">Sorteios</p>
                </div>
              </Link>



              <Link href="/pedidos" className="cursor-pointer w-full">
                <div className='w-full flex flex-row cursor-pointer rounded-md p-3 border-b-4 border-zinc-100'>
                  <div className='flex self-center '>
                    <svg className="h-5 w-5 flex-shrink-0 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"></path>
                    </svg>
                  </div>
                  <p className="text-base px-4 py-2 text-black font-medium ">Meus Numeros</p>
                </div>
              </Link>
            </div>
          )}

        </div>
      </div>
      <ButtonWhats />
    </header>
  );
};

export default MobileButton;