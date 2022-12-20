import { UserIcon } from "../ui/icons";
import { AppBar } from "../ui/surfaces";
import { useTranslation } from 'react-i18next';

export const NavBar = () => {

    const { t } = useTranslation();

    return (
        <AppBar position="sticky" className="!bg-[#1e1e1ebf]">
            <div className='w-full font-bold flex justify-between items-center py-3 px-3'>
                <div className='text-2xl text-[#d200fa]'>
                    SiteName
                </div>
                <div className="text-xl w-1/3 flex justify-between items-end h-8">
                    <div>
                        {t('Home')}
                    </div>
                    <div>
                        {t('Games')}
                    </div>
                    <div>
                        {t('News')}
                    </div>
                </div>
                <div>
                    <UserIcon className="cursor-pointer" size="lg" />
                </div>
            </div>
        </AppBar>
    )
}
