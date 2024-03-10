import type { NextPage } from "next";
import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/header";
import MobileHeader from "../../components/mobileHeader";
import { configDotenv } from "dotenv";
import Pagamento from "../../components/pagamento";
import { useRouter } from 'next/router';

configDotenv()
const pagar: NextPage = () => {
  const router = useRouter();
  const { "": slug, "id": Id_transaction } = router.query
  return (
    <>
      <div className='md:hidden'>
        <MobileHeader />
      </div>
      <Header />

      {slug && Id_transaction && <Pagamento Payslug={slug as string} Id_transaction={Id_transaction as string} />}

    </>
  )
};


export default pagar;

