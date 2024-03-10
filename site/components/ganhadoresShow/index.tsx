import { useState, useEffect } from 'react';



interface Ganhador {
  id: number;
  nome:String;
  imagem:String;
  sorteio:String;
  descricao: string;
  numerosSorteados:[Number],
}

interface GanhadoresShowProps {
  Ganhador: Ganhador;
}

const ganhadoresShow: React.FC<GanhadoresShowProps> = ({Ganhador}) => {

  return (
    <div className="w-full flex rounded-xl bg-white rounded overflow-hidden shadow-lg mb-1 p-1.5 relative winner-card">
                        
        {/* foto do sortedo */}
                        <img className="rounded-full h-16 object-cover w-16" src={`${Ganhador.imagem}`} alt=""/>
            
    <div className="flex justify-end w-full absolute top-1 right-1">
        <p className="text-[13px] text-slate-400">Cota</p>
        
           {
              Ganhador.numerosSorteados[0] !== undefined ? (
                <span className="rounded-md font-semibold text-green-600 px-1.5 text-[13px]">
                  {Ganhador.numerosSorteados[0].toString()}
                </span>
        ) : null
}
    </div>

    <div className="flex flex-col w-full px-2 justify-center">
        {/* nome do ganhador */}
        <div>{Ganhador.nome}</div>
        {/* nome do sorteio que o ganhador ganhou */}
        <div className="text-gray-500 text-sm">{Ganhador.sorteio}</div>
    </div>
</div>
  );
}

export default ganhadoresShow;
