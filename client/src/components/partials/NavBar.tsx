import { useState } from "react";
import { UserIcon } from "../ui/icons";
import { AppBar } from "../ui/surfaces";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { Select, SelectOption } from "../ui/inputs";
import { Lang } from "../../models/entities";
import { useLocalStorage } from "../../hooks/use-local-storage";
import { i18n } from "../../lib";

const languageSelectOption: SelectOption[] = Object.entries(Lang).map(([label, value]) => ({ label, value }));

export const NavBar = () => {

    const { t } = useTranslation();

    const { isAuth, user } = useAppSelector(state => state.auth);

    const [storageLanguage, setStorageLanguage] = useLocalStorage<keyof typeof Lang>('lang', "en");

    const [currentLanguage, setCurrentLanguage] = useState<SelectOption>(
        isAuth
            ? { label: user.lang, value: user.lang }
            : { label: storageLanguage, value: storageLanguage }
    );

    const handleChangeLanguage = (option: SelectOption | undefined) => {
        if (!option) return;

        i18n.changeLanguage(option.value).then(() => {
            if (isAuth) {
                // TODO edit profile with new lang
            }
            setCurrentLanguage(option);
            setStorageLanguage(option.value as Lang);
        });
    }

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
                <div className="text-xl flex justify-between items-end h-8 gap-5">
                    <Select
                        label="label"
                        className="!bg-transparent w-16"
                        variant="lined"
                        iconSize="sm"
                        value={currentLanguage}
                        options={languageSelectOption}
                        onChange={(option) => handleChangeLanguage(option as SelectOption | undefined)}
                    />
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
