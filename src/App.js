import React, { useState, useEffect } from 'react';
import { 
  Mic, Camera, CheckCircle, Sun, Moon, 
  Zap, TrendingUp, Package, AlertTriangle, 
  RefreshCw, Globe 
} from 'lucide-react';

/**
 * LokalAI: AI-Powered Kirana Management
 * This version uses internal CSS styles instead of Tailwind.
 */
export default function App() {
  const [inventory, setInventory] = useState([
    { id: 1, item: 'Tata Salt 1kg', qty: 48, price: 20, lastUpdated: '2 mins ago' },
    { id: 2, item: 'Mustard Oil 1L', qty: 11, price: 180, lastUpdated: '5 mins ago' },
    { id: 3, item: 'Rice 10kg', qty: 4, price: 650, lastUpdated: '1 hour ago' },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [toast, setToast] = useState(null);

  // Styles
  const theme = {
    bg: darkMode ? '#020617' : '#f8fafc',
    text: darkMode ? '#f1f5f9' : '#0f172a',
    cardBg: darkMode ? '#0f172a' : '#ffffff',
    borderColor: darkMode ? '#1e293b' : '#e2e8f0',
    subtext: darkMode ? '#94a3b8' : '#64748b',
    headerBg: darkMode ? 'rgba(2, 6, 23, 0.8)' : 'rgba(255, 255, 255, 0.8)',
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    const interval = setInterval(() => {
      setInventory(prev => prev.map(item => ({
        ...item,
        qty: Math.max(0, parseFloat((item.qty + (Math.random() > 0.8 ? -1 : 0)).toFixed(1)))
      })));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const updateInventoryItem = (itemName, qtyChange, price) => {
    setInventory(prev => {
      const exists = prev.find(i => i.item.toLowerCase() === itemName.toLowerCase());
      if (exists) {
        return prev.map(i => i.item.toLowerCase() === itemName.toLowerCase() 
          ? { ...i, qty: i.qty + qtyChange, price: price || i.price, lastUpdated: 'Just now' } 
          : i
        );
      }
      return [{ 
        id: Date.now(), 
        item: itemName, 
        qty: Math.abs(qtyChange), 
        price: price || 0, 
        lastUpdated: 'Just now' 
      }, ...prev];
    });
  };

  const handleVoiceCommand = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      updateInventoryItem('Atta 50kg', -1, 2450);
      showToast('✅ 50kg Atta sale recorded! (Odia: ଅଟା ବିକ୍ରି ହେଲା)');
    }, 2500);
  };

  const handleCameraScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const newItems = [
        { id: Date.now() + 1, item: 'Dalda Ghee 1L', qty: 12, price: 580, lastUpdated: 'Scanned' },
        { id: Date.now() + 2, item: 'Maggi 12pk', qty: 24, price: 160, lastUpdated: 'Scanned' }
      ];
      setInventory(prev => [...newItems, ...prev]);
      showToast('🔍 AI Scan: 2 New products identified');
    }, 3000);
  };

  const syncToONDC = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast('🌐 Shop live on ONDC Network!');
    }, 2000);
  };

  return (
    <div style={{
      backgroundColor: theme.bg,
      color: theme.text,
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      transition: 'all 0.5s ease',
      padding: 0,
      margin: 0
    }}>
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        .action-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        table { width: 100%; border-collapse: collapse; }
        th { text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.1em; padding: 1.25rem 2.5rem; text-align: left; opacity: 0.6; }
        td { padding: 1.5rem 2.5rem; border-top: 1px solid ${theme.borderColor}; }
        button:active { transform: scale(0.95); }
      `}</style>
      
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '1.5rem',
          right: '1.5rem',
          zIndex: 1000,
          animation: 'fadeInDown 0.3s ease-out',
          backgroundColor: toast.type === 'success' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(59, 130, 246, 0.9)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '1rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontWeight: '600'
        }}>
          <CheckCircle size={20} />
          {toast.message}
        </div>
      )}

      {/* Nav */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backdropFilter: 'blur(12px)',
        backgroundColor: theme.headerBg,
        borderBottom: `1px solid ${theme.borderColor}`,
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ backgroundColor: '#f97316', padding: '0.6rem', borderRadius: '0.75rem', display: 'flex' }}>
              <Zap size={24} color="white" fill="white" />
            </div>
            <h1 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '900', 
              background: 'linear-gradient(to right, #f97316, #f43f5e)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>LokalAI</h1>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} style={{
            background: theme.cardBg,
            border: `1px solid ${theme.borderColor}`,
            padding: '0.75rem',
            borderRadius: '1rem',
            cursor: 'pointer',
            color: darkMode ? '#fbbf24' : '#475569',
            display: 'flex',
            transition: 'all 0.3s'
          }}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 2rem' }}>
        
        {/* Hero */}
        <header style={{ marginBottom: '4rem' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            backgroundColor: 'rgba(249, 115, 22, 0.1)', 
            color: '#f97316', 
            padding: '0.4rem 1rem', 
            borderRadius: '2rem', 
            fontSize: '0.875rem', 
            fontWeight: '700',
            border: '1px solid rgba(249, 115, 22, 0.2)',
            marginBottom: '1.5rem'
          }}>
            Unit-IV Bhubaneswar Pilot
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: '900', lineHeight: 1.1, margin: '0 0 1.5rem 0' }}>
            Desi AI <span style={{ color: '#f97316' }}>Munim</span> for <br /> Kirana Owners
          </h2>
          <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '650px', lineHeight: 1.6 }}>
            Small shops in Odisha now have a powerful manager. Record sales with voice, 
            count shelf items with your camera, and connect to ONDC instantly.
          </p>
        </header>

        {/* Action Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          
          {/* Voice */}
          <div className="action-card" style={{ 
            backgroundColor: theme.cardBg, 
            border: `1px solid ${theme.borderColor}`, 
            padding: '2.5rem', 
            borderRadius: '2.5rem',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <div style={{ backgroundColor: '#10b981', width: '64px', height: '64px', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)' }}>
              <Mic color="white" size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.75rem' }}>Odia Voice Entry</h3>
            <p style={{ opacity: 0.6, marginBottom: '2.5rem', lineHeight: 1.5 }}>Simply say your sales aloud. AI understands local dialects and updates your stock.</p>
            <button onClick={handleVoiceCommand} style={{
              width: '100%',
              padding: '1.25rem',
              borderRadius: '1.25rem',
              border: 'none',
              fontWeight: '700',
              fontSize: '1rem',
              cursor: 'pointer',
              backgroundColor: isListening ? '#f43f5e' : '#10b981',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s',
              animation: isListening ? 'pulse 1.5s infinite' : 'none'
            }}>
              {isListening ? 'Listening...' : 'Record Sale (Odia)'}
            </button>
          </div>

          {/* Camera */}
          <div className="action-card" style={{ 
            backgroundColor: theme.cardBg, 
            border: `1px solid ${theme.borderColor}`, 
            padding: '2.5rem', 
            borderRadius: '2.5rem',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <div style={{ backgroundColor: '#3b82f6', width: '64px', height: '64px', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 10px 20px rgba(59, 130, 246, 0.2)' }}>
              <Camera color="white" size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.75rem' }}>Shelf Scan</h3>
            <p style={{ opacity: 0.6, marginBottom: '2.5rem', lineHeight: 1.5 }}>Point your camera at the racks. AI counts products and updates quantities instantly.</p>
            <button onClick={handleCameraScan} style={{
              width: '100%',
              padding: '1.25rem',
              borderRadius: '1.25rem',
              border: 'none',
              fontWeight: '700',
              fontSize: '1rem',
              cursor: 'pointer',
              backgroundColor: '#3b82f6',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s'
            }}>
              {isScanning ? 'Processing...' : 'Start AI Scan'}
            </button>
          </div>

          {/* ONDC */}
          <div className="action-card" style={{ 
            backgroundColor: theme.cardBg, 
            border: `1px solid ${theme.borderColor}`, 
            padding: '2.5rem', 
            borderRadius: '2.5rem',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <div style={{ backgroundColor: '#f97316', width: '64px', height: '64px', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 10px 20px rgba(249, 115, 22, 0.2)' }}>
              <Globe color="white" size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.75rem' }}>Sync to ONDC</h3>
            <p style={{ opacity: 0.6, marginBottom: '2.5rem', lineHeight: 1.5 }}>Go digital instantly. List your stock on the national network for local orders.</p>
            <button onClick={syncToONDC} style={{
              width: '100%',
              padding: '1.25rem',
              borderRadius: '1.25rem',
              border: 'none',
              fontWeight: '700',
              fontSize: '1rem',
              cursor: 'pointer',
              backgroundColor: '#f97316',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s'
            }}>
              {isSyncing ? 'Syncing...' : 'List on ONDC'}
            </button>
          </div>
        </div>

        {/* Ledger */}
        <section style={{ 
          backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.5)' : '#ffffff', 
          border: `1px solid ${theme.borderColor}`, 
          borderRadius: '3rem', 
          overflow: 'hidden' 
        }}>
          <div style={{ padding: '2.5rem', borderBottom: `1px solid ${theme.borderColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h4 style={{ fontSize: '1.75rem', fontWeight: '900', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Package color="#f97316" /> Current Stock
              </h4>
              <p style={{ margin: '0.25rem 0 0 0', opacity: 0.5, fontSize: '0.875rem' }}>Real-time inventory ledger</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
               <div style={{ 
                 backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                 color: '#10b981', 
                 padding: '0.5rem 1rem', 
                 borderRadius: '1rem', 
                 fontSize: '0.875rem', 
                 fontWeight: '800',
                 border: '1px solid rgba(16, 185, 129, 0.2)',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '0.5rem'
               }}>
                 <TrendingUp size={16} /> Profitable: +12%
               </div>
               <button style={{ 
                 background: 'none', 
                 border: `1px solid ${theme.borderColor}`, 
                 color: 'inherit', 
                 padding: '0.5rem', 
                 borderRadius: '0.75rem', 
                 cursor: 'pointer' 
               }}>
                 <RefreshCw size={18} />
               </button>
            </div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr style={{ backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.5)' : '#f8fafc' }}>
                  <th>Item Details</th>
                  <th>Quantity</th>
                  <th>Market Price</th>
                  <th>Last Activity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ fontWeight: '800', fontSize: '1.125rem' }}>{item.item}</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.4, marginTop: '0.25rem' }}>SKU: LKL-{item.id}</div>
                    </td>
                    <td>
                      <span style={{ 
                        backgroundColor: item.qty < 10 ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: item.qty < 10 ? '#f43f5e' : '#10b981',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.75rem',
                        fontWeight: '800',
                        fontFamily: 'monospace',
                        fontSize: '1.25rem',
                        border: `1px solid ${item.qty < 10 ? 'rgba(244, 63, 94, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`
                      }}>
                        {item.qty}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: '800', fontSize: '1.125rem' }}>₹{item.price}</div>
                      <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '800' }}>Standard</div>
                    </td>
                    <td>
                      <div style={{ opacity: 0.6, fontSize: '0.875rem' }}>{item.lastUpdated}</div>
                    </td>
                    <td>
                      <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '0.4rem', 
                        padding: '0.4rem 0.75rem', 
                        borderRadius: '2rem', 
                        fontSize: '0.7rem', 
                        fontWeight: '900', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.05em',
                        backgroundColor: item.qty < 5 ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: item.qty < 5 ? '#f43f5e' : '#10b981',
                        border: `1px solid ${item.qty < 5 ? 'rgba(244, 63, 94, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`
                      }}>
                        {item.qty < 5 ? <AlertTriangle size={12} /> : <CheckCircle size={12} />}
                        {item.qty < 5 ? 'Refill Soon' : 'In Stock'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '2.5rem', textAlign: 'center' }}>
             <button style={{
               background: 'none',
               border: `1px solid ${theme.borderColor}`,
               color: 'inherit',
               padding: '0.75rem 2rem',
               borderRadius: '1.25rem',
               fontWeight: '700',
               fontSize: '0.875rem',
               cursor: 'pointer'
             }}>View Detailed Analytics Report</button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer style={{ 
        padding: '4rem 2rem', 
        borderTop: `1px solid ${theme.borderColor}`, 
        marginTop: '4rem',
        backgroundColor: darkMode ? '#020617' : '#ffffff' 
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: 0.5 }}>
             <Zap size={20} />
             <span style={{ fontWeight: '800' }}>LokalAI © 2024</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.4, textAlign: 'center' }}>Empowering Micro-Kiranas across Odisha with Generative AI</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Privacy', 'Help Desk', 'ONDC API'].map(link => (
              <a key={link} href="#" style={{ 
                color: 'inherit', 
                textDecoration: 'none', 
                fontSize: '0.7rem', 
                fontWeight: '900', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em',
                opacity: 0.4
              }}>{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}