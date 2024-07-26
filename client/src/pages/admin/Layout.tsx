import { NavLink, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="bg-zinc-100 min-h-[100svh]">
            <header className="flex items-center justify-between px-8">
                <strong className="text-xl font-bold uppercase text-blue-600 cursor-default">Office Olympics</strong>
                <nav className="flex gap-8 items-center uppercase">
                    <NavLink end to={'/admin'} className="py-5 text-base font-semibold hover:text-blue-500 transition-all">Home</NavLink>
                    <NavLink to={'/admin/players'} className="py-5 text-base font-semibold hover:text-blue-500 transition-all">Competitors</NavLink>
                </nav>
            </header>
            <Outlet />
        </div>
  )
}

export default Layout
