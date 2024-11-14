import { ModeToggle } from '@/components/mode-toggle'

import { CiSquarePlus } from 'react-icons/ci'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-4'>
        <div className='h-16 w-full items-center justify-between flex flex-col sm:flex-row'>
            <div className = 'bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent text-2xl md:text-4xl sm:text-3xl font-bold'>
                <Link to='/'>Product Store 🛒</Link>
            </div>
            <div className='h-auto w-auto flex items-center justify-evenly'>
                <Link to='/create'><CiSquarePlus opacity={0.5} size={50} /></Link>
                <ModeToggle  />

            </div>
        </div>
    </div>
  )
}

export default Navbar