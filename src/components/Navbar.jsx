import React from 'react'
import Logo2 from "../assets/logo2.png"
import Logo from "../assets/logo1.png"
const Navbar = () => {
  return (
    <>
    <div className='flex justify-between items-center'>
        <img src={Logo2} alt="Logo" className='w-[60px] lg:w-[100px] mr-4'/>
        <div className='flex flex-col justify-center'>
        <h1 className='text-center font-serif font-semibold text-black text-[30px] lg:text-4xl'>iGEM-2024</h1>
        <p className='text-center text-[10px]'>THE HEART OF SYNTHETIC BIOLOGY</p>  
        </div>
        <img src={Logo} alt="Logo" className='w-[80px] lg:w-[100px]'/>
    </div>
    <div className='w-full h-fit bg-black text-white text-center '>
        <h1 className='text-[10px]'>REC - CHENNAI</h1>
    </div>
    </>
  )
}

export default Navbar
