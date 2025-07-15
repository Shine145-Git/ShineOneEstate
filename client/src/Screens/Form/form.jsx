import React, { useState, useEffect } from 'react';
import { User, Phone, Home, MapPin, TrendingUp, Sparkles, Heart, Star, Crown, Gift } from 'lucide-react';

export default function ShineOneEstateForm() {
  const [formData, setFormData] = useState({ name: '', contact: '', budget: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [fadeIn, setFadeIn] = useState(false);
  const [glitter, setGlitter] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [personalizedGreeting, setPersonalizedGreeting] = useState('');

  useEffect(() => {
    setFadeIn(true);
    const hour = new Date().getHours();
    setPersonalizedGreeting(hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening');
    
    // Generate subtle glitter particles with gold accents
    const particles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 2,
      size: 8 + Math.random() * 6,
      color: ['#D4AF37', '#FFD700', '#B8860B', '#DAA520'][Math.floor(Math.random() * 4)]
    }));
    setGlitter(particles);

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) { 
      setMessage('🚨 Please share your details to unlock exclusive plots!'); 
      return; 
    }
    if (!/^\d{10}$/.test(formData.contact)) { 
      setMessage('📱 Please enter a valid 10-digit contact number'); 
      return; 
    }
    // Budget number validation
    if (formData.budget && isNaN(Number(formData.budget))) {
      setMessage('💰 Please enter a valid number for budget.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(process.env.REACT_APP_API_FORM_SUBMIT, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(formData) 
      });
      const result = await response.json(); // 👈 get the actual userId from response

      if (response.ok && result.userId) {
        localStorage.setItem("userId", result.userId);
      }
      if (response.ok) { 
        setMessage(`✅ Thank you! Our team will get in touch with you shortly to help you find the right property.`); 
        // setTimeout(() => window.location.href = '/properties', 2500); 
      } else { 
        setMessage('💔 Something went wrong. Let\'s try again!'); 
      }
    } catch (error) { 
      setMessage('🌐 Connection issue. Please check your internet!'); 
    }
    setLoading(false);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'name' && e.target.value.length > 0) {
      setMessage('');
    }
  };

  const contactWhatsApp = () => {
    const message = `Hi, I am interested in your properties listed on ShineOneEstate. Please share more details.`;
    window.open(`https://wa.me/919310994032?text=${encodeURIComponent(message)}`);
  };

  const benefits = [
    { icon: '🏡', title: 'Premium Locations', desc: 'Dwarka Expressway' },
    { icon: '🎁', title: 'Special Offers', desc: 'Limited time deals' },
    // { icon: '💎', title: 'Quality Assured', desc: 'Builder floors & flats' },
    // { icon: '🏆', title: 'Trusted Service', desc: 'Expert guidance' }
  ];




 return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, rgba(128, 0, 0, 0.8) 0%, #2C2C2C 60%, #0f0f0f 100%)',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '1rem', 
      fontFamily: 'system-ui, -apple-system, sans-serif', 
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      
      {/* Subtle Gold Glitter Effect */}
      {glitter.map(particle => (
        <div key={particle.id} style={{ 
          position: 'absolute', 
          left: `${particle.left}%`, 
          top: `${particle.top}%`, 
          animation: `glitterFloat ${particle.duration}s infinite ${particle.delay}s ease-in-out`, 
          zIndex: 1, 
          fontSize: `${particle.size}px`, 
          color: particle.color,
          opacity: 0.6
        }}>
          <Sparkles />
        </div>
      ))}

      {/* Decorative Elements */}
      <div style={{ 
        position: 'absolute', 
        top: '10%', 
        right: '10%', 
        width: '200px', 
        height: '200px', 
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 10%, transparent 40%)', 
        borderRadius: '50%',
        animation: 'pulse 4s infinite'
      }}></div>

      <style>{`
        @keyframes glitterFloat {
          0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg) translateY(0px); }
          50% { opacity: 0.8; transform: scale(1.2) rotate(180deg) translateY(-30px); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -300px 0; }
          100% { background-position: 300px 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .gradient-text {
          background: linear-gradient(45deg, #D4AF37, #FFD700, #B8860B, #D4AF37);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>

      <div style={{ 
        maxWidth: '550px', 
        width: '100%', 
        background: 'rgba(44, 44, 44, 0.45)', 
        borderRadius: '20px', 
        boxShadow: '0 25px 50px rgba(0, 0, 0, 9.3), 0 0 0 1px rgba(212, 175, 55, 0.2)', 
        overflow: 'hidden', 
        border: '2px solid rgba(128, 0, 0, 4.3)', 
        opacity: fadeIn ? 1 : 0, 
        transform: fadeIn ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)', 
        transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)', 
        zIndex: 2, 
        position: 'relative' 
      }}>
        
        {/* Professional Header */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(128, 0, 0, 0.5) 0%, #1a1a1a 75%, #0f0f0f 100%)',
          padding: '3rem 2rem', 
          textAlign: 'center', 
          color: '#D4AF37', 
          position: 'relative', 
          overflow: 'hidden',
          borderBottom: '3px solid rgba(212, 175, 55, 0.3)'
        }}>
          
          {/* Decorative Gold Line */}
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: '80%', 
            height: '1px', 
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
            opacity: 0.6
          }}></div>
          
          <div style={{ animation: 'bounce 3s infinite', marginBottom: '1rem' }}>
            <img 
    src="/Logo1.png" 
    alt="Logo" 
    style={{ width: '99px', height: '99px', filter: 'drop-shadow(0 4px 8px rgba(212, 175, 55, 0.3))' }} 
  />
          </div>
          
        <h1
  style={{
    fontSize: '2.8rem',
    fontWeight: '700',
    margin: '0 0 0.5rem 0',
    color: '#D4AF37',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    animation: 'fadeInUp 1s ease-out 0.2s both',
    letterSpacing: '2px',
    fontFamily: "'Poppins', sans-serif"
  }}
>
           <span style={{ color: '#D4AF37' }}>ShineOne</span>{' '}
           <br/>
  <span style={{ color: '#ffffff' }}>Estate</span>
</h1>
          
          <div style={{ 
            width: '120px', 
            height: '2px', 
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)', 
            margin: '1rem auto', 
            animation: 'fadeInUp 1s ease-out 0.4s both' 
          }}></div>
          
          <p style={{ 
            fontSize: '1.3rem', 
            opacity: '0.9', 
            margin: '0 0 1rem 0', 
            fontWeight: '300', 
            color: '#ffffff',
            animation: 'fadeInUp 1s ease-out 0.6s both',
            fontStyle: 'italic'
          }}>
            Deals in Plots, Flats & Builder Floors
          </p>
          
          <div style={{ 
            fontSize: '1rem', 
            opacity: '0.8', 
            fontWeight: '300', 
            color: '#D4AF37',
            animation: 'fadeInUp 1s ease-out 0.8s both' 
          }}>
            {personalizedGreeting}! It's {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - Perfect time to invest! ✨
          </div>
        </div>

        {/* Benefits Grid */}
        <div style={{ 
          padding: '2.5rem 2rem', 
          background: 'rgba(44, 44, 44, 0.8)', 
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)' 
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {benefits.map((benefit, index) => (
              <div key={index} style={{ 
                textAlign: 'center', 
                padding: '1.5rem 1rem', 
                background: 'rgba(128, 0, 0, 0.15)', 
                borderRadius: '15px', 
                border: '1px solid rgba(128, 0, 0, 0.3)', 
                transition: 'all 0.3s ease', 
                animation: `fadeInUp 1s ease-out ${1 + index * 0.2}s both`,
                backdropFilter: 'blur(10px)'
              }} 
              onMouseEnter={(e) => { 
                e.target.style.transform = 'translateY(-5px)'; 
                e.target.style.boxShadow = '0 15px 30px rgba(212, 175, 55, 0.2)';
                e.target.style.background = 'rgba(212, 175, 55, 0.2)';
              }} 
              onMouseLeave={(e) => { 
                e.target.style.transform = 'translateY(0)'; 
                e.target.style.boxShadow = 'none';
                e.target.style.background = 'rgba(128, 0, 0, 0.15)';
              }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{benefit.icon}</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#D4AF37', marginBottom: '0.3rem' }}>{benefit.title}</div>
                <div style={{ fontSize: '0.8rem', color: '#ffffff', opacity: 0.8 }}>{benefit.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Form */}
        <div style={{ 
          padding: '3rem 2rem', 
          background: 'rgba(44, 44, 44, 0.9)', 
          animation: 'fadeInUp 1s ease-out 1.8s both' 
        }}>
          <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: '600', 
              color: '#D4AF37', 
              margin: '0 0 1rem 0', 
              animation: 'fadeInUp 1s ease-out 2s both' 
            }}>
              Where Your Dreams Find Their Address
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#ffffff', 
              margin: '0', 
              lineHeight: '1.8', 
              animation: 'fadeInUp 1s ease-out 2.2s both',
              opacity: 0.9
            }}>
              Join thousands of <span style={{ color: '#D4AF37', fontWeight: '600' }}>satisfied investors</span> who found their perfect property with us.
              <br />Get instant access to <span style={{ color: '#D4AF37', fontWeight: '600' }}>exclusive deals</span> 💎
            </p>
          </div>

        

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem', position: 'relative', animation: 'fadeInUp 1s ease-out 2.4s both' }}>
              <div style={{ 
                position: 'absolute', 
                left: '1rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#D4AF37', 
                zIndex: '1'
              }}>
                <User size={20} />
              </div>
              <input 
                type="text" 
                name="name" 
                placeholder="Your Full Name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                style={{ 
                  width: '100%', 
                  padding: '1.2rem 1.2rem 1.2rem 3.5rem', 
                  border: '2px solid rgba(212, 175, 55, 0.3)', 
                  borderRadius: '12px', 
                  fontSize: '1rem', 
                  outline: 'none', 
                  transition: 'all 0.3s ease', 
                  background: 'rgba(0, 0, 0, 0.3)', 
                  color: '#ffffff',
                  boxSizing: 'border-box'
                }} 
                onFocus={(e) => { 
                  e.target.style.borderColor = '#D4AF37'; 
                  e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.2)'; 
                  e.target.style.background = 'rgba(0, 0, 0, 0.5)';
                }} 
                onBlur={(e) => { 
                  e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'; 
                  e.target.style.boxShadow = 'none'; 
                  e.target.style.background = 'rgba(0, 0, 0, 0.3)';
                }} 
              />
            </div>

            <div style={{ marginBottom: '1.5rem', position: 'relative', animation: 'fadeInUp 1s ease-out 2.6s both' }}>
              <div style={{ 
                position: 'absolute', 
                left: '1rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#D4AF37', 
                zIndex: '1'
              }}>
                <Phone size={20} />
              </div>
              <input 
                type="tel" 
                name="contact" 
                placeholder="Your Contact Number" 
                value={formData.contact} 
                onChange={handleChange} 
                required 
                maxLength="10" 
                style={{ 
                  width: '100%', 
                  padding: '1.2rem 1.2rem 1.2rem 3.5rem', 
                  border: '2px solid rgba(212, 175, 55, 0.3)', 
                  borderRadius: '12px', 
                  fontSize: '1rem', 
                  outline: 'none', 
                  transition: 'all 0.3s ease', 
                  background: 'rgba(0, 0, 0, 0.3)', 
                  color: '#ffffff',
                  boxSizing: 'border-box'
                }} 
                onFocus={(e) => { 
                  e.target.style.borderColor = '#D4AF37'; 
                  e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.2)'; 
                  e.target.style.background = 'rgba(0, 0, 0, 0.5)';
                }} 
                onBlur={(e) => { 
                  e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'; 
                  e.target.style.boxShadow = 'none'; 
                  e.target.style.background = 'rgba(0, 0, 0, 0.3)';
                }} 
              />
            </div>

            <div style={{ marginBottom: '2rem', position: 'relative', animation: 'fadeInUp 1s ease-out 2.8s both' }}>
              <div style={{ 
                position: 'absolute', 
                left: '1rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#D4AF37', 
                zIndex: '1'
              }}>
                <TrendingUp size={20} />
              </div>
              <input 
                type="number" 
                name="budget" 
                placeholder="Your Budget (in ₹)" 
                value={formData.budget || ''} 
                onChange={handleChange} 
                required 
                style={{ 
                  width: '100%', 
                  padding: '1.2rem 1.2rem 1.2rem 3.5rem', 
                  border: '2px solid rgba(212, 175, 55, 0.3)', 
                  borderRadius: '12px', 
                  fontSize: '1rem', 
                  outline: 'none', 
                  transition: 'all 0.3s ease', 
                  background: 'rgba(0, 0, 0, 0.3)', 
                  color: '#ffffff',
                  boxSizing: 'border-box'
                }} 
                onFocus={(e) => { 
                  e.target.style.borderColor = '#D4AF37'; 
                  e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.2)'; 
                  e.target.style.background = 'rgba(0, 0, 0, 0.5)';
                }} 
                onBlur={(e) => { 
                  e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)'; 
                  e.target.style.boxShadow = 'none'; 
                  e.target.style.background = 'rgba(0, 0, 0, 0.3)';
                }} 
              />
            </div>

            <div style={{ position: 'relative', animation: 'fadeInUp 1s ease-out 3s both' }}>
              <button 
                type="submit" 
                disabled={loading} 
                style={{ 
                  width: '100%', 
                  padding: '1.4rem', 
                  background: loading ? 'rgba(212, 175, 55, 0.6)' : 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)', 
                  color: loading ? '#ffffff' : '#000000', 
                  border: 'none', 
                  borderRadius: '12px', 
                  fontSize: '1.2rem', 
                  fontWeight: '700', 
                  cursor: loading ? 'not-allowed' : 'pointer', 
                  transition: 'all 0.3s ease', 
                  boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '1px', 
                  position: 'relative', 
                  overflow: 'hidden' 
                }} 
                onMouseEnter={(e) => { 
                  if (!loading) { 
                    e.target.style.background = 'linear-gradient(135deg, #B8860B 0%, #D4AF37 100%)'; 
                    e.target.style.transform = 'translateY(-2px)'; 
                    e.target.style.boxShadow = '0 12px 30px rgba(212, 175, 55, 0.4)'; 
                  }
                }} 
                onMouseLeave={(e) => { 
                  if (!loading) { 
                    e.target.style.background = 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)'; 
                    e.target.style.transform = 'translateY(0)'; 
                    e.target.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.3)'; 
                  }
                }}
              >
                {loading ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #ffffff', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    Connecting You...
                  </div>
                ) : (
                  'Continue'
                )}
              </button>
            </div>
          </form>

          {/* WhatsApp Button */}
          <button
            onClick={contactWhatsApp}
            style={{
              width: '100%',
              marginTop: '1.5rem',
              padding: '1.4rem',
              background: 'linear-gradient(135deg, #25D366 0%, #1aab5c 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(37, 211, 102, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 30px rgba(37, 211, 102, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.3)';
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              style={{ width: '24px', height: '24px' }}
            />
            Continue on WhatsApp
          </button>

          {message && (
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1.2rem', 
              borderRadius: '12px', 
              textAlign: 'center', 
              fontSize: '1rem', 
              fontWeight: '500', 
              background: message.includes('✅') ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 69, 58, 0.2)', 
              color: message.includes('✅') ? '#D4AF37' : '#ff453a', 
              border: `2px solid ${message.includes('✅') ? 'rgba(212, 175, 55, 0.3)' : 'rgba(255, 69, 58, 0.3)'}`, 
              animation: 'fadeInUp 0.5s ease-out' 
            }}>
              {message}
            </div>
          )}

          <div style={{ marginTop: '2rem', textAlign: 'center', animation: 'fadeInUp 1s ease-out 3.2s both' }}>
            <div style={{ fontSize: '0.9rem', color: '#ffffff', lineHeight: '1.8', marginBottom: '1rem', opacity: 0.8 }}>
              🔒 <span style={{ fontWeight: '600', color: '#D4AF37' }}>100% Secure & Confidential</span> - Your information is protected
              <br />
              💬 Get instant property updates and expert consultation
              <br />
              🏆 Trusted by thousands of happy property owners
            </div>
            <div style={{ fontSize: '0.85rem', color: '#D4AF37', textAlign: 'center', fontStyle: 'italic' }}>
              "Where Your Dreams Find Their Address"
            </div>
          </div>
        </div>

        {/* Professional Footer */}
        <div style={{ 
          padding: '2rem', 
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)', 
          textAlign: 'center', 
          color: '#D4AF37', 
          animation: 'fadeInUp 1s ease-out 3.4s both',
          borderTop: '1px solid rgba(212, 175, 55, 0.3)'
        }}>
          
          
       </div>
      </div>
      



       

    </div>
  );
}
