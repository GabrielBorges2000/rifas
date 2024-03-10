import React from 'react';
import Link from "next/link";
import MobileButton from '../mobileHeader';
import ButtonWhats from '../buttonWhats';

const Header: React.FC = () => {


  return (
    <header className="max-md:hidden  bg-white">
   
    <div className="container flex justify-between  mx-auto">

    <Link rel="noopener noreferrer" href="/" className="flex  items-center p-2">
       <div className="w-20 h-20 cursor-pointer">
         <img src="https://cdn.discordapp.com/attachments/1128206660335304764/1196600708141678682/Logo.png?ex=65b83840&is=65a5c340&hm=b78eb949e9ef10344a1cdfb42cb9b2ea85a6c13fbbecec01bd22c944c56ae04b&" />
      </div>
   

      </Link>	
    
     
    <ul className="items-center  space-x-6 flex">
          <Link href="/sorteios" className="  cursor-pointer	">
                <p className=" text-base px-4 py-2 text-gray-500 font-medium hover:bg-white hover:text-black cursor-pointer rounded-md">Sorteios</p>
          </Link>

          <Link href="/ganhadores" className="cursor-pointer	">
              <p className=" text-base px-4 py-2 text-gray-500 font-medium hover:bg-white hover:text-black cursor-pointer rounded-md">Ganhadores</p>
          </Link>

          <Link href="/pedidos" className="cursor-pointer	">
              <p className=" text-base px-4 py-2 text-gray-500 font-medium hover:bg-white hover:text-black cursor-pointer rounded-md">Meus números</p>
          </Link>
     </ul> 
    
    <ul className="items-center hidden space-x-16 lg:flex"></ul>

    </div>

   <ButtonWhats/>
    
  </header>
  
    )
}

export default Header


