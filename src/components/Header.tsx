import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = ({ navItems }: { navItems: any[] }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const handle = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handle);
        return () => window.removeEventListener('scroll', handle);
    }, []);

    const transparentRoutes = ['/', '/handbook', '/contact'];
    // Check if current path starts with /project/ (detail view)
    const isTransparentRoute = transparentRoutes.includes(location.pathname) || location.pathname.startsWith('/project/');

    const headerBgClass = (!isTransparentRoute) ? 'bg-white shadow-sm py-3' : (isScrolled ? 'bg-white shadow-sm py-3' : 'bg-transparent py-6');
    const textColorClass = (!isTransparentRoute) || isScrolled ? 'text-gray-800' : 'text-white';
    const logoClass = (!isTransparentRoute) || isScrolled ? '' : 'brightness-0 invert';

    const handleNavClick = (e: React.MouseEvent, item: any) => {
        e.preventDefault();
        // Since navItem labels could be different, let's map by view
        if (item.view === 'home' && item.href === '#projects') {
            if (location.pathname !== '/') {
                navigate('/', { state: { scrollTo: 'projects' } });
            } else {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (item.view && item.view !== 'home') {
            navigate(`/${item.view}`);
        } else if (item.view === 'home' && location.pathname !== '/') {
            navigate('/');
        }
    };

    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'vi' : 'en');
    };

    return (
        <header className={`fixed w-full z-40 transition-all duration-300 ${headerBgClass}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                    <img
                        src="https://lh3.googleusercontent.com/d/18wUo0JZ3MWDLKqjRqFsS6PB5jDbZYNsA"
                        className={`h-12 ${logoClass}`}
                        alt="N&M Studio Logo"
                    />
                </div>
                <nav className="hidden lg:flex gap-8 items-center">
                    {(navItems || []).map((item, i) => {
                        const keyMap: Record<string, string> = {
                            about: 'header.about',
                            services: 'header.services',
                            home: 'header.projects',
                            handbook: 'header.handbook',
                            contact: 'header.contact'
                        };
                        const tKey = keyMap[item.view as string];
                        return (
                            <a
                                key={i}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item)}
                                className={`text-[11px] font-bold uppercase tracking-widest hover:text-brand-primary transition-colors ${textColorClass}`}
                            >
                                {tKey ? t(tKey) : item.label}
                            </a>
                        );
                    })}
                    
                    <button 
                        onClick={toggleLang}
                        className={`text-[11px] font-bold tracking-widest px-3 py-1 border rounded opacity-80 hover:opacity-100 transition-all ${(!isTransparentRoute) || isScrolled ? 'border-gray-800 text-gray-800' : 'border-white text-white'}`}
                    >
                        {i18n.language === 'en' ? 'EN' : 'VI'}
                    </button>

                    <Link
                        to="/brief"
                        className={`text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 border-2 border-brand-primary hover:bg-brand-primary hover:text-white transition-all ${textColorClass}`}
                    >
                        {t('header.briefButton')}
                    </Link>
                </nav>
                <div className="flex items-center gap-4 lg:hidden">
                    <button 
                        onClick={toggleLang}
                        className={`text-[10px] font-bold px-2 py-1 border rounded ${textColorClass}`}
                    >
                        {i18n.language === 'en' ? 'EN' : 'VI'}
                    </button>
                    <button className={`${textColorClass}`}><Menu /></button>
                </div>
            </div>
        </header>
    );
};

export default Header;
