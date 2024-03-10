import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Rifa {
  id: number;
  titulo: string;
  descricao: string;
  imagem: string;
  slug: string;
  status: string;
  // Outras propriedades da Rifa
}

interface RifaShowProps {
  rifa: Rifa;
}

const RifaShow: React.FC<RifaShowProps> = ({rifa}) => {
  
   if (!rifa) {
    return <p>Rifa não encontrada.</p>;
  }
     
  function limitarTexto(texto:string, limite:number) {
    return texto.length > limite ? texto.slice(0, limite) + '...' : texto;
  }


  return (
    <Link href={`/rifas?=${rifa.slug}`} className="w-full">
    <div className="flex w-full rounded-xl bg-white rounded overflow-hidden mb-1 shadow-md hover:shadow-lg content-center relative">
      {/* foto da rifa */}
      <img className="max-w-[120px] min-h-[120px] w-[200px] h-[100px] object-cover" src={rifa.imagem} alt="alternative image" />

      <div className="flex flex-col w-full px-2 justify-center">
        {/* nome da rifa*/}
        <div className="text-black"> {rifa.titulo}</div>

        {/* descricao da rifa*/}
        <div className="text-gray-500 text-sm">{limitarTexto(rifa.descricao, 40)}</div>
      </div>

      {rifa.status === 'disponivel'  ? (
        <span className="animate-bounce rounded bg-green-600 px-1.5 text-[13px] bg-opacity-80 text-white absolute top-[10px] right-[6px]">Adquira já!</span>
      ) : (
        <span className="rounded bg-red-600 px-1.5 text-[13px] bg-opacity-80 text-white absolute top-[10px] right-[6px]">Encerrada!</span>
      )}
    </div>
  </Link>
  );
}

export default RifaShow;
