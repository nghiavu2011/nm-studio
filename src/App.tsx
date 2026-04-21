import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Handbook from './pages/Handbook';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import Admin from './pages/Admin';
import BriefWizard from './components/BriefWizard';
import { DEFAULT_CONTENT } from './constants';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

import HandbookDetail from './pages/HandbookDetail';

const App = () => {
    const location = useLocation();
    const [content, setContent] = useState<any>(DEFAULT_CONTENT);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Current Path:", location.pathname);
    }, [location]);

    useEffect(() => {
        // Initialize Lenis for smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    useEffect(() => {
        fetch('/content.json')
            .then(res => res.json())
            .then(data => {
                setContent(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load content:", err);
                // Fallback to default content
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-[#111]">
                <div className="animate-pulse text-brand-primary font-heading font-bold tracking-widest uppercase text-xl">NM Studio Loading...</div>
            </div>
        );
    }

    return (
        <div className="font-sans text-gray-900 selection:bg-brand-primary selection:text-white">
            <Header navItems={content.nav_items} />
            <Routes>
                <Route path="/admin" element={<Admin />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/handbook/:id" element={<HandbookDetail content={content} />} />
                <Route path="/handbook" element={<Handbook content={content} />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/project/:id" element={<ProjectDetail projects={content.projects || []} />} />
                <Route path="/brief" element={<BriefWizard />} />
                <Route path="/" element={<Home content={content} />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
