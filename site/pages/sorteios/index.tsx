import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import { useRouter } from 'next/router';
import Link from "next/link";
import RifasShow from "../../components/rifaShow";
import MobileHeader from "../../components/mobileHeader";
import SectionFooter from "../../components/sectionFooter";
import axios from "axios";


interface Rifa {
  id: number;
  titulo: string;
  descricao: string;
  imagem: string;
  slug: string;
  status: string;
}

const sorteios: NextPage = () => {
 
  const [rifas, setRifas] = useState<Rifa[]>([]);
  const [rifasFiltradas, setRifasFiltradas] = useState<Rifa[]>([]); 
  const [filtro, setFiltro] = useState('Todos');

  //pegando todas as rifas que tem 
  const fetchRifasData = async () => {
    try {
      const res = await axios.get<Rifa[]>(`http://localhost:3080/api/rifas`);
      setRifas(res.data);
      setRifasFiltradas(res.data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchRifasData();
  }, []);

  useEffect(() => {
    // filtrando as rifas 
    if (filtro === 'Disponiveis') {
      const rifasDisponiveis = rifas.filter(rifa => rifa.status === 'disponivel');
      setRifasFiltradas(rifasDisponiveis);
    } else if (filtro === 'Encerrados') {
      const rifasEncerradas = rifas.filter(rifa => rifa.status === 'encerrado');
      setRifasFiltradas(rifasEncerradas);
    } else {
      setRifasFiltradas(rifas); // Se for 'Todos', exibe todas as rifas novamente
    }
  }, [filtro, rifas]);
   

  return(
      <>
      <div className='md:hidden'>
        <MobileHeader />
      </div>
          <Header />
          <div className="px-4 py-2">
              <h1 className="text-2xl text-gray-600 font-semibold font-bold">⚡ Prêmios</h1>
              <h1 className="text-md text-gray-400 font-medium">Seu sonho bem pertinho de você!</h1>
          </div>
               
          <div className="justify-center space-x-3 flex max-md:w-full">
            <a href="#" onClick={() => setFiltro('Todos')} className={`p-2 text-center cursor-pointer max-md:w-full text-sm rounded bg-white text-blue-500 shadow-md hover:bg-blue-500 hover:text-white ${filtro === 'Todos' && 'bg-blue-500 text-black'}`}>Todos</a>
            <a href="#" onClick={() => setFiltro('Disponiveis')} className={`p-2 text-center cursor-pointer max-md:w-full text-sm rounded bg-white text-blue-500 shadow-md hover:bg-blue-500 hover:text-white ${filtro === 'Disponiveis' && 'bg-blue-500 text-black'}`}>Disponíveis</a>
            <a href="#" onClick={() => setFiltro('Encerrados')} className={`p-2 text-center cursor-pointer max-md:w-full text-sm rounded bg-white text-blue-500 shadow-md hover:bg-blue-500 hover:text-white ${filtro === 'Encerrados' && 'bg-blue-500 text-black'}`}>Encerrados</a>
          </div> 
          {/*area dos produtos*/}
          <div className="w-full mb-[20%] grid grid-cols-1 my-10 gap-3 md:grid-cols-2 lg:grid-cols-3 px-4">
            {rifasFiltradas.map((rifa) => ( <RifasShow rifa={rifa} />  ))}
          </div>
                    
          <SectionFooter />
      </>
  )
};

export default sorteios;
