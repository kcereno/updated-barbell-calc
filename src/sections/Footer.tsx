import React from 'react';
import { currentYear } from '../data/variables';

function Footer() {
  return (
    <footer className=" bg-slate-800 text-white text-center absolute bottom-0 w-full h-20 flex justify-center items-center">
      <p className="text-xs">{`Karl Cereno ${currentYear}`}</p>
    </footer>
  );
}

export default Footer;
