// src/App.jsx
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Catalogue from './components/Catalogue/Catalogue';
import Story from './components/Story';
import Reviews from './components/Reviews';
import Custom from './components/Custom';
import Footer from './components/Footer';
import Toast from './components/Toast';
import WishlistDrawer from './components/WishlistDrawer';
import BackToTop from './components/BackToTop';
import { ThemeProvider } from './utils/ThemeContext';
import { WishlistProvider } from './utils/WishlistContext';

export default function App() {
  const [collection, setCollection] = useState('bloom');
  const [filter, setFilter] = useState('all');
  const [productId, setProductId] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#product-')) {
      return window.location.hash.replace('#product-', '');
    }
    return null;
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formatId, setFormatId] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [notice, setNotice] = useState('');
  const [copied, setCopied] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setImageIndex(0);
  }, [formatId, productId]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(''), 4200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  // Sync state with browser Back/Forward buttons so pressing Back returns to catalogue instead of exiting the site
  useEffect(() => {
    function handleLocationSync() {
      const hash = window.location.hash;
      if (hash.startsWith('#product-')) {
        const id = hash.replace('#product-', '');
        setProductId(id);
      } else if (hash === '#saved' || hash === '#quickview') {
        // Modal / drawer active, retain background state
      } else {
        // Back to main catalogue
        setProductId(null);
        setFormatId(null);
      }
    }

    window.addEventListener('popstate', handleLocationSync);
    window.addEventListener('hashchange', handleLocationSync);
    return () => {
      window.removeEventListener('popstate', handleLocationSync);
      window.removeEventListener('hashchange', handleLocationSync);
    };
  }, []);

  function chooseCollection(id, scroll = true) {
    setSearchQuery('');
    setCollection(id);
    setFilter('all');
    setProductId(null);
    setFormatId(null);
    setMobileOpen(false);

    if (window.location.hash.startsWith('#product-')) {
      window.history.pushState({}, '', window.location.pathname + window.location.search + '#catalogue');
    }

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

  function handleSelectFromWishlist(pId, fId) {
    setProductId(pId);
    setFormatId(fId || null);
    setImageIndex(0);
    window.history.pushState({ productId: pId }, '', `#product-${pId}`);
    window.setTimeout(() => {
      const el = document.getElementById('product-detail');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  }

  return (
    <ThemeProvider>
      <WishlistProvider onNotify={setNotice}>
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
            collection={collection}
            setCollection={setCollection}
            filter={filter}
            setFilter={setFilter}
            productId={productId}
            setProductId={setProductId}
            formatId={formatId}
            setFormatId={setFormatId}
            imageIndex={imageIndex}
            setImageIndex={setImageIndex}
            copied={copied}
            setCopied={setCopied}
            setNotice={setNotice}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <Story />
          <Reviews />
          <Custom />
        </main>
        <Footer chooseCollection={chooseCollection} />
        <WishlistDrawer onSelectProduct={handleSelectFromWishlist} />
        <BackToTop />
        <Toast notice={notice} setNotice={setNotice} />
      </WishlistProvider>
    </ThemeProvider>
  );
}