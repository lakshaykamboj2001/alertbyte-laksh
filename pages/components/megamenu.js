import React, { useState,useEffect } from 'react';
import Link from 'next/link'; 
import { FaArrowRight } from 'react-icons/fa';

const MegaMenu= ()=>{
 

    // hide mega-menu on child link click
    const dropdownMenu = typeof document !== 'undefined' && document.querySelector('.dropdown-menu');
    const childElements = dropdownMenu && dropdownMenu.querySelectorAll('.mm-link');
    if(dropdownMenu && childElements ){
        childElements.forEach(link => {
        link.addEventListener('click', () => {
          dropdownMenu.classList.remove('show');
        });
      });
    }

    // hide mobile-menu on child link click
    const mobMenu = typeof document !== 'undefined' && document.querySelector('.mobile-menu ');
    const mobLinks = mobMenu && mobMenu.querySelectorAll('.mm-link');
    if(mobMenu && mobLinks ){
        mobLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobMenu.style.left='100%';
        });
      });
    }


      
  return(
    <>
    <div className="mmenu-ul">
     <ul className='mmenu-opt'>
      <li className='mm-link'>Personal Monitor</li>
      <li className='mm-link'>Community Monitor</li>
      <li className='mm-link'>Search Crypto</li>
      <li className='mm-link'>Wallet Check</li>
      <li className='mm-link'>NFT Checker</li>
      <li className='mm-link'>NFT Details</li>
    </ul>
    </div>
    </>
  );
}
export default MegaMenu;

 