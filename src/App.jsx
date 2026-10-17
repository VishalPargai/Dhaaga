// src/App.jsx
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Catalogue from './components/Catalogue/Catalogue';
import Story from './components/Story';
import Custom from './components/Custom';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { ThemeProvider } from './utils/ThemeContext';

export default function App() {
  const [collection, setCollection] = useState('bloom');
  const [filter, setFilter] = useState('all');
  const [productId, setProductId] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formatId, setFormatId] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [notice, setNotice] = useState('');
  const [copied, setCopied] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { setImageIndex(0); }, [formatId, productId]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(''), 4200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  function chooseCollection(id, scroll = true) {
    setSearchQuery('');
    setCollection(id);
    setFilter('all');
    setProductId(null);
    setFormatId(null);
    setMobileOpen(false);
    if (scroll) {
      window.setTimeout(() => {
        const el = document.getElementById('catalogue');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  }

  function handleSearchSubmit(query) {
    setSearchQuery(query);
    setProductId(null);
    setFormatId(null);
    setMobileOpen(false);
    window.setTimeout(() => {
      const el = document.getElementById('catalogue');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }

  return (
    <ThemeProvider>
      <Header
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        setProductId={setProductId}
        chooseCollection={chooseCollection}
        onSearchSubmit={handleSearchSubmit}
      />
      <main>
        <Hero chooseCollection={chooseCollection} />
        <Catalogue
          collection={collection} setCollection={setCollection}
          filter={filter} setFilter={setFilter}
          productId={productId} setProductId={setProductId}
          formatId={formatId} setFormatId={setFormatId}
          imageIndex={imageIndex} setImageIndex={setImageIndex}
          copied={copied} setCopied={setCopied}
          setNotice={setNotice}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Story />
        <Custom />
      </main>
      <Footer chooseCollection={chooseCollection} />
      <Toast notice={notice} setNotice={setNotice} />
    </ThemeProvider>
  );
}