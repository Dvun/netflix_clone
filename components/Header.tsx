import React, { memo, useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';


const Header = memo(() => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = useCallback(() => {
    if (window.scrollY > 0) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }, [setIsScrolled])

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className='flex items-center space-x-2 md:space-x-10'>
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
          alt='bgImage'
        />
        <ul className='hidden space-x-4 md:flex'>
          <li className='headerLink'>Home</li>
          <li className='headerLink'>TV Shows</li>
          <li className='headerLink'>Movies</li>
          <li className='headerLink'>New & Popular</li>
          <li className='headerLink'>My List</li>
        </ul>
      </div>

      <div className='flex items-center space-x-4 text-sm font-light'>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='hidden h-6 w-6 sm:inline'/>
        <p className='hidden lg:inline'>Kids</p>
        <FontAwesomeIcon icon={faBell} className='h-6 w-6'/>
        <Link href='#'>
          <img src="https://rb.gy/g1pwyx" alt="" className='cursor-pointer rounded'/>
        </Link>
      </div>
    </header>
  );
});

export default Header;