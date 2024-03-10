import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import { useRouter } from 'next/router';
import MobileHeader from "../../components/mobileHeader";
import SectionFooter from "../../components/sectionFooter";
import axios from 'axios'
import PedidoComprador from "../../components/pedidoComprador";

interface CompradorData {
    nome: string;
    sorteio: string;
    imagem: string;
    quantidadesBilhetes: string;
    numerosComprados: [number];
    dataComprada: string;
}


const pedidos: NextPage = () => {

  const [email, setEmail] = useState(true)
  const [resultado, setResult] = useState(false)
  const [InputText, setInputText] = useState('')
  const [CompradorData, setCompradorData] = useState<CompradorData[]>([]);
   
  const buscarPedidos = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault(); // Evita o recarregamento padrão da página
  
    if (!InputText) {
      alert('Por favor, preencha o campo obrigatoriamente.');
      return;
    }
  
    try {
      let result;
      if (email) {
        result = await axios.get(`http://localhost:3080/api/compradores/gets/email/${InputText}`);
      } else {
        result = await axios.get(`http://localhost:3080/api/compradores/gets/telefone/${InputText}`);
      }
  
      console.log(result);
      
      if (result && result.data) {
        setCompradorData(result.data);
      }
    } catch (error) {
      console.error('Ocorreu um erro na busca dos pedidos:', error);
    }
  };

   const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    const formattedValue = newValue.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3'); // Formata o número conforme (99) 99999-9999
  
    setInputText(formattedValue);
  };
  

  return(
      <>
      <div className='md:hidden'>
        <MobileHeader />
      </div>
          <Header />
          <div className="container px-4 h-auto mx-auto">
                <div className="flex flex-col py-5">
                    <div className="flex flex-col justify-center  lg:items-center mb-6">
                        <div className="text-gray-400 text-center space-y-3">
                           <h2 className="text-xl md:text-center font-semibold text-gray-600">🔎 Buscar Pedidos</h2>
                            <p className="text-md  md:text-center text-gray-400">Informe seu e-mail ou telefone para consultar informações sobre os seus pedidos.</p>
                        </div>
                    </div>


                           <div className="flex justify-center">
                               
                               <div className="flex items-center mb-6 ml-8">
                                    <button onClick={() => setEmail(true)} className="ml-2 text-sm font-medium text-black">Email</button>
                                </div>
                               
                               <div className="flex items-center mb-6 ml-8">
                                    <button onClick={() => setEmail(false)} className="ml-2 text-sm font-medium text-black">Telefone</button>
                                </div>

                                
                           </div>
                           
                            <form className="flex justify-center" id="search_form"  method="POST">

                                 <div className="flex flex-col justify-center w-full max-w-lg">
                                    { email ? (<div>
                                    <label  id="search-label" className="block text-md font-medium text-gray-600 my-2">Digite seu E-Mail</label>
                                    <input required type="text" id="search" value={InputText} onChange={(text) => setInputText(text.target.value)}  placeholder="exemplo@email.com"  name="mail" className="p-2 my-2 border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1"/>
                                </div>) : 
                                
                                (<div>
                                    <label  id="search-label" className="block text-md font-medium text-gray-600 my-2">Digite seu Telefone</label>
                                    <input required type="text" id="search" value={InputText} onChange={handleTelefoneChange} placeholder="(85) 9 9999-9999"  name="phone" className="p-2 my-2 border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm focus:ring-1"/>
                                </div>)

                                    }
                                    <button id="search_btn" onClick={buscarPedidos} className="bg-blue-500 my-2 h-10 p-2 rounded-md text-white">Buscar</button>
                                </div>
                            </form>
                        </div>

                        <div className="max-w-5xl my-10 mx-auto flex flex-col justify-center">
                {
                    CompradorData.map(pedido =>( <PedidoComprador pedido={pedido} />))
                }
                </div>
                    
                </div>
      

        <SectionFooter/>
        

      </>
  )
};

export default pedidos;
