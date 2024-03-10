import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import SlideShow from "../../components/slideshow";
import Modal from '../../components/modal';
import axios from 'axios'
import { useRouter } from 'next/router';
import MobileHeader from "../../components/mobileHeader";
import Link from "next/link";


interface SingleRifaProps {
    rifaSlug: string;
  }

interface RifaData {
    _id: string;
    titulo: string;
    imagem: string;
    descricao: string;
    slug: string;
    numerodeCotas: number;
    preco: number;
    status: string;
    dataCriacao: string;
    dataEncerramento: string;
    orderBump:boolean;
    valueOrderBump:number;
    discontOrderBump:number;
}

const rifaSingle: React.FC<SingleRifaProps> = ({ rifaSlug }) => {

const router = useRouter();

 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isModalOpenOrderBump, setIsModalOpenOrderBump] = useState(false);

 const [rifaData, setRifaData] = useState<RifaData | null>(null);

const [cpfValue, setCpfValue] = useState('');
const [nomeValue, setnomeValue] = useState('');
const [emailValue, setEmailValue] = useState('');
const [telefoneValue, setTelefoneValue] = useState('');
const [quantidadeValue, setQuantidadesValue] = useState<number>(5);
const [isActive, setIsActive] = useState(false);
const orderBump = rifaData?.orderBump; 

let vale;
const valueSlug = rifaSlug.toString()



// funcao de criar comprador e pagar 
const handleBuy = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!nomeValue|| !emailValue || !cpfValue || !telefoneValue  ) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    try {
        // enviar dados do comprador para o banco de dados com o status pendente 
        const res = await axios.post('http://localhost:3080/api/compradores/prepix', {
            nome: nomeValue,
            sorteioId: rifaData?._id,
            sorteio: rifaData?.titulo,
            imagem:rifaData?.imagem,
            telefone:telefoneValue,
            email: emailValue,
            cpf: cpfValue,
            quantidadesBilhetes: quantidadeValue,
            valorPago: (quantidadeValue * (rifaData?.preco || 0)).toFixed(2),
        }, {
            headers: { 'Content-Type': 'application/json' }
        });
        //(quantidadeValue * (rifaData?.preco || 0)).toFixed(2)
        // pergunta se o status da menssagem e verdadeiro e manda pora a area de pagamento
        // onde la iremos pegar o id do compradores 
        const data = await res.data.id;
        closeModal();

        if(data){
            const result = await axios.post(`http://localhost:3080/api/compradores/pix/${data}`);
            
            router.push(`/pagar?=${data}&id=${result.data.Id_Transaction}`)
         }

        
    } catch (error) {
        console.error('Error logging in:', error);
        alert('compra nao aprovada!!');
    }
}



if(isActive){
    const preco = rifaData?.preco || 0;
    const valueOrderBump = rifaData?.valueOrderBump || 0;
    const discontOrderBump = rifaData?.discontOrderBump || 0; // desconto em porcentagem
    
    // Calculando o preço com o desconto aplicado
    const precoComDesconto = preco * (1 - discontOrderBump / 100);
    
    // Cálculo das partes do total
    const totalPrimeiraParte = quantidadeValue * preco;
    const totalSegundaParte = valueOrderBump * precoComDesconto;
    
    // Soma dos totais e formatação para duas casas decimais
    vale = (totalPrimeiraParte + totalSegundaParte).toFixed(2);    
}

