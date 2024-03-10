import Link from 'next/link';
import { useState, useEffect } from 'react';


const sectionFooter: React.FC = () => {
  

  return (
  
    <section className="bg-green-700 bottom-0 h-auto relative w-full  pt-10 mt-20" id="steps">
<div className="max-w-7xl mx-auto flex flex-col items-start">
<div className="flex flex-col md:flex-row items-start text-white ">
<div className="flex-1 relative p-4 min-h-[180px]">
<span className="absolute text-black font-extrabold text-opacity-20 text-[180px] font-sans -top-[100px] -left-[5px]">1</span>
    <h2 className="uppercase font-bold text-lg mb-4">
          <i className="fas fa-search" aria-hidden="true"></i>
          ESCOLHA A AÇÃO
    </h2>
<p className="text-sm">Escolha a ação que gostaria de concorrer, verifique a descrição, regulamento
da ação e fotos. Em caso de dúvidas entre em contato com o administrador.</p>
</div>
<div className="flex-1 p-4 relative min-h-[180px]">
<span className="absolute text-black font-extrabold text-opacity-20 text-[180px] font-sans -top-[100px] -left-[5px]">2</span>
<h2 className="uppercase font-bold text-lg mb-4">
<i className="fas fa-check-circle" aria-hidden="true"></i>
SELECIONE SEUS BILHETES
</h2>
<p className="text-sm">Você pode escolher quantos bilhetes desejar!
Mais bilhetes, mais chances de ganhar.</p>
</div>
<div className="flex-1 p-4 relative min-h-[180px]">
<span className="absolute text-black font-extrabold text-opacity-20 text-[180px] font-sans -top-[100px] -left-[5px]">3</span>
<h2 className="uppercase font-bold text-lg mb-4">
<i className="fas fa-money-bill-wave" aria-hidden="true"></i>
FAÇA O PAGAMENTO
</h2>
<p className="z-20 text-sm">Faça o pagamento no(s) método(s) de pagamento(s) disponíveis no site.</p>
</div>
<div className="flex-1 p-4 relative min-h-[180px]">
<span className="absolute text-black font-extrabold text-opacity-20 text-[180px] font-sans -top-[100px] -left-[5px] ">4</span>
<h2 className="uppercase font-bold text-lg mb-4">
<i className="fas fa-hourglass-half" aria-hidden="true"></i>
AGUARDE O RESULTADO
</h2>
<p className="z-20 text-sm">Aguarde a ação. Cruze os dedos! Você pode ser o próximo sorteado.</p>
</div>
</div>
</div>
</section>


  );
}

export default sectionFooter;