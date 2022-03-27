import { useState } from 'react';

import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from "react-icons/ai";

import logo from  '../../images/logo.png';

const NavbarItem = ({ item, classProps }) => {
  return (
    <li className={`mx-3 cursor-pointer ${classProps}`}>
      {item}
    </li>
  )
}

const Navbar = () => {

  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] justify-center items-center">
       <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
      {["Markets", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
        <NavbarItem key={item + index} item={item} />
      ))}
        <li className="bg-[#2952e3] px-7 py-2 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
      </ul>
      {toggleMenu
      ? <AiOutlineClose fontSize={28} className="text-white cursor-pointer md:hidden" onClick={() => setToggleMenu(false)} />
      : <HiMenuAlt4 fontSize={28} className="text-white cursor-pointer md:hidden" onClick={() => setToggleMenu(true)} /> }
      {toggleMenu && (
        <ul
          className="z-10 fixed top-0 -right-2 p-3 md:hidden h-screen list-none rounded-md w-[70vw] shadow-2xl 
          flex flex-col justify-start items-end blue-glassmorphism text-white animate-slide-in"
        >
          <li className="w-full text-xl my-2">
            <AiOutlineClose  onClick={() => setToggleMenu(false)} />
          </li>
          {["Markets", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
            <NavbarItem key={item + index} item={item} classProps="my-2 text-lg" />
          ))}
        </ul>
      )}
    </nav>
  )
}

export default Navbar;