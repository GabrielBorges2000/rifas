import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Header from "../components/header";
import SectionFooter from "../components/sectionFooter";
import MobileHeader from "../components/mobileHeader";

import Banner from "../components/banner";
import BannerMobile from "../components/bannerMobile";
import GanhadoresShow from "../components/ganhadoresShow";
import RifasShow from "../components/rifaShow";
import axios from 'axios'



const Home: NextPage = () => {
 
    const [rifas, setRifas] = useState([]);
    const [windowSize, setWindowSize] = useState<number | undefined>(undefined)
    const [ganhadores, setGanhadores] = useState([]);

    useEffect(() => {
      const fetchRifasData = async () => {
        try {
          const res = await axios.get(`http://localhost:3080/api/rifas`);

          setRifas(res.data);
        } catch (error) {
          // Trate erros, se necessário
        }
      };


      const fetchGanhadoresData = async () => {
        try {
          const res = await axios.get(`http://localhost:3080/api/ganhadores`);
          setGanhadores(res.data);
        } catch (error) {
          // Trate erros, se necessário
        }
      };
  
  

      fetchRifasData();
      fetchGanhadoresData();
      if (typeof window !== 'undefined') {
        const handleResize = () => {
          setWindowSize(window.innerWidth);
        };
  
        window.addEventListener('resize', handleResize);
  
        // Define o tamanho inicial da janela ao montar o componente
        setWindowSize(window.innerWidth);
  
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }
  
    }, []);


return(
  <>
  <div className='md:hidden'>
        <MobileHeader />
      </div>
  <Header />
     
  {windowSize && windowSize > 768 ? (
        <div className="w-[100%]">
          <Banner images={['/assets/images/slides/1.png']} />
        </div>
      ) : (
        <div>
            <BannerMobile images={['/assets/images/slides/2.png']} />
        </div>
      )}
    <div className="max-w-[1440px] mx-auto">
            <div className="container-md  flex flex-col justify-center">
              

                <div className="my-2 w-full">
                    <div className="px-4 py-2">
                        <h1 className="text-2xl text-gray-600 font-semibold font-bold">⚡ Prêmios</h1>
                        <h1 className="text-md text-gray-400 font-medium">Seu sonho bem pertinho de você!</h1>
                    </div>
                    
                      {/*area dos produtos*/}

                      <div className="w-full grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 px-4">
                          {
                            rifas.map((rifa) => <RifasShow  rifa={rifa} />)
                          }
                          
                       </div>
                    

                    <div className="px-4 py-2">
                        <h1 className="text-2xl text-gray-600 font-semibold font-bold">🏆 Ganhadores</h1>
                        <h1 className="text-md text-gray-400 font-medium">Veja os últimos ganhadores</h1>
                    </div>
                        
                   
                      {/*area dos sorteados*/}

                      <div className="w-full grid mb-[8%]  grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 px-4">
                        {
                          ganhadores.map((ganhador) => <GanhadoresShow Ganhador={ganhador} />)
                        }   
                            
                      </div>
                 
                </div>
            </div>
        </div>
        <SectionFooter/>

  </>


        )
};

export default Home;
