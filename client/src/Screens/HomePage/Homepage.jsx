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

    // Multi-source fallback
    return `https://logo.clearbit.com/${domain}` ||
           `https://logo.uplead.com/${domain}` ||
           `https://brandfetch.com/${domain}`;
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#FAF3E0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: '#FFFFFF', 
        borderBottom: '1px solid #E5E7EB',
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
  alignItems: 'center', 
  gap: '12px', 
  marginBottom: '16px'
}}>
  <div style={{ 
    backgroundColor: '#4A1C1C', 
    color: '#D4AF37', 
    padding: '8px 12px', 
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600'
  }}>
    SHINE ONE ESTATE
  </div>
</div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            color: '#2D2D2D', 
            margin: '0 0 12px 0',
            lineHeight: '1.2'
          }}>
            Trusted Developer
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#6B7280', 
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
            backgroundColor: '#FFFFFF', 
            padding: '32px 24px', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#2E7D32', marginBottom: '8px' }}>
              24+
            </div>
            <div style={{ fontSize: '0.95rem', color: '#6B7280' }}>
               Developers
            </div>
          </div>
         
          <div style={{ 
            backgroundColor: '#FFFFFF', 
            padding: '32px 24px', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#F87171', marginBottom: '8px' }}>
              50+
            </div>
            <div style={{ fontSize: '0.95rem', color: '#6B7280' }}>
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
                   backgroundColor: '#FFFFFF',
                   borderRadius: '12px',
                   padding: '24px',
                   border: '1px solid #E5E7EB',
                   boxShadow: hoveredCard === index ? '0 4px 12px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.1)',
                   transition: 'all 0.2s ease',
                   cursor: 'pointer',
                   transform: hoveredCard === index ? 'translateY(-2px)' : 'translateY(0)'
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
                  backgroundColor: '#FAF3E0',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  overflow: 'hidden'
                }}>
                  {company.logoError ? (
                    <div style={{ fontSize: '1.2rem', color: '#2E7D32', fontWeight: 600 }}>
                      {company.shortName.charAt(0)}
                    </div>
                  ) : (
                    <img 
                      src={getCompanyLogo(company.shortName)}
                      alt={`${company.name} logo`}
                      style={{ 
                        width: '32px', 
                        height: '32px',
                        objectFit: 'contain'
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
                    color: '#2D2D2D', 
                    margin: '0 0 4px 0'
                  }}>
                    {company.name}
                  </h3>
                  <span style={{ 
                    fontSize: '0.85rem', 
                    color: '#6B7280',
                    backgroundColor: '#FAF3E0',
                    padding: '2px 8px',
                    borderRadius: '4px'
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
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '48px 32px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid #E5E7EB'
        }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            color: '#2D2D2D', 
            margin: '0 0 16px 0'
          }}>
            Ready to Invest in Premium Properties?
          </h2>
         <p style={{
  fontSize: '1.1rem',
  color: '#6B7280',
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
              backgroundColor: '#2E7D32',
              color: 'white',
              padding: '16px 32px',
              fontSize: '1.1rem',
              fontWeight: '600',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(46,125,50,0.2)',
              transition: 'all 0.2s ease'
            }}
            onClick={handleExploreClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F4A261';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(244,162,97,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2E7D32';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(46,125,50,0.2)';
            }}
          >
            Explore Premium Properties
          </button>
        </div>
      </main>
    </div>
  );
}
