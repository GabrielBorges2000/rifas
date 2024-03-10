import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';

interface PagarProps {
  Payslug: string;
  Id_transaction: string; // Defina Id_transaction como do tipo ObjectId
}



const Pagamento: React.FC<PagarProps>= ({Payslug, Id_transaction}) => {

  const [imagem, setImagem] = useState<String>('');
  const [qrcode, setQrcode] = useState<String>('');
  const [qrcodeLink, setQrcodeLink] = useState<String>('');
  const [ID, setID] = useState(null);
  const [valor, setValor] = useState<String>('');
  const inputRef = useRef<any | null>(null);
  const [carregamentoPagina, setCarregamentoPagina] = useState(false)
  const [verificar, setVerficar] = useState(false)
  const router = useRouter();
  

  
  const slug = Payslug.toString();
  const ID_Trasction = Id_transaction.toString()
 
 // pegando dados do comprador 
  const getData = async () => {

    const res = await axios.get(`http://localhost:3080/api/compradores/get/id/${slug}`);

      setImagem(res.data.imagem)
      setValor(res.data.valorPago)

}



//verificando pagamento 
const verify = async () =>{
  try {
    if (!ID) {
      console.error('ID não definido.');
      return;
    }

    const statusResult = await axios.get(`http://localhost:3080/api/compradores/status/${ID}`);

    if (statusResult.data.status === 'approved') {
      const res = await axios.post(`http://localhost:3080/api/compradores/pix/${slug}/${statusResult.data.status}`);
      if(res.data) {
           router.push('/pedidos')
        }
      }

  } catch (error) {
    console.error('Erro:', error);
  }
}

 // cancelando pagamento 
const cancel = async () => {
  try {
    if (!ID) {
      console.error('ID não definido.');
      return;
    }

    const statusResult = await axios.get(`http://localhost:3080/api/compradores/status/${ID}`);

    // Verifica se o status não é 'approved' antes de cancelar após 5 minutos
    if (statusResult.data.status !== 'approved') {
      const cancelResult = await axios.get(`http://localhost:3080/api/compradores/cancel/${ID}/${slug}`);

      if (cancelResult.data.status === 'cancelled') {
        router.push('/');
      }
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

// pegando qrcode 
const pegarQrcode = async () => {
  try {
      const result = await axios.get(`http://localhost:3080/api/compradores/pegando/${ID_Trasction}`);
      setQrcode(result.data.qr_code.qr_code_img);
      setQrcodeLink(result.data.qr_code.qr_code_link);

      const transactionID = result.data.Id_Transaction;
      console.log()
      setID(transactionID);
      setVerficar(true);

    } catch (error) {
    console.error('Error logging in:', error);

  }}



if(!carregamentoPagina) {
  setCarregamentoPagina(true);
  pegarQrcode();
  getData();
}




useEffect(() => {
  if (verificar) {
    verify();

    const verifyInterval = setInterval(() => {
      verify();
    }, 30000); // Verifica a cada 30 segundos

    const cancelInterval = setTimeout(() => {
      cancel();
      clearInterval(verifyInterval); // Limpa o intervalo de verificação após 5 minutos
    }, 300000); // 5 minutos em milissegundos

    return () => {
      clearInterval(verifyInterval);
      clearTimeout(cancelInterval);
    };
  }


}, [verificar]);


  
  const copyToClipboard = () => {
    inputRef.current.select();
    document.execCommand('copy');
    inputRef.current.setSelectionRange(0, 0);
    alert('Codigo copiado com sucesso');
  };

  return(
      <>
    <section className="mb-20">

        <div className="bg-[#00A453] ">
          <div className="container items-center flex flex-row justify-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:pb-56 sm:pb-56  max-sm:pb-56   dark:text-gray-900">
            <h1 className="text-xl font-bold   xl:max-w-md  max-sm:text-md text-white mx-10">Pague via Pix R${valor.toString().replace('.',',')} para garantir sua cota !! </h1>
            <div className="w-32 h-32 max-sm:w-20 max-sm:h-20   rounded-full bg-white aspect-square"><img className="w-32 h-32 max-sm:w-20 max-sm:h-20 rounded-full bg-white aspect-square	" src={`${imagem}`} alt="" /></div>
          </div>
        </div>

      <div className="max-w-[550px] bg-white flex flex-col mx-auto -mt-40 rounded-lg shadow-md max-sm:mx-5 p-4">
          <img src={`data:image/jpeg;base64,${qrcode}`} className="w-80 h-80 mx-auto mb-12  " />
          <input readOnly type="text" ref={inputRef} value={`${qrcodeLink}`}  className="form-control" />
          <button onClick={copyToClipboard} className="bg-[#00A84F] text-white text-center rounded-md my-2 p-2 ">Copiar Codigo</button>          
          <div className="text-center rounded-md my-2 p-2 text-black border-[1px] border-[#ffecb5] bg-[#fff3cd]">Copie o código e cole no aplicativo do seu banco para efetuar o pagamento com PIX</div>          
          <div className="text-center rounded-md my-2 p-2 text-black border-[1px] border-[#b6effb] bg-red-600">Se nao for pago apos 5 minutos essa compra sera cancelada.</div>          
          <div className="text-center rounded-md my-2 p-2 text-black border-[1px] border-[#badbcc] bg-[#d1e7dd]">ATENÇÃO, SERÁ COBRADA UMA TAXA DE R$0,07 PELO MERCADO PAGO EXEMPLO: SE SEU PAGAMENTO FOR R$1,70 SERÁ COBRADO R$1,77</div>
      </div>

   </section>

      </>
  )
};


export default Pagamento;

