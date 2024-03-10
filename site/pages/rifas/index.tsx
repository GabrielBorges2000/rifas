import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import { useRouter } from 'next/router';
import MobileHeader from "../../components/mobileHeader";
import RifaSingle from "../../components/rifaSingle";
import SectionFooter from "../../components/sectionFooter";



const rifas: NextPage =  () => {

const router = useRouter();
//utilizando slug para pegar rifa single
const { "" : slug } = router.query;

return(
  <>
<div className='md:hidden'>
        <MobileHeader />
      </div>
  <Header />

  <div className="max-w-5xl my-10 mx-auto flex flex-col">
    {slug && <RifaSingle rifaSlug={slug as string} />}
    </div>
    <SectionFooter/>

    </>

        )
};

export default rifas;
