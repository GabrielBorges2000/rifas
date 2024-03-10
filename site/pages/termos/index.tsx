import type { NextPage } from "next";
import Header from "../../components/header";
import SectionFooter from "../../components/sectionFooter";
import MobileHeader from "../../components/mobileHeader";



const TermsAndConditionsPage:NextPage  = () => {
  return (

    <>
     <div className='md:hidden'>
        <MobileHeader />
      </div>
  <Header />
    
    <div className="container mx-auto  px-4 py-8">
      <h1 className="text-3xl text-center font-bold mb-4">TERMOS E CONDIÇÕES</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1 – QUEM PODE PARTICIPAR</h2>
        <p>Maiores de 18 anos podem participar das ações disponíveis.</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2 – ADIAMENTO DA AÇÃO</h2>
        <p>
          A ação poderá ser adiada caso não seja realizada a venda de 100% das cotas apresentadas, como também, a
          necessidade de averiguação de alguma possível irregularidade no sistema dos sorteios.
        </p>
      </div>



      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3 – DEFINIÇÃO DO CONTEMPLADO DA AÇÃO</h2>
        <p>
        O contemplado será sempre o participante que contiver o seu nome e número de contato do
celular gravados na cota premiada.
        </p>
      </div>



      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4 – CANCELAMENTO DA AÇÃO</h2>
        <p>
        O serviço poderá ser cancelado sem aviso prévio, caso seja comprovada qualquer violação
aos termos da ação.
        </p>
      </div>



      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5 – REEMBOLSO DE PAGAMENTO</h2>
        <p>
        O reembolso das quotas pagas será unicamente realizado caso a ação seja cancelada.
O participante que no caso de pagamento em duplicidade não tiver registrado os dados
(nome e contato) no bilhete, deverá solicitar o reembolso do valor pago, apresentando
impreterivelmente o comprovante de pagamento e, após checagem do recebimento do valor
pago, realizaremos o reembolso.
        </p>
      </div>


      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6 – ATUALIZAÇÕES</h2>
        <p>
        O site poderá alterar estes termos conforme as necessidades existentes, visando
aperfeiçoar e/ou corrigir possíveis erros e problemas para promover a segurança dos
participantes
        </p>
      </div>

   

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">7 – ENTREGA AO CONTEMPLADO</h2>
        <p>
O prêmio será entregue nas condições que se encontra. As formas para entrega ou envio
serão acertadas com o contemplado da cota paga. Transferência de propriedade por conta
do contemplado.
        </p>
      </div>


      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">8 – PAGAMENTOS DAS COTAS</h2>
        <p>
Caso o pagamento tenha sido feito em nome de terceiros, será considerado ganhador
aquele cujo o nome e contato está no cadastro
        </p>
      </div>
      

    </div>
    <SectionFooter/>

    </>

  );
};

export default TermsAndConditionsPage;
