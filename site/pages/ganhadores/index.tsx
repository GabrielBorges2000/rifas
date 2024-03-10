import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import { useRouter } from 'next/router';
import GanhadoresShow from "../../components/ganhadoresShow";
import MobileHeader from "../../components/mobileHeader";
import SectionFooter from "../../components/sectionFooter";

import axios from "axios";

const ganhadores: NextPage = () => {
  const [ganhadores, setGanhadores] = useState([]);

  useEffect(() => {
     // pegando todos ganhadores
    const fetchGanhadoresData = async () => {
      try {
        const res = await axios.get(`http://localhost:3080/api/ganhadores`);
        setGanhadores(res.data);
      } catch (error) {
        // Trate erros, se necessário
      }
    };

    fetchGanhadoresData();
  }, []);


  return(
      <>
      <div className='md:hidden'>
          <MobileHeader />
      </div>
          <Header />

        <div className="px-4 py-2">
            <h1 className="text-2xl text-gray-600 font-semibold font-bold">🏆 Ganhadores</h1>
            <h1 className="text-md text-gray-400 font-medium">Veja os últimos ganhadores</h1>
        </div>
        
        {/*area dos sorteados e mapeamento por id*/}

        <div className="w-full mb-[25%] grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 px-4">
                {
                  ganhadores.map((ganhador) => <GanhadoresShow Ganhador={ganhador}/>)
                }

        </div>
        <SectionFooter/>
      </>
  )
};

export default ganhadores;
