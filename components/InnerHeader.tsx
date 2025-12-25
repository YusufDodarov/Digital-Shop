"use client"
import {  MonitorSmartphone, Search } from 'lucide-react'
import Link from 'next/link'
import CartDropdown from './cart'
import { ContextMenu, ContextMenuTrigger } from './ui/context-menu'
import { ModeToggle } from './Theme'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ReactNode, useState } from 'react'
import { useTheme } from 'next-themes'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import Like from './ModalLike'

export default function InnerHeader({ auth,isAdmin }: { auth: ReactNode }) {
    const { theme } = useTheme()
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
    const [search,setSearch]=useState<string>("")
    return (
        <>
            <header className={`fixed h-35 md:h-40 top-0 left-0 w-full shadow-md z-50 py-2 md:py-10 px-4 md:px-4 flex flex-col md:flex-col justify-center ${theme === "dark" ? "bg-[#1f1f1f] text-white" : "bg-white text-black"}`}>
                <div className='flex flex-row items-center justify-between px-2 md:px-10 py-2 md:py-3 gap-4 md:gap-0'> 
                    <div className="flex items-center gap-2 text-lg md:text-xl font-semibold">
                        <MonitorSmartphone className="w-5 h-5 md:w-6 md:h-6" />
                        <Link href="/" className="transition-colors duration-200">Digital Shop</Link>
                    </div>
                    <div className="md:hidden flex items-center gap-2 text-sm">{auth}</div>

                    <div className='hidden md:flex justify-center items-center gap-2 md:gap-4 w-full md:w-auto'>
                        <Input 
                        value={search} 
                        onChange={(ev)=>setSearch(ev.target.value)}
                         placeholder='search...' type='search' 
                         className='w-full md:w-60' />
                        <Button onClick={()=>{window.dispatchEvent(new CustomEvent("search",{detail:search}))}}><Search /></Button>
                        <ModeToggle />
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-4 md:gap-10 justify-between px-3 md:px-10  md:mt-4 border-t  border-gray-200 dark:border-gray-700 pt-2">
                    <div className="hidden md:block">
                        <ContextMenu>
                            <ContextMenuTrigger className='flex gap-2'>Welcome to <span className='flex gap-2'><MonitorSmartphone /> DigitalShop</span></ContextMenuTrigger>
                        </ContextMenu>
                    </div>
                    <div className='flex justify-center items-center gap-2 md:gap-6 lg:gap-10 w-full md:w-auto '> 
                        <div><Like/></div>
                        <div className="relative cursor-pointer "> <CartDropdown isAdmin={isAdmin} /></div>
                        <div className="ml-8">{auth}</div> 
                    </div>
                </div>
            </header>

            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <DialogTrigger asChild>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md p-0">
                    <DialogTitle className="sr-only">Search</DialogTitle> 
                    <div className="p-4 flex gap-2">
                        <Input placeholder='search...' value={search} type='search' className='flex-1' onChange={(ev)=>setSearch(ev.target.value)}  autoFocus 
                            onKeyDown={(e) => {
                                if (e.key === 'Escape'){
                                    setIsSearchOpen(false)
                                } else if(e.key==="Enter"){
                                    window.dispatchEvent(new CustomEvent("search",{detail:search}))
                                }
                                }}/>
                        <Button type="button" onClick={() => {
                        window.dispatchEvent(new CustomEvent("search",{detail:search}))
                        setIsSearchOpen(false)}}><Search className="w-4 h-4" /></Button>
                    </div>
                </DialogContent>
            </Dialog>

            <div className={`md:hidden fixed bottom-0  left-0 w-full h-20 ${theme === "dark" ? 'bg-[#1f1f1f] text-white' : 'bg-[white] text-black'} z-40 flex items-center justify-between px-5   border-t border-gray-200 dark:border-gray-700`}>
               <div className='flex-1 flex items-center justify-center'>
                 <Button variant="ghost" size="sm" className="p-3 rounded-xl w-12 h-12" onClick={() => setIsSearchOpen(true)}><Search className="w-6 h-6" /></Button>
               </div>
            <div className='flex-1 flex items-center justify-center'> 
                <Like /> 
             </div>
               <div className='flex-1 flex items-center justify-center mr-0'> 
                    <div className="relative p-2 mb-3 mr-7">
                        <CartDropdown isAdmin={isAdmin} />
                    </div>
               </div>
               <div className='flex-1 flex items-center justify-center'>
                 <div className="p-3 rounded-xl mb-2 w-12 h-12">
                    <ModeToggle />
                 </div>
               </div>
            </div>
        </>
    )
}