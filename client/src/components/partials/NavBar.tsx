import { AppBar } from "../ui/surfaces";

export const NavBar = () => {
    return (
        <AppBar position="sticky" className="!bg-[#1e1e1ebf]">
            <div className='w-ful font-bold flex justify-between items-center py-2 px-3'>
                <div className='text-2xl'>
                    SiteName
                </div>
                <div>
                    Login/Register
                </div>
            </div>
        </AppBar>
    )
}