const handleBuyWithOrderBump = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!nomeValue|| !emailValue || !cpfValue || !telefoneValue  ) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    
    try {
        
        if(isActive){
    
            const preco = rifaData?.preco || 0;
            const valueOrderBump = rifaData?.valueOrderBump || 0;
            const discontOrderBump = rifaData?.discontOrderBump || 0; // desconto em porcentagem

            // Calculando o preço com o desconto aplicado
            const precoComDesconto = preco * (1 - discontOrderBump / 100);

            // Cálculo das partes do total
            const totalPrimeiraParte = quantidadeValue * preco;
            const totalSegundaParte = valueOrderBump * precoComDesconto;

            // Soma dos totais e formatação para duas casas decimais
            const vale = (totalPrimeiraParte + totalSegundaParte).toFixed(2);

    
            const res = await axios.post('http://localhost:3080/api/compradores/prepix', {
                nome: nomeValue,
                sorteioId: rifaData?._id,
                sorteio: rifaData?.titulo,
                imagem:rifaData?.imagem,
                telefone:telefoneValue,
                email: emailValue,
                cpf: cpfValue,
                quantidadesBilhetes: quantidadeValue,
                valorPago: vale,
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await res.data.id;
            closeModal();
    
            if(data){
                const result = await axios.post(`http://localhost:3080/api/compradores/pix/${data}`);
                
                router.push(`/pagar?=${data}&id=${result.data.Id_Transaction}`)
             }

        }else{
            const res = await axios.post('http://localhost:3080/api/compradores/prepix', {
                nome: nomeValue,
                sorteioId: rifaData?._id,
                sorteio: rifaData?.titulo,
                imagem:rifaData?.imagem,
                telefone:telefoneValue,
                email: emailValue,
                cpf: cpfValue,
                quantidadesBilhetes: quantidadeValue,
                valorPago: (quantidadeValue * (rifaData?.preco || 0)).toFixed(2),
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await res.data.id;
            closeModal();
    
            if(data){
                const result = await axios.post(`http://localhost:3080/api/compradores/pix/${data}`);
                
                router.push(`/pagar?=${data}&id=${result.data.Id_Transaction}`)
             }
    
        }
       
        
    } catch (error) {
        console.error('Error logging in:', error);
        alert('compra nao aprovada!!');
    }
}


   const openModal = () => {
        setIsModalOpen(true);
    }
   
   const closeModal = () => {
        setIsModalOpen(false);
    }


    const openModalOrderBump = () => {
        setIsModalOpen(false);
        setIsModalOpenOrderBump(true);
    }
   
   const closeModalOrderbump = () => {
        setIsModalOpenOrderBump(false);
        setIsModalOpen(false);
    }


   useEffect(() => {
       // pegando dados de uma unica rifa pela slug
          const fetchSingleData = async () => {
            try {
            const res = await axios.get(`http://localhost:3080/api/rifas/${valueSlug}`)
            setRifaData(res.data.Rifas)
            } catch (error) {

        }
          };
      
            fetchSingleData();
        }, [valueSlug]);
      

    const day:Date = new Date()
    const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const newValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        const formattedValue = newValue.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3'); // Formata o número conforme (99) 99999-9999
      
        setTelefoneValue(formattedValue);
      };
      
      const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const newValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        const formattedValue = newValue.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4'); // Formata o CPF conforme 999.999.999-99
      
        setCpfValue(formattedValue);
      };
      
      function substituirPipePorQuebraDeLinha(texto: string) {
        return texto.replace(/\|/g, '\n\n');
      }
    
      const descricaoAtualizada = rifaData ? substituirPipePorQuebraDeLinha(rifaData.descricao) : '';



return(
  <>

    <div className="container-md  flex flex-row max-md:flex-col justify-center">

        <div className="w-[50%] max-md:w-[100%] max-md:p-4 max-md:mb-4">
                <SlideShow images={[`${rifaData?.imagem}`]} />
          </div>
     
          <div className="w-[50%] max-md:w-[100%] max-md:p-4 md:pl-4">
                        <div>
                            <div className="hidden md:block">
                                <h3 className="px-2 pt-2 text-gray-600 font-semibold text-lg mx-1 break-words">
                                    {rifaData?.titulo}
                                </h3>
                               
                                <h3 className="text-red-500 px-2 pt-2"></h3>
                            </div>
                            <p className="text-sm text-gray-600 px-4 mx-2 text-center">POR APENAS <span className="bg-lime-700 text-white p-1 rounded-md">
                                    R$ {rifaData?.preco}
                                </span>
                            </p>
                            
                        </div>
                           {/* descricao da rifa */}
                         <div className=" bg-white mt-3 overflow-y-auto text-clip break-words text-sm mx-4 p-2 rounded-lg shadow-md max-h-[150px] md:max-h-[300px]">
                                <p>
                                {descricaoAtualizada &&
                                    descricaoAtualizada.split('\n\n').map((linha, index) => (
                                        <div key={index}>
                                        {linha}
                                        <br /><br /> {/* Adiciona uma quebra de linha entre os blocos */}
                                        </div>
                                    ))}
                                </p>
                            </div>
                        {

                      rifaData?.status === 'disponivel' ?

                      (<div className="p-4 mb-1">
                      <a href="/pedidos" className="inline-flex items-center justify-center text-white p-2 rounded w-full bg-indigo-600 font-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mx-2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
                          </svg>
                          Ver meus números
                      </a>                       
                  </div>): (<div className="p-4 mb-1">
                      <a href="/ganhadores" className="inline-flex items-center justify-center text-white p-2 rounded w-full bg-green-600 font-medium">
                          
                          Ver Ganhadores
                      </a>                       
                  </div>)

                        }
                        
                </div>
  
      </div>
{
   rifaData?.status === 'disponivel' ?
   (
   <>
<div className="py-2 lg:mt-5">
   <h1 className="text-2xl text-gray-600 font-semibold mx-4">🍀 Cotas</h1>
   <p className="mx-4 text-md text-gray-400">Escolha sua quantidade de chances de ganhar</p>
</div>

<div className="p-4 rounded-b-lg bg-white mb-20">

      <Modal isOpen={isModalOpen} onClose={closeModal} >
            {
              <div className="flex flex-col justify-center">
                  <h2 className="text-xl text-center px-4 text-black font-bold">Comprar Cotas Agora mesmo</h2>
                    <input required  type="nome" onChange={(e) => setnomeValue(e.target.value) } name="nomeValue" className="p-4 b-2 mx-4 my-2 outline-0 border-b-2 border-black" placeholder="Nome Completo"/>
                    <input required type="text"  value={telefoneValue} onChange={handleTelefoneChange}  name="telefoneValue" className="p-4 b-2 mx-4 my-2 outline-0 border-b-2 border-black" placeholder="Telefone: (99) 99999-9999"/>
                    <input required type="text"  value={cpfValue} onChange={handleCpfChange}   name="cpfValue" className="p-4 b-2 mx-4 my-2 outline-0 border-b-2 border-black" placeholder="CPF: 999.999.999-99"/>
                    <input required type="email" onChange={(e) => setEmailValue(e.target.value) }  name="emailValue" className="p-4 b-2 mx-4 my-2 outline-0 border-b-2 border-black" placeholder="E-mail"/>
               <div>
                          <p className="text-center text-xl my-4">Valor a Pagar: R$ {(quantidadeValue * (rifaData?.preco || 0)).toFixed(2)}  </p>
                          <p className="text-center text-xl my-4">Ao efetuar a compra eu declaro que li e concordo com os <Link href={`/termos`} className="text-green-600 hover:text-black text-xl">Termos e Condições</Link></p>
                    </div>
                    <div className="flex justify-center">
                      <button onClick={orderBump ? openModalOrderBump : handleBuy} className="bg-black text-white p-4 w-44 mx-4 hover:text-black hover:bg-black/25">Pagar via Pix</button>   
                    </div>
              </div>
            }
        </Modal>


  { orderBump ?
      <Modal isOpen={isModalOpenOrderBump} onClose={closeModalOrderbump} >
      {
        <div className="flex flex-col justify-center">
            <h2 className="text-xl text-center px-4 text-black font-bold">OFERTA IMPERDIVEL!</h2>
            <p className="text-center text-xl my-4">DESCONTO DE {rifaData.discontOrderBump}% !!</p>

              <div>
                <div className="flex flex-row space-x-2">
                    <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
                    <p className="text-black font-semibold text-xl">+{rifaData.valueOrderBump} Bilhetes</p>
                </div>
                <p className="text-black font-bold text-md">aumente agora mesmo suas chances de ganhar</p>
                { isActive ?
                    <p className="text-center text-xl my-4">Valor a Pagar: R$ {vale}  </p>
                        :                     
                    <p className="text-center text-xl my-4">Valor a Pagar: R$ {(quantidadeValue * (rifaData?.preco || 0)).toFixed(2)  }  </p>
                }
              </div>
              <div className="flex justify-center">
                <button onClick={handleBuyWithOrderBump} className="bg-black text-white p-4 w-44 mx-4 hover:text-black hover:bg-black/25">Pagar via Pix</button>   
              </div>
        </div>
      }
  </Modal>
:<></>
  }  
    
  <div className="text-center">
      <span className="mb-2 text-gray-400 text-sm">Digite ou selecione a quantidade de números</span>
  </div>

  <input id="ticket_amount_input" min="5" value={quantidadeValue === 0 ? '' : quantidadeValue} onChange={(e) => setQuantidadesValue(Number(e.target.value))}  placeholder="" className="p-1 w-full text-center focus:border-2 focus:border-green-600 rounded-lg bg-gray-100 text-dark border-1 border-gray-400 font-bold focus:outline-none focus:border-lime-700 focus:ring-lime-700 only-number-input" type="number"/>
 
  <div className="text-center my-4">
      <p id="random-description" className="text-black">{quantidadeValue}x R$ R$&nbsp;{(quantidadeValue * (rifaData?.preco || 0)).toFixed(2)} = <strong>R$&nbsp;{(rifaData?.preco || 0)}</strong></p>
  </div>


  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 overflow-hidden p-3">
       <button  data-amount="1" onClick={()=> setQuantidadesValue(1) } className="random-option text-center p-1 shadow-lg cursor-pointer rounded-lg bg-gray-100 border-gray-200 text-dark border-1 border-solid select-none">
                                      <div className="pointer-events-none rounded flex flex-col justify-center py-2">
                                      <span className="pointer-events-none text-lg">
                                          + 01
                                      </span>
                                          <span className="uppercase text-sm pointer-events-none w-full rounded">Adicionar</span>
                                      </div>
          </button>
                <button  onClick={()=> setQuantidadesValue(15) } data-amount="15" className="random-option text-center p-1 shadow-lg cursor-pointer rounded-lg bg-gray-100 border-gray-200 text-dark border-1 border-solid select-none">
                                      <div className="pointer-events-none rounded flex flex-col justify-center py-2">
                                      <span className="pointer-events-none text-lg">
                                          + 15
                                      </span>
                                          <span className="uppercase text-sm pointer-events-none w-full rounded">Adicionar</span>
                                      </div>
                  </button>
                <button onClick={()=> setQuantidadesValue(50) } data-amount="50" className="random-option text-center p-1 shadow-lg cursor-pointer rounded-lg bg-gray-100 border-gray-200 text-dark border-1 border-solid select-none">
                                      <div className="pointer-events-none rounded flex flex-col justify-center py-2">
                                      <span className="pointer-events-none text-lg">
                                          + 50
                                      </span>
                                          <span className="uppercase text-sm pointer-events-none w-full rounded">Adicionar</span>
                                      </div>
                 </button>

                <button onClick={()=> setQuantidadesValue(100) } data-amount="100" className="random-option text-center p-1 shadow-lg cursor-pointer rounded-lg bg-gray-100 border-gray-200 text-dark border-1 border-solid select-none">
                                      <div className="pointer-events-none rounded flex flex-col justify-center py-2">
                                      <span className="pointer-events-none text-lg">
                                          + 100
                                      </span>
                                          <span className="uppercase text-sm pointer-events-none w-full rounded">Adicionar</span>
                                      </div>
                 </button>
                              
</div>
  <button id="purchase-btn" onClick={() =>  openModal() } className="py-2 text-white px-3 rounded w-full bg-green-600 text-2xl font-medium" type="submit">Prosseguir</button>
</div>
</>
) :(

<div className="py-2 lg:mt-5">
   <h1 className="text-2xl text-white text-center rounded-md bg-red-600 p-4 font-semibold mx-4">Rifa Encerrada</h1>
</div>
)

}
      
  
         </>

        )
};

export default rifaSingle;
