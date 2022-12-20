import { UserIcon } from "../ui/icons";
import { AppBar } from "../ui/surfaces";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

export const NavBar = () => {

    const { t } = useTranslation();

    const { isAuth } = useAppSelector(state => state.auth);

    return (
        <AppBar position="sticky" className="!bg-[#1e1e1ebf]">
            <div className='w-full font-bold flex justify-between items-center py-3 px-3'>
                <div className='text-2xl text-[#d200fa]'>
                    <Link to='/'>
                        SiteName
                    </Link>
                </div>
                <div className="text-xl w-1/4 flex justify-between items-end h-8">
                    <Link to='/'>
                        {t('Home')}
                    </Link>
                    <Link to='/'>
                        {t('Games')}
                    </Link>
                    <Link to='/'>
                        {t('News')}
                    </Link>
                </div>
                <div className="text-xl flex justify-between items-end h-8">
                    {isAuth
                        ?
                        <UserIcon className="cursor-pointer" size="lg" />
                        :
                        <div className="flex gap-5">
                            <Link to={'/login'}>
                                {t('Log in')}
                            </Link>
                            <Link to={'/registration'}>
                                {t('Sign up')}
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </AppBar>
    )
}
