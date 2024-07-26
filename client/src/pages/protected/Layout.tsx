import { useEffect } from "react";
import { read_from_storage } from "../../storage";
import {  NavLink, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
    const navigation =useNavigate()
    useEffect(() =>{
        const data =read_from_storage('user');
        if(!data || !data.userid) navigation('/register', {replace: true})
    }, []);

    return (
        <div className="min-h-[100svh] bg-zinc-200 flex flex-col gap-8">
            <header className="flex items-center justify-between px-8 bg-white">
                <strong className="text-xl font-bold uppercase text-blue-600 cursor-default">Office Olympics</strong>
                <nav className="flex gap-8 items-center uppercase">
                    <NavLink to={'/'} className="py-5 text-base font-semibold hover:text-blue-500 transition-all">Dashboard</NavLink>
                    {/* <NavLink to={'/leaderboard'} className="py-5 text-base font-semibold hover:text-blue-500 transition-all">Leaderboard</NavLink> */}
                </nav>
            </header>
            <Outlet />
        </div>
    )
}

export default Layout;
