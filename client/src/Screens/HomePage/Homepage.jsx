import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ShineOneEstate() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  
  const handleExploreClick = () => {
    
    navigate('/form');
    console.log('Navigate to form page');
  };


  const [companies, setCompanies] = useState([
    { name: 'DLF Ltd.', shortName: 'DLF', category: 'Premium' },
    { name: 'Reliance MET City', shortName: 'RELIANCE', category: 'Premium' },
    { name: 'M3M India', shortName: 'M3M', category: 'Luxury' },
    { name: 'Emaar India', shortName: 'EMAAR', category: 'Premium' },
    { name: 'SS Group', shortName: 'SS', category: 'Premium' },
    { name: 'Raheja Developers', shortName: 'RAHEJA', category: 'Luxury' },
    { name: 'TATA Housing', shortName: 'TATA', category: 'Premium' },
    { name: 'Godrej Properties', shortName: 'GODREJ', category: 'Premium' },
    { name: 'Adani Realty', shortName: 'ADANI', category: 'Luxury' },
    { name: 'Paras Buildtech', shortName: 'PARAS', category: 'Premium' },
    { name: 'BPTP', shortName: 'BPTP', category: 'Premium' },
    { name: 'Omaxe Ltd.', shortName: 'OMAXE', category: 'Premium' },
    { name: 'Bestech Group', shortName: 'BESTECH', category: 'Luxury' },
    { name: 'Elan Group', shortName: 'ELAN', category: 'Premium' },
    { name: 'Signature Global', shortName: 'SIGNATURE', category: 'Premium' },
    { name: 'Ashiana Housing', shortName: 'ASHIANA', category: 'Luxury' },
    { name: 'Vatika Group', shortName: 'VATIKA', category: 'Premium' },
    { name: 'Central Park', shortName: 'CENTRAL', category: 'Premium' },
    { name: 'Spaze Group', shortName: 'SPAZE', category: 'Premium' },
    { name: 'IREO', shortName: 'IREO', category: 'Premium' },
    { name: 'Mahindra Lifespaces', shortName: 'MAHINDRA', category: 'Premium' }
  ]);

  const getCompanyLogo = (shortName) => {
    const localLogos = {
      RELIANCE: '/reliance-met-city.png'
    };

    if (localLogos[shortName]) {
      return localLogos[shortName];
    }

    const domainMap = {
      DLF: 'dlf.in',
      M3M: 'm3mindia.com',
      EMAAR: 'emaar-india.com',
      SS: 'ssgroup-india.com',
      RAHEJA: 'raheja.com',
      TATA: 'tatahousing.in',
      GODREJ: 'godrejproperties.com',
      ADANI: 'adanirealty.com',
      PARAS: 'parasbuildtech.com',
      BPTP: 'bptp.com',
      OMAXE: 'omaxe.com',
      BESTECH: 'bestechgroup.com',
      ELAN: 'elanlimited.com',
      SIGNATURE: 'signatureglobal.in',
      ASHIANA: 'ashianahousing.com',
      VATIKA: 'vatikagroup.com',
      CENTRAL: 'centralpark.in',
      SPAZE: 'spazegroup.com',
      IREO: 'ireo.in',
      MAHINDRA: 'mahindralifespaces.com'
    };

    const domain = domainMap[shortName];
    if (!domain) return '';

    return `https://logo.clearbit.com/${domain}` ||
           `https://logo.uplead.com/${domain}` ||
           `https://brandfetch.com/${domain}`;
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, rgba(128, 0, 0, 0.75) 0%, #1a1a1a 80%, #0f0f0f 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: 'rgba(45, 2, 2, 0.52)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(128, 0, 0, 0.3)',
        padding: '24px 0'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'centr', 
            gap: '12px', 
            marginBottom: '16px'
          }}>
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
          </div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            color: '#FFFFFF', 
            margin: '0 0 12px 0',
            lineHeight: '1.2',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}>
            Trusted Developer
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#C0C0C0', 
            margin: '0',
            maxWidth: '600px',
            lineHeight: '1.6'
          }}>
            Discover verified plots, premium flats, and investment-ready properties in high-growth locations accross Delhi NCR
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '48px 24px'
      }}>
        {/* Stats Section */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '24px',
          marginBottom: '48px'
        }}>
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.9), rgba(15, 15, 15, 0.9))',
            backdropFilter: 'blur(10px)',
            padding: '32px 24px', 
            borderRadius: '12px', 
            border: '1px solid rgba(128, 0, 0, 0.3)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            textAlign: 'center'
          }}>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              color: '#D4AF37', 
              marginBottom: '8px',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
              24+
            </div>
            <div style={{ fontSize: '0.95rem', color: '#C0C0C0' }}>
               Developers
            </div>
          </div>
         
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.9), rgba(15, 15, 15, 0.9))',
            backdropFilter: 'blur(10px)',
            padding: '32px 24px', 
            borderRadius: '12px', 
            border: '1px solid rgba(128, 0, 0, 0.3)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            textAlign: 'center'
          }}>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              color: '#D4AF37', 
              marginBottom: '8px',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
              50+
            </div>
            <div style={{ fontSize: '0.95rem', color: '#C0C0C0' }}>
              Prime Locations
            </div>
          </div>
        </div>

        {/* Developers Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '24px',
          marginBottom: '64px'
        }}>
          {companies.map((company, index) => (
            <div key={index} 
                 style={{ 
                   background: hoveredCard === index 
                     ? 'linear-gradient(135deg, rgba(128, 0, 0, 0.4), rgba(26, 26, 26, 0.9))'
                     : 'linear-gradient(135deg, rgba(26, 26, 26, 0.8), rgba(15, 15, 15, 0.9))',
                   backdropFilter: 'blur(10px)',
                   borderRadius: '12px',
                   padding: '24px',
                   border: hoveredCard === index 
                     ? '1px solid rgba(128, 0, 0, 0.6)' 
                     : '1px solid rgba(128, 0, 0, 0.3)',
                   boxShadow: hoveredCard === index 
                     ? '0 8px 24px rgba(128, 0, 0, 0.3)' 
                     : '0 4px 12px rgba(0,0,0,0.3)',
                   transition: 'all 0.3s ease',
                   cursor: 'pointer',
                   transform: hoveredCard === index ? 'translateY(-4px)' : 'translateY(0)'
                 }}
                 onMouseEnter={() => setHoveredCard(index)}
                 onMouseLeave={() => setHoveredCard(null)}>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px',
                  background: 'linear-gradient(45deg, rgba(128, 0, 0, 0.3), rgba(26, 26, 26, 0.6))',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  overflow: 'hidden',
                  border: '1px solid rgba(128, 0, 0, 0.4)'
                }}>
                  {company.logoError ? (
                    <div style={{ 
                      fontSize: '1.2rem', 
                      color: '#D4AF37', 
                      fontWeight: 600,
                      textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                    }}>
                      {company.shortName.charAt(0)}
                    </div>
                  ) : (
                    <img 
                      src={getCompanyLogo(company.shortName)}
                      alt={`${company.name} logo`}
                      style={{ 
                        width: '32px', 
                        height: '32px',
                        objectFit: 'contain',
                        filter: 'brightness(1.2) contrast(1.1)'
                      }}
                      onError={() => {
                        const updated = [...companies];
                        updated[index] = { ...updated[index], logoError: true };
                        setCompanies(updated);
                      }}
                    />
                  )}
                </div>
                <div>
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: '600', 
                    color: '#FFFFFF', 
                    margin: '0 0 4px 0',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                  }}>
                    {company.name}
                  </h3>
                  <span style={{ 
                    fontSize: '0.85rem', 
                    color: '#D4AF37',
                    background: 'linear-gradient(45deg, rgba(128, 0, 0, 0.3), rgba(26, 26, 26, 0.6))',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    border: '1px solid rgba(128, 0, 0, 0.4)'
                  }}>
                    {company.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(26, 26, 26, 2.9), rgba(103, 8, 8, 0.75))',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '48px 32px',
          textAlign: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          border: '1px solid rgba(128, 0, 0, 0.4)'
        }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            color: '#FFFFFF', 
            margin: '0 0 16px 0',
            textShadow: '0 2px 4px rgba(0,0,0,5.5)'
          }}>
            Ready to Invest in Premium Properties?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#C0C0C0',
            margin: '0 0 32px 0',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            zIndex: 1,
            position: 'relative'
          }}>
            Discover exclusive residential properties in high-growth areas
          </p>
          <button 
            style={{ 
              background: 'linear-gradient(45deg, rgba(128, 0, 0, 0.8), #1a1a1a)',
              color: '#D4AF37',
              padding: '16px 32px',
              fontSize: '1.1rem',
              fontWeight: '600',
              border: '1px solid rgba(128, 0, 0, 0.34)',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(128, 0, 0, 0.46)',
              transition: 'all 0.3s ease',
              textShadow: '0 1px 2px rgba(0, 0, 0, 1)'
            }}
            onClick={handleExploreClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(45deg, rgba(128, 0, 0, 1), #0f0f0f)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(128, 0, 0, 0.5)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(45deg, rgba(128, 0, 0, 0.8), #1a1a1a)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(128, 0, 0, 0.3)';
              e.currentTarget.style.color = '#D4AF37';
            }}
          >
            Explore Premium Properties
          </button>
        </div>
      </main>
    </div>
  );
}
