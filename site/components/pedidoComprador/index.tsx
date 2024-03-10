import Link from 'next/link';
import { useState, useEffect } from 'react';

interface pedidoComprador {
  nome: string;
  sorteio: string;
  imagem: string;
  quantidadesBilhetes: string;
  numerosComprados: [number];
  dataComprada: string;
}

interface pedidoProps {
  pedido: pedidoComprador;
}

const PedidoComprador: React.FC<pedidoProps> = ({pedido}) => {
  
  const data = pedido.dataComprada; // Sua data original

  const dataFormatada = new Date(data).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  


   if (!pedido) {
    return <p>Rifa não encontrada.</p>;
  }
     

  return (
    <div className="w-full rounded-md bg-white h-auto">
        {/* foto da rifa */}

<img className=" min-h-[120px] w-full rounded-t-md  h-[300px] object-cover" src={pedido.imagem} alt="alternative image" />

        <div className="flex w-full  overflow-hidden mb-1 shadow-md hover:shadow-lg content-center relative">

        <div className="flex flex-col w-full px-2 justify-center">
            {/* nome da rifa*/}
            <div className="text-black">Nome do comprador: {pedido.nome}</div>
            <div className="text-black">Sorteio concorrido: {pedido.sorteio}</div>
            <div className="text-black">Quantidade bilhetes: {pedido.quantidadesBilhetes}</div>
            <div className="text-black">Data da compra: {dataFormatada}</div>
          
          <div className='flex flex-col'>
             <h2 className='text-left text-black'>Numeros Comprados</h2> 
             <div className='grid grid-cols-3 gap-4'>
                {pedido.numerosComprados.map((numero, index) => (
                  <div key={index + 1} className='py-4 px-2'>
                    <p className='rounded my-4 bg-green-600 p-2 text-[15px] bg-opacity-80 text-white'>
                      <p className='text-md'>{index + 1}</p>{numero}
                    </p>
                  </div>
                ))}
             </div>

            </div>

        </div>
    </div>
</div>
  );
}

export default PedidoComprador;
