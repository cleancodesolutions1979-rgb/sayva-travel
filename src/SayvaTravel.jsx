import React, { useEffect, useMemo, useState } from "react";

/*
  SAYVA Travel — Consumer Website (React + Tailwind)
  - Sections: Home, Destinations, Tours, Packages, Reviews, FAQ, Contact
  - Search/Booking widget (client‑side demo)
  - Tours grid with filter by destination & duration
  - Netlify‑ready booking/contact form
  - Clean, responsive UI (no portfolio language)

  Usage
  1) Save as src/SayvaAgency.jsx
  2) In src/App.jsx: import SayvaAgency from "./SayvaAgency"; export default () => <SayvaAgency/>;
  3) Deploy to Netlify for live leads (forms work there by default).
*/

const IMAGES = {
  hero: "/hero.jpg",
  aboutUs: "/hero2.png",
  bali: "bali1.png",
  tokyo: "tokyo.png",
  alps: "swiss.jpg",
  thailand: "/railay-beach-krabi.png",
  london: "London.jpeg",
  sydney: "Sydney.png",
};

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Button = ({ children, onClick, href, variant = "primary" }) => {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles = {
    primary: "bg-black text-white hover:bg-gray-800 focus:ring-black",
    outline: "border border-gray-300 hover:bg-gray-50 text-gray-900 focus:ring-gray-300",
    ghost: "bg-white/70 backdrop-blur text-gray-900 hover:bg-white focus:ring-gray-300 border",
  }[variant];
  const content = <span className={`${base} ${styles}`}>{children}</span>;
  return href ? (
    <a href={href} onClick={onClick} className="no-underline">{content}</a>
  ) : (
    <button onClick={onClick}>{content}</button>
  );
};

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Nav = () => {
  const [open, setOpen] = useState(false);
  const items = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "destinations", label: "Destinations" },
    { id: "tours", label: "Tours" },
    { id: "packages", label: "Packages" },
    { id: "reviews", label: "Reviews" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];
  useEffect(() => { document.documentElement.classList.add("scroll-smooth"); }, []);
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 border-b border-gray-100 shadow-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <a href="#home" onClick={(e)=>{e.preventDefault();scrollTo('home');}} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="SAYVA Travel logo" className="h-10 w-10 rounded-md object-contain" />
            <span className="font-bold tracking-tight text-lg bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">SAYVA Travel</span>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {items.map((it) => (
              <button
                key={it.id}
                onClick={()=>scrollTo(it.id)}
                className="text-sm px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 focus:bg-cyan-100 transition-all duration-200"
              >
                {it.label}
              </button>
            ))}
            <Button variant="primary" onClick={()=>scrollTo('contact')}>Book Now</Button>
          </nav>
          <button
            className="md:hidden p-2 rounded-lg bg-cyan-50 border border-cyan-200 shadow-sm hover:bg-cyan-100 transition-colors flex items-center justify-center"
            onClick={()=>setOpen(v=>!v)}
            aria-label="Toggle Menu"
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            )}
          </button>
        </div>
      </Container>
      {open && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur-sm">
          {items.map((it) => (
            <button key={it.id} onClick={()=>{scrollTo(it.id);setOpen(false);}} className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors">{it.label}</button>
          ))}
          <div className="px-4 pb-4"><Button variant="primary" onClick={()=>scrollTo('contact')}>Book Now</Button></div>
        </div>
      )}
    </header>
  );
};

const Hero = ({ onSearch }) => (
  <section id="home" className="relative overflow-hidden">
    {/* animated hero: slow zoom */}
    <HeroInner onSearch={onSearch} />
  </section>
);

// separate component so we can add animation
const HeroInner = ({ onSearch }) => {
  return (
    <>
      <div
        className="h-[62vh] sm:h-[72vh] bg-cover bg-center z-0 kenburns"
        style={{backgroundImage:`url(${IMAGES.hero})`}}
        role="img"
        aria-label="Hot air balloons over rock formations at sunrise"
      />
      <Container className="-mt-24 sm:-mt-32 relative z-20">
        <div className="rounded-3xl border-2 border-cyan-200 bg-gradient-to-br from-white via-cyan-50/20 to-white p-8 sm:p-14 shadow-2xl backdrop-blur-xl">
          <div className="mb-10">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 border border-cyan-300">
              <span className="text-xs font-bold text-cyan-700 tracking-widest uppercase">✨ Curated Travel Experiences</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-tight bg-gradient-to-r from-gray-900 via-cyan-600 to-gray-900 bg-clip-text text-transparent">Your Dream Holiday Awaits</h1>
            <p className="mt-6 text-gray-700 max-w-3xl text-lg sm:text-xl leading-relaxed font-medium">Stop searching endlessly. We handle <strong>flights, accommodations, transfers & experiences</strong> — all perfectly tailored to your dream adventure.</p>
          </div>
          <SearchBar onSearch={onSearch} />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { logo: '/atol-logo.png', text: 'ATOL Protected' },
              { logo: '/247-logo.png', text: '24/7 Support' },
              { logo: '/bestprice-logo.jpg', text: 'Best Price' },
              { logo: '/flexibledates-logo.png', text: 'Flexible Dates' }
            ].map(f => (
              <div key={f.text} className="group relative rounded-2xl border-2 border-cyan-100 bg-gradient-to-br from-cyan-50/80 to-blue-50/80 p-4 hover:border-cyan-400 hover:shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 to-blue-400/0 group-hover:from-cyan-400/10 group-hover:to-blue-400/10 rounded-2xl transition-all duration-300"></div>
                <div className="relative flex flex-col items-center gap-3 text-center">
                  {f.logo ? (
                    <img src={f.logo} alt={f.text} className="w-8 h-8 object-contain rounded-full" />
                  ) : (
                    <span className="text-2xl">{f.icon}</span>
                  )}
                  <span className="font-bold text-gray-900 text-sm group-hover:text-cyan-700 transition-colors">{f.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

const DESTS = [
  { key: "Bali", img: IMAGES.bali, tag: "Tropical" },
  { key: "Tokyo", img: IMAGES.tokyo, tag: "City" },
  { key: "Swiss Alps", img: IMAGES.alps, tag: "Adventure" },
  { key: "Thailand", img: IMAGES.thailand, tag: "Tropical" },
  { key: "London", img: IMAGES.london, tag: "Historic" },
  { key: "Sydney", img: IMAGES.sydney, tag: "Beach City" },
];

// Helper function to get price for specific airport
const getPriceForAirport = (tour, airport) => {
  if (airport && tour.airportPricing && tour.airportPricing[airport]) {
    return tour.airportPricing[airport];
  }
  return tour.price;
};

// Helper function to get minimum price across all airports
const getMinPrice = (tour) => {
  if (!tour.airportPricing || Object.keys(tour.airportPricing).length === 0) {
    return tour.price;
  }
  return Math.min(tour.price, ...Object.values(tour.airportPricing));
};

const Destinations = () => (
  <section id="destinations" className="py-24 bg-gradient-to-b from-white to-gray-50">
    <Container>
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Popular Destinations</h2>
          <p className="mt-3 text-gray-600 text-lg">Hand‑picked places our travellers love right now.</p>
        </div>
        <span className="rounded-full border border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50 px-5 py-2.5 text-xs font-semibold text-cyan-700 shadow-sm hover:shadow-md transition-shadow">✓ Curated experiences</span>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {DESTS.map(d => (
          <article key={d.key} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white hover:shadow-2xl hover:border-cyan-300 transition-all duration-300 cursor-pointer">
            <div className="relative h-56 w-full overflow-hidden bg-gray-100">
              <img src={d.img} alt={d.key} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" onError={(e)=>{e.currentTarget.src = '/placeholder.svg';}}/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6 flex flex-col items-start justify-between">
              <h3 className="font-bold text-xl text-gray-900 group-hover:text-cyan-600 transition-colors">{d.key}</h3>
              <span className="mt-3 text-xs font-semibold rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 px-4 py-1.5 inline-block">{d.tag}</span>
            </div>
          </article>
        ))}
      </div>
    </Container>
  </section>
);

const AboutUs = () => (
  <section id="about" className="py-24 bg-white">
    <Container>
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        {/* Left: Image/Visual */}
        <div className="rounded-3xl overflow-hidden shadow-xl">
          <img src={IMAGES.aboutUs} alt="SAYVA Travel Team" className="w-full h-96 object-cover" />
        </div>
        
        {/* Right: Content */}
        <div>
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 border border-cyan-300">
            <span className="text-xs font-bold text-cyan-700 tracking-widest uppercase">About SAYVA</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Redefining Travel, One Journey at a Time</h2>
          
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Founded in 2015, SAYVA Travel has been on a mission to transform how people travel. We believe that every journey should be as unique and memorable as the person taking it.
          </p>
          
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Our team of expert travel designers works tirelessly to craft bespoke itineraries that go beyond the ordinary. From handpicked accommodations to local experiences, we handle every detail so you can simply enjoy the adventure.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center flex-shrink-0 mt-1">✓</div>
              <div>
                <h4 className="font-bold text-gray-900">Expert Local Knowledge</h4>
                <p className="text-gray-600 text-sm mt-1">Our team has personally explored every destination we offer</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center flex-shrink-0 mt-1">✓</div>
              <div>
                <h4 className="font-bold text-gray-900">24/7 Support</h4>
                <p className="text-gray-600 text-sm mt-1">We're here for you before, during, and after your trip</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center flex-shrink-0 mt-1">✓</div>
              <div>
                <h4 className="font-bold text-gray-900">ATOL Protected</h4>
                <p className="text-gray-600 text-sm mt-1">Your bookings are fully protected and insured</p>
              </div>
            </div>
          </div>
          
          <button onClick={() => scrollTo('contact')} className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg transition-shadow">
            Start Your Journey
          </button>
        </div>
      </div>
    </Container>
  </section>
);

const TOUR_DATA = [
  { id: 1, title: "Bali Escape — 7 Nights", dest: "Bali", nights: 7, price: 1199, img: IMAGES.bali, highlights: ["Ubud rice terraces","Nusa Dua beach","Temple sunset cruise"], airportPricing: { JFK: 1299, LAX: 1199, LHR: 1399, SYD: 899, SIN: 950 } },
  { id: 2, title: "Tokyo Lights — 5 Nights", dest: "Tokyo", nights: 5, price: 1390, img: IMAGES.tokyo, highlights: ["Shibuya at night","Tsukiji food tour","Mt. Fuji day trip"], airportPricing: { JFK: 1490, LAX: 1390, HND: 850, NRT: 950, SIN: 1200 } },
  { id: 3, title: "Swiss Alps Adventure — 6 Nights", dest: "Swiss Alps", nights: 6, price: 1690, img: IMAGES.alps, highlights: ["Interlaken hikes","Lake Brienz","Jungfraujoch train"], airportPricing: { JFK: 1890, LAX: 1790, LHR: 1490, CDG: 1390, FRA: 1590 } },
  { id: 4, title: "Thailand — 4 Nights", dest: "Thailand", nights: 4, price: 980, img: IMAGES.thailand, highlights: ["Longtail boat tour of Khao Phing Kan","Phang Nga Bay limestone kayaking","Thai island hopping adventure"], airportPricing: { JFK: 1280, LAX: 1180, LHR: 1380, BKK: 680, SIN: 750 } },
  { id: 5, title: "London Royal Tour — 5 Nights", dest: "London", nights: 5, price: 1450, img: IMAGES.london, highlights: ["Big Ben & Houses of Parliament","Tower of London tour","Royal Palace & museums"], airportPricing: { JFK: 1250, LAX: 1350, LHR: 1050, CDG: 1280, FRA: 1380 } },
  { id: 6, title: "Sydney Harbour — 6 Nights", dest: "Sydney", nights: 6, price: 1580, img: IMAGES.sydney, highlights: ["Sydney Opera House tour","Bondi Beach & coastal walk","Blue Mountains day trip"], airportPricing: { JFK: 1980, LAX: 1880, LHR: 1980, SYD: 980, MEL: 1080 } },
];

const BookingDetails = ({ tour, airport, onClose, onContinue }) => {
  if (!tour) return null;

  const basePrice = getPriceForAirport(tour, airport);
  
  // Accommodation options similar to Agoda
  const accommodations = [
    {
      id: 'budget',
      name: '3-Star Hotel',
      description: 'Standard rooms, shared facilities',
      pricePerNight: Math.round((basePrice * 0.8) / tour.nights),
      totalPrice: Math.round(basePrice * 0.8),
      rating: '7.5/10',
      benefits: ['Free WiFi', 'Basic breakfast', 'Shared pool'],
      icon: '🏨'
    },
    {
      id: 'standard',
      name: '4-Star Resort',
      description: 'Comfortable rooms, excellent amenities',
      pricePerNight: Math.round(basePrice / tour.nights),
      totalPrice: basePrice,
      rating: '8.5/10',
      benefits: ['Premium WiFi', 'Full breakfast', 'Private pool', 'Spa access'],
      icon: '⭐',
      mostPopular: true
    },
    {
      id: 'luxury',
      name: '5-Star Luxury',
      description: 'Premium suites, exclusive experiences',
      pricePerNight: Math.round((basePrice * 1.4) / tour.nights),
      totalPrice: Math.round(basePrice * 1.4),
      rating: '9.5/10',
      benefits: ['24/7 concierge', 'Gourmet dining', 'VIP experiences', 'Transfers included'],
      icon: '👑'
    }
  ];

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const nights = tour.nights || 1;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full my-8 p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">{tour.title}</h2>
            <p className="text-gray-600 mt-2">
              📍 {tour.dest} 
              {tour.departDate && tour.returnDate && (
                <>
                  {' • '}
                  {formatDate(tour.departDate)} - {formatDate(tour.returnDate)}
                  {' • '}{nights} {nights === 1 ? 'night' : 'nights'}
                </>
              )}
            </p>
          </div>
          <button onClick={onClose} className="text-2xl font-bold text-gray-400 hover:text-gray-600">×</button>
        </div>

        {/* Tour Image */}
        <div className="mb-6 rounded-2xl overflow-hidden h-64">
          <img src={tour.img} alt={tour.title} className="w-full h-full object-cover" onError={(e)=>{e.currentTarget.src = '/placeholder.svg';}}/>
        </div>

        {/* Accommodation Options - Like Agoda */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-4">Select Your Stay</h3>
          <div className="grid gap-4">
            {accommodations.map((acc) => (
              <button
                key={acc.id}
                onClick={() => onContinue({...tour, accommodation: acc.id, price: acc.totalPrice})}
                className={`p-6 rounded-2xl border-2 transition-all text-left ${
                  acc.mostPopular
                    ? 'border-cyan-500 bg-gradient-to-r from-cyan-50 to-blue-50 ring-2 ring-cyan-200'
                    : 'border-gray-200 hover:border-cyan-400 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{acc.icon}</span>
                      <div>
                        <h4 className="font-bold text-lg">{acc.name}</h4>
                        <p className="text-sm text-gray-600">{acc.description}</p>
                      </div>
                      {acc.mostPopular && <span className="ml-auto bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold">Most Popular</span>}
                    </div>
                    <div className="flex gap-4 mt-3 text-sm">
                      <span className="flex items-center gap-1">⭐ {acc.rating}</span>
                      {acc.benefits.map((benefit, i) => (
                        <span key={i} className="text-gray-600">✓ {benefit}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right ml-4 flex-shrink-0">
                    <div className="text-2xl font-bold text-cyan-600">${acc.totalPrice}</div>
                    <div className="text-xs text-gray-500">Total for {nights} {nights === 1 ? 'night' : 'nights'}</div>
                    <div className="text-sm text-gray-600 mt-2">${acc.pricePerNight}/night</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-6 bg-gray-50 rounded-2xl p-4">
          <h4 className="font-bold mb-3">Highlights</h4>
          <ul className="grid gap-2 text-sm">
            {tour.highlights.map(h => (
              <li key={h} className="flex items-center gap-2">
                <span className="text-cyan-500">✓</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
        </div>
      </div>
    </div>
  );
};

const ItineraryModal = ({ tour, onClose, onPaymentClick }) => {
  if (!tour) return null;
  const itineraries = {
    1: ["Day 1: Arrive in Bali, transfer to resort","Day 2-3: Explore Ubud rice terraces & temples","Day 4: Nusa Dua beach & water sports","Day 5: Relax at resort spa & infinity pool","Day 6-7: Temple sunset cruise & shopping"],
    2: ["Day 1: Arrive in Tokyo, Shibuya crossing tour","Day 2: Tsukiji food market & sushi class","Day 3: Mt. Fuji day trip & hot spring","Day 4: Traditional tea ceremony & gardens","Day 5: Akihabara tech district & karaoke"],
    3: ["Day 1: Arrive in Interlaken, alpine views","Day 2-3: Hiking in Jungfrau region","Day 4: Lake Brienz boat tour & waterfalls","Day 5: Jungfraujoch train to Top of Europe","Day 6: Paragliding & traditional fondue dinner"],
    4: ["Day 1: Arrive Phuket, transfer to Phang Nga","Day 2: Longtail boat tour of Khao Phing Kan & James Bond Island","Day 3: Limestone kayaking in Phang Nga Bay","Day 4: Thai island hopping & snorkeling adventure"],
    5: ["Day 1: Arrive in London, Westminster Abbey tour","Day 2: Big Ben & Houses of Parliament walking tour","Day 3: Tower of London & Crown Jewels","Day 4: Royal Museums & Buckingham Palace","Day 5: West End theatre & Piccadilly Circus"],
    6: ["Day 1: Arrive in Sydney, harbour sightseeing","Day 2: Sydney Opera House guided tour & Blue Mountains hike","Day 3: Bondi Beach & scenic coastal walk to Coogee","Day 4: Sydney Aquarium & Darling Harbour","Day 5-6: Blue Mountains day trip & local wine tasting"],
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-3xl font-bold">{tour.title} — Itinerary</h2>
          <button onClick={onClose} className="text-2xl font-bold text-gray-400 hover:text-gray-600">×</button>
        </div>
        <div className="mb-4 text-gray-600">
          <div className="flex justify-between mb-2">
            <div><strong>${tour.price}</strong> per person</div>
            <div><strong>{tour.nights}</strong> nights</div>
          </div>
          {tour.departDate && (
            <div className="text-sm">
              📅 {new Date(tour.departDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} 
              {tour.returnDate && ` - ${new Date(tour.returnDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}`}
            </div>
          )}
        </div>
        <ol className="space-y-3">
          {(itineraries[tour.id] || []).map((day, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-bold text-cyan-500 flex-shrink-0">{i+1}.</span>
              <span className="text-gray-700">{day}</span>
            </li>
          ))}
        </ol>
        <div className="mt-8 pt-6 border-t flex gap-3">
          <Button variant="primary" onClick={() => { onClose(); onPaymentClick?.(tour); }}>Book Now</Button>
          <Button variant="outline" onClick={() => { onClose(); scrollTo('contact'); }}>Request Quote</Button>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

const Tours = ({ filter, onInitiatePayment }) => {
  const [selectedTour, setSelectedTour] = useState(null);
  const filtered = useMemo(() => {
    return TOUR_DATA.filter(t => (!filter.dest || t.dest === filter.dest) && (!filter.minNights || t.nights >= filter.minNights));
  }, [filter]);
  return (
    <section id="tours" className="py-20 bg-gray-50">
      <Container>
        <div className="flex items-end justify-between"><div><h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Featured Tours</h2><p className="mt-2 text-gray-600">Flexible itineraries you can customise with our travel experts.</p></div><span className="hidden sm:inline rounded-full border px-3 py-1 text-xs">{filtered.length} results</span></div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(t => (
            <article key={t.id} className="overflow-hidden rounded-3xl border bg-white">
              <div className="h-44 w-full overflow-hidden"><img src={t.img} alt={t.title} className="h-full w-full object-cover" onError={(e)=>{e.currentTarget.src = '/placeholder.svg';}}/></div>
              <div className="p-5">
                <h3 className="font-semibold">{t.title}</h3>
                <p className="mt-1 text-sm text-gray-600">From <strong>${getMinPrice(t)}</strong> pp · {t.nights} nights</p>
                <ul className="mt-3 text-sm text-gray-700 list-disc pl-5 space-y-1">
                  {t.highlights.slice(0,3).map(h => <li key={h}>{h}</li>)}
                </ul>
                <div className="mt-5 flex gap-3"><Button variant="primary" onClick={()=>scrollTo('contact')}>Enquire</Button><Button variant="outline" onClick={()=>setSelectedTour(t)}>Itinerary</Button></div>
              </div>
            </article>
          ))}
        </div>
      </Container>
      <ItineraryModal tour={selectedTour} onClose={()=>setSelectedTour(null)} onPaymentClick={onInitiatePayment} />
    </section>
  );
};

const SearchBar = ({ onSearch }) => {
  const [country, setCountry] = useState("");
  const [airport, setAirport] = useState("");
  const [dest, setDest] = useState("");
  const [minNights, setMinNights] = useState(0);
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'SG', name: 'Singapore' },
    { code: 'HK', name: 'Hong Kong' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'JP', name: 'Japan' },
    { code: 'IN', name: 'India' },
  ];

  const airportsByCountry = {
    US: ['JFK', 'LAX', 'ORD', 'DFW', 'ATL'],
    UK: ['LHR', 'LGW', 'STN', 'LTN', 'MAN'],
    CA: ['YYZ', 'YVR', 'YUL'],
    AU: ['SYD', 'MEL', 'BNE'],
    NZ: ['AKL', 'CHC'],
    SG: ['SIN'],
    HK: ['HKG'],
    AE: ['DXB', 'AUH'],
    FR: ['CDG', 'ORY'],
    DE: ['BER', 'MUC', 'FRA'],
    JP: ['NRT', 'HND', 'KIX'],
    IN: ['DEL', 'BOM', 'BLR'],
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="mt-10 bg-gradient-to-br from-white to-cyan-50/30 rounded-2xl p-8 border-2 border-cyan-200 shadow-xl">
      <h3 className="text-sm font-black uppercase tracking-widest text-cyan-700 mb-6">🔍 Start Your Perfect Trip</h3>
      {/* Row 1: Location & Duration */}
      <div className="grid gap-4 sm:grid-cols-5 mb-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">📍 From Country</label>
          <select value={country} onChange={(e)=>setCountry(e.target.value)} className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-gray-900 font-medium focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 transition-all bg-white hover:border-cyan-400 cursor-pointer">
            <option value="">Select departure country</option>
            {countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">✈️ Airport</label>
          <select value={airport} onChange={(e)=>setAirport(e.target.value)} className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-gray-900 font-medium focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 transition-all bg-white hover:border-cyan-400 disabled:bg-gray-100 disabled:text-gray-500 cursor-pointer" disabled={!country}>
            <option value="">Select airport</option>
            {country && airportsByCountry[country]?.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">🌙 Duration</label>
          <input type="number" min={0} value={minNights} onChange={(e)=>setMinNights(parseInt(e.target.value||'0'))} placeholder="0" className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-gray-900 font-medium focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 transition-all hover:border-cyan-400"/>
        </div>
      </div>

      {/* Row 2: Destination & Dates */}
      <div className="grid gap-4 sm:grid-cols-5">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wide text-gray-700 mb-2">Destination</label>
          <select value={dest} onChange={(e)=>setDest(e.target.value)} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all bg-white hover:border-gray-400">
            <option value="">Any destination</option>
            {DESTS.map(d => <option key={d.key} value={d.key}>{d.key}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">📅 Depart</label>
          <input type="date" min={today} value={departDate} onChange={(e)=>setDepartDate(e.target.value)} className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-gray-900 font-medium focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 transition-all hover:border-cyan-400" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">🔄 Return</label>
          <input type="date" min={departDate || today} value={returnDate} onChange={(e)=>setReturnDate(e.target.value)} className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-gray-900 font-medium focus:border-cyan-500 focus:ring-2 focus:ring-cyan-300 transition-all hover:border-cyan-400" />
        </div>
        <div className="flex items-end">
          <Button variant="primary" onClick={()=>onSearch({country, airport, dest: dest || null, minNights: minNights || 0, departDate, returnDate})} className="w-full h-14 font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
            <span className="flex items-center justify-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>
              Search Now
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

const SearchResults = ({ filter, onClose, onBookTour, onPayTour }) => {
  const [customTour, setCustomTour] = useState(null);
  const [customPrice, setCustomPrice] = useState(1500);

  const filtered = useMemo(() => {
    return TOUR_DATA.filter(t => (!filter.dest || t.dest === filter.dest) && (!filter.minNights || t.nights >= filter.minNights));
  }, [filter]);

  if (!filter || (!filter.dest && !filter.minNights)) return null;

  const hasMatches = filtered.length > 0;
  const displayTours = hasMatches ? filtered : TOUR_DATA;

  const customBooking = {
    id: 999,
    title: `Custom ${filter.dest || 'Trip'} - ${filter.minNights || 'Flexible'} Nights`,
    dest: filter.dest || 'Custom',
    nights: filter.minNights || 5,
    price: customPrice,
    img: IMAGES.hero,
    highlights: ['Tailored itinerary', 'Custom dates & budget', 'Personal travel designer']
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-8 p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">Search Results</h2>
            <p className="text-gray-600 mt-1">
              {filter.airport ? `From: ${filter.airport}` : ''} 
              {filter.airport && filter.dest ? ' • ' : ''}
              {filter.dest ? `To: ${filter.dest}` : 'All Destinations'} 
              {filter.minNights > 0 ? ` • ${filter.minNights} nights` : ''}
              {filter.departDate ? ` • ${new Date(filter.departDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : ''}
              {filter.returnDate ? ` - ${new Date(filter.returnDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : ''}
            </p>
          </div>
          <button onClick={onClose} className="text-2xl font-bold text-gray-400 hover:text-gray-600">×</button>
        </div>

        {!hasMatches && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6">
            <p className="text-blue-900">✨ <strong>No exact matches found.</strong> Here are our popular tours, or create a custom booking below:</p>
          </div>
        )}

        <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2">
          {/* Suggested Tours */}
          {displayTours.map(tour => (
            <div key={tour.id} className="group border border-gray-200 rounded-2xl p-6 hover:border-cyan-400 hover:shadow-xl hover:bg-cyan-50/30 transition-all duration-300">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="h-40 w-full sm:w-48 flex-shrink-0 rounded-xl overflow-hidden shadow-md">
                  <img src={tour.img} alt={tour.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" onError={(e)=>{e.currentTarget.src = '/placeholder.svg';}}/>
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-900">{tour.title}</h3>
                  <p className="text-gray-600 mt-2 flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-1">⏱ {tour.nights} nights</span>
                    <span className="flex items-center gap-1">🏷 From <span className="font-bold text-cyan-600 text-base">${tour.price}</span></span>
                  </p>
                  <ul className="mt-4 text-sm text-gray-700 space-y-2 flex-1">
                    {tour.highlights.map(h => (
                      <li key={h} className="flex items-start gap-2">
                        <span className="text-cyan-500 flex-shrink-0 mt-0.5">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button variant="primary" onClick={() => { onPayTour?.({...tour, departDate: filter.departDate, returnDate: filter.returnDate}); onClose(); }} className="font-semibold">Book Now</Button>
                    <Button variant="outline" onClick={() => { onBookTour?.(tour); onClose(); }} className="font-semibold">View Details</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Divider */}
          {displayTours.length > 0 && (
            <div className="my-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-600 font-bold">OR</span>
              </div>
            </div>
          )}

          {/* Custom Tour Builder */}
          <div className="border-2 border-cyan-400 rounded-2xl p-8 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">✨</span>
              <h3 className="text-xl font-bold text-gray-900">Create Your Custom Trip</h3>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Destination</label>
                <p className="text-gray-800 font-bold mt-2 text-lg">{filter.dest || 'Any Destination'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Duration</label>
                <p className="text-gray-800 font-bold mt-2 text-lg">{filter.minNights ? `${filter.minNights}+ nights` : 'Flexible'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Budget per Person</label>
                <p className="text-cyan-600 font-bold mt-2 text-lg">${customPrice}</p>
              </div>
            </div>
            <div className="mt-6">
              <label className="text-sm font-semibold text-gray-700 block mb-3">Adjust Your Budget</label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min="500" 
                  max="5000" 
                  step="100" 
                  value={customPrice}
                  onChange={(e) => setCustomPrice(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gradient-to-r from-cyan-300 to-cyan-500 rounded-lg appearance-none cursor-pointer"
                />
                <span className="font-bold text-cyan-600 text-lg min-w-fit">${customPrice}</span>
              </div>
            </div>
            <div className="pt-6 flex flex-wrap gap-3">
              <Button 
                variant="primary" 
                onClick={() => { 
                  const customWithDates = { ...customBooking, price: customPrice, departDate: filter.departDate, returnDate: filter.returnDate };
                  setCustomTour(customWithDates); 
                  onPayTour?.(customWithDates); 
                  onClose(); 
                }}
                className="font-semibold"
              >
                Pay for Custom Trip
              </Button>
              <Button 
                variant="outline" 
                onClick={() => { 
                  onClose();
                  scrollTo('contact');
                }}
              >
                Request Quote
              </Button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 mt-6">
            {hasMatches ? `Showing ${filtered.length} matching tour${filtered.length !== 1 ? 's' : ''}` : 'Can\'t find what you want? Create a custom trip above!'}
          </div>
        </div>
      </div>
    </div>
  );
};

const Packages = () => (
  <section id="packages" className="py-24 bg-gradient-to-br from-white to-gray-50">
    <Container>
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center">Holiday Packages</h2>
      <p className="mt-4 text-center text-gray-600 text-lg max-w-2xl mx-auto">Choose a package then tailor it with our travel experts.</p>
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[{
          name: "Essentials",
          price: "From $899",
          desc: "Perfect for budget-conscious travellers",
          features: ["Flights & 3★ stays","Airport transfers","Two guided experiences"],
          highlight: false,
        },{
          name: "Signature",
          price: "From $1,499",
          desc: "Our most popular choice",
          features: ["4★ boutique hotels","Private transfers","Curated activities"],
          highlight: true,
        },{
          name: "Luxury",
          price: "From $2,499",
          desc: "Premium all-inclusive experiences",
          features: ["5★ resorts & villas","Custom chauffeur","VIP experiences"],
          highlight: false,
        }].map(card => (
          <div key={card.name} className={`rounded-2xl p-8 transition-all duration-300 ${card.highlight ? 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-2xl scale-105' : 'bg-white border border-gray-200 hover:shadow-lg'}`}>
            <div className="flex items-center justify-between mb-4"><h3 className={`text-2xl font-bold`}>{card.name}</h3><span className={`rounded-full px-3 py-1 text-sm font-bold ${card.highlight ? 'bg-white/20' : 'bg-gray-100 text-gray-700'}`}>{card.price}</span></div>
            <p className={`text-sm mb-6 ${card.highlight ? 'text-white/80' : 'text-gray-600'}`}>{card.desc}</p>
            <ul className="space-y-3 mb-8">{card.features.map(f => <li key={f} className="flex gap-3"><svg className="mt-0.5 flex-shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12l4 4L19 7" stroke={card.highlight ? "white" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg><span className={`text-sm ${card.highlight ? 'text-white' : 'text-gray-700'}`}>{f}</span></li>)}</ul>
            <Button variant={card.highlight ? "primary" : "outline"} onClick={()=>scrollTo('contact')}>Enquire Now</Button>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const Reviews = () => (
  <section id="reviews" className="py-24 bg-gradient-to-br from-gray-50 to-white">
    <Container>
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">What travellers say</h2>
      <p className="mt-3 text-gray-600 text-lg">Real experiences from our happy customers.</p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[{t:"Flawless planning and gorgeous hotels — we'll book again!",n:"Ava, UK",r:5},{t:"The Railay Beach experience was unreal. Everything ran on time.",n:"Rayan, FR",r:5},{t:"Super friendly support and great value.",n:"Maya, AU",r:5}].map((q,i)=>(
          <figure key={i} className="rounded-2xl border border-gray-200 bg-white p-7 hover:shadow-lg transition-shadow">
            <div className="flex gap-1 mb-4">{[...Array(q.r)].map((_, j) => <svg key={j} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}</div>
            <blockquote className="text-gray-700 leading-relaxed font-medium">{q.t}</blockquote><figcaption className="mt-5 text-sm font-semibold text-gray-900">{q.n}</figcaption>
          </figure>
        ))}
      </div>
    </Container>
  </section>
);

const FAQ = () => (
  <section id="faq" className="py-20">
    <Container>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">FAQs</h2>
      <div className="mt-8 grid gap-4 max-w-3xl mx-auto">
        {[{q:"Can I customise a package?",a:"Yes, all trips are tailor‑made. We adjust hotels, activities, and dates to suit you."},{q:"Do you arrange visas?",a:"We advise on requirements and can coordinate documentation with local partners."},{q:"How do I pay?",a:"Secure card payments and bank transfer available. Deposits protect your booking while we finalise details."}].map(it=> (
          <details key={it.q} className="group rounded-2xl border bg-white p-5"><summary className="cursor-pointer list-none text-base font-semibold"><span className="mr-2 inline-block rounded-full border px-2 py-0.5 text-xs">Q</span>{it.q}</summary><p className="mt-3 text-sm text-gray-700">{it.a}</p></details>
        ))}
      </div>
    </Container>
  </section>
);

const Contact = () => {
  const [sent, setSent] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    // Reset after 5 seconds
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <Container>
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="rounded-3xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 p-8 h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                {/* Phone */}
                <div>
                  <div className="text-sm font-bold uppercase tracking-wider text-cyan-700 mb-2">📞 Call Us</div>
                  <a href="tel:+442071930847" className="text-xl font-bold text-gray-900 hover:text-cyan-600 transition-colors">+44 (0)20 7193 0847</a>
                  <p className="text-xs text-gray-600 mt-1">Mon-Fri, 9am-6pm GMT</p>
                </div>

                {/* Address */}
                <div>
                  <div className="text-sm font-bold uppercase tracking-wider text-cyan-700 mb-2">📍 Visit Us</div>
                  <div className="text-gray-900 font-semibold">
                    <div>SAYVA Travel Ltd</div>
                    <div>42 Bermondsey Street</div>
                    <div>London, SE1 3UD</div>
                    <div className="text-xs text-gray-600 mt-2">United Kingdom</div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <div className="text-sm font-bold uppercase tracking-wider text-cyan-700 mb-2">✉️ Email</div>
                  <a href="mailto:hello@sayvat.com" className="text-gray-900 hover:text-cyan-600 transition-colors font-semibold">hello@sayvat.com</a>
                </div>

                {/* Hours */}
                <div className="pt-4 border-t border-cyan-200">
                  <div className="text-sm font-bold uppercase tracking-wider text-cyan-700 mb-2">🕐 Hours</div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div><span className="font-semibold">Monday - Friday:</span> 9am - 6pm</div>
                    <div><span className="font-semibold">Saturday:</span> 10am - 4pm</div>
                    <div><span className="font-semibold">Sunday:</span> Closed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border-2 border-cyan-200 bg-white p-8 shadow-lg">
              <h2 className="text-3xl font-bold tracking-tight">Plan your trip</h2>
              <p className="mt-2 text-gray-600">Share your dates and ideas — our travel designers will reply with a custom itinerary and quote.</p>
              
              {sent && (
                <div className="fixed top-4 right-4 bg-green-500 text-white rounded-xl p-4 shadow-lg flex items-center gap-3 z-40 animate-bounce">
                  <span className="text-2xl">✓</span>
                  <div>
                    <div className="font-bold">Quote Request Sent!</div>
                    <div className="text-sm">We'll get back to you soon with a personalized itinerary.</div>
                  </div>
                </div>
              )}
              
              {sent ? (
                <div className="mt-6 rounded-2xl border-2 border-green-200 bg-green-50 p-8 text-center">
                  <div className="text-4xl mb-3">✓</div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">Quote Request Sent!</h3>
                  <p className="text-green-700">Thank you for your enquiry. Our travel specialists will review your request and send a personalized quote within 24 hours.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form name="sayva-book" method="POST" data-netlify="true" className="mt-6 grid gap-4" onSubmit={handleSubmit}>
                  <input type="hidden" name="form-name" value="sayva-book" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><label className="text-sm font-medium">Full name</label><input name="name" required className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"/></div>
                    <div><label className="text-sm font-medium">Email</label><input name="email" type="email" required className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"/></div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div><label className="text-sm font-medium">Destination</label><input name="destination" className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200" placeholder="e.g. Bali"/></div>
                    <div><label className="text-sm font-medium">Start date</label><input name="start" type="date" className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"/></div>
                    <div><label className="text-sm font-medium">Nights</label><input name="nights" type="number" min={1} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"/></div>
                  </div>
                  <div><label className="text-sm font-medium">Notes</label><textarea name="notes" rows={4} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200" placeholder="Travellers, budget, interests"/></div>
                  <div className="flex items-center justify-between"><div className="text-xs text-gray-500">By submitting, you agree to be contacted about this enquiry.</div><Button variant="primary">Request quote</Button></div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

const Footer = () => (
  <footer className="border-t bg-white">
    <Container className="py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
  <div className="flex items-center gap-3"><img src="/logo.png" alt="SAYVA Travel logo" className="h-10 w-10 rounded-md object-contain"/><div className="text-sm">© {new Date().getFullYear()} SAYVA Travel · All rights reserved</div></div>
      <div className="text-xs text-gray-600 flex gap-4"><a href="#faq" onClick={(e)=>{e.preventDefault();scrollTo('faq');}} className="hover:underline">FAQ</a><a className="hover:underline" href="#contact" onClick={(e)=>{e.preventDefault();scrollTo('contact');}}>Contact</a><a className="hover:underline" href="#home" onClick={(e)=>{e.preventDefault();scrollTo('home');}}>Back to top</a></div>
    </Container>
  </footer>
);

const PaymentMethods = () => (
  <section className="py-20 bg-white border-t">
    <Container>
      <div className="mb-12">
        <h3 className="text-center text-sm font-semibold text-cyan-600 uppercase tracking-widest mb-2">Accepted Payment Methods</h3>
        <p className="text-center text-gray-600 text-lg">We accept multiple secure payment options worldwide</p>
        <div className="mx-auto w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-4"></div>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { logo: "/visa.jpg", name: "Credit/Debit Card", desc: "Visa, Mastercard & more" },
          { icon: "🏦", name: "Bank Transfer", desc: "Direct bank payment" },
          { logo: "/Apple_Pay_logo.svg.png", name: "Apple Pay", desc: "Quick & secure checkout" },
          { logo: "/Google_Pay_Logo.svg.png", name: "Google Pay", desc: "Fast mobile payments" },
          { logo: "/xrp.png", name: "Cryptocurrency", desc: "Bitcoin, Ethereum & XRP" },
          { logo: "/paypal.png", name: "PayPal", desc: "Trusted payment platform" },
        ].map(m => (
          <div key={m.name} className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 text-center hover:shadow-lg hover:border-cyan-300 transition-all duration-300">
            <div className="h-20 flex items-center justify-center mb-4">
              {m.logo ? (
                <img src={m.logo} alt={m.name} className="h-16 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }}/>
              ) : (
                <div className="text-4xl">{m.icon}</div>
              )}
            </div>
            <div className="font-bold text-lg text-gray-900">{m.name}</div>
            <div className="text-sm text-gray-600 mt-2">{m.desc}</div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const Partners = () => (
  <section className="py-20 bg-gradient-to-br from-gray-50 to-white border-t">
    <Container>
      <div className="mb-12">
        <h3 className="text-center text-sm font-semibold text-cyan-600 uppercase tracking-widest mb-2">Trusted Partners</h3>
        <p className="text-center text-gray-600 text-lg mb-2">We work with the world's leading airlines</p>
        <div className="mx-auto w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
      </div>
      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
        {[
          { name: "British Airways", logo: "/BA-Logo.png" },
          { name: "Emirates", logo: "/Emirates.png" },
          { name: "Singapore Airlines", logo: "/Singapore-Airlines-Logo.png" },
          { name: "Thai Airways", logo: "/Thai-Airways-International-Logo.png" },
          { name: "Lufthansa", logo: "/lufthansa-Logo.png" },
          { name: "Air France", logo: "/Air_France-Logo.png" },
        ].map(airline => (
          <div key={airline.name} className="flex flex-col items-center gap-3 group">
            <div className="relative w-full h-24 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden border border-gray-100 group-hover:border-cyan-200 group-hover:scale-105">
              {airline.logo ? (
                <img src={airline.logo} alt={airline.name} className="h-16 w-20 object-contain px-2" onError={(e) => e.target.style.display = "none"} />
              ) : (
                <div className="h-16 w-20 flex items-center justify-center" dangerouslySetInnerHTML={{ __html: airline.svg }} />
              )}
            </div>
            <div className="text-xs font-semibold text-gray-700 text-center px-1 line-clamp-2">{airline.name}</div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

const CookieConsent = ({ onOpenPrivacy, onOpenTerms }) => {
  const [accepted, setAccepted] = useState(false);
  const [showBanner, setShowBanner] = useState(!localStorage.getItem('cookieConsent'));

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setAccepted(true);
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 md:p-6 shadow-2xl border-t-2 border-cyan-400 z-50">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-2">🍪 Privacy & Cookies</h4>
            <p className="text-sm text-gray-300">
              We use cookies to enhance your experience and analyze site usage. By clicking "Accept", you agree to our{' '}
              <button onClick={onOpenPrivacy} className="text-cyan-400 hover:text-cyan-300 underline bg-none border-none cursor-pointer">Privacy Policy</button> and{' '}
              <button onClick={onOpenTerms} className="text-cyan-400 hover:text-cyan-300 underline bg-none border-none cursor-pointer">Terms of Service</button>. You can manage your preferences anytime.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={handleReject}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              Accept All
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};


const PaymentGateway = ({ tour, email, onClose, onSuccess }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardholderName: '',
    cardType: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Detect card type based on first digits
  const detectCardType = (number) => {
    const cleanNum = number.replace(/\s/g, '');
    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cleanNum)) return 'visa';
    if (/^5[1-5][0-9]{14}$/.test(cleanNum)) return 'mastercard';
    if (/^62[0-9]{14}$/.test(cleanNum)) return 'unionpay';
    return '';
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s+/g, '').replace(/[^\d]/g, '').slice(0, 16);
    const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
    const cardType = detectCardType(value);
    setCardDetails({ ...cardDetails, cardNumber: formatted, cardType });
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    const formatted = value.length >= 2 ? `${value.slice(0, 2)}/${value.slice(2)}` : value;
    setCardDetails({ ...cardDetails, cardExpiry: formatted });
  };

  const handleCVCChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCardDetails({ ...cardDetails, cardCVC: value });
  };

  const validateCard = () => {
    if (cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
      setError('Card number must be 16 digits');
      return false;
    }
    if (cardDetails.cardExpiry.length !== 5) {
      setError('Expiry date must be MM/YY');
      return false;
    }
    if (cardDetails.cardCVC.length !== 3) {
      setError('CVC must be 3 digits');
      return false;
    }
    if (!cardDetails.cardholderName.trim()) {
      setError('Cardholder name is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateCard()) return;

    setLoading(true);
    // Simulate payment processing (in production, this would call your backend which uses Stripe API)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Call success callback
      if (onSuccess) {
        onSuccess({
          amount: tour?.price || 0,
          email,
          tour: tour?.title || 'Travel Package',
          cardLast4: cardDetails.cardNumber.slice(-4),
        });
      }
      // Close after 2 seconds
      setTimeout(() => onClose(), 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center">
          <div className="text-5xl mb-4">✓</div>
          <h3 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h3>
          <p className="text-gray-600 mb-6">Your booking has been confirmed. A confirmation email will be sent to {email}.</p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <div className="flex justify-between mb-2"><span className="text-gray-600">Amount Paid:</span><span className="font-bold">${tour?.price}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Card:</span><span className="font-bold">••••{cardDetails.cardNumber.slice(-4)}</span></div>
          </div>
          <button onClick={onClose} className="w-full px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl transition-colors">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full my-8 p-8">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-bold">Complete Payment</h2>
          <button onClick={onClose} className="text-2xl font-bold text-gray-400 hover:text-gray-600">×</button>
        </div>

        {tour && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="text-sm text-gray-600 mb-1">Booking:</div>
            <div className="font-bold text-lg mb-3">{tour.title}</div>
            <div className="flex justify-between items-center pt-3 border-t">
              <span className="font-semibold">Total Amount:</span>
              <span className="text-2xl font-bold text-cyan-600">${tour.price}</span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Supported Cards Display */}
          <div className="flex gap-3 items-center justify-center mb-4 pb-4 border-b">
            <span className="text-xs font-semibold text-gray-600">We Accept:</span>
            {/* Visa Logo */}
            <div className="flex flex-col items-center gap-1">
              <img src="/visa.jpg" alt="Visa" className="h-7 rounded object-contain" onError={(e) => e.target.style.display = 'none'} />
              <span className="text-xs text-gray-600">Visa</span>
            </div>
            {/* Mastercard Logo */}
            <div className="flex flex-col items-center gap-1">
              <img src="/mastercard.png" alt="Mastercard" className="h-7 rounded object-contain" onError={(e) => e.target.style.display = 'none'} />
              <span className="text-xs text-gray-600">Mastercard</span>
            </div>
            {/* UnionPay Logo */}
            <div className="flex flex-col items-center gap-1">
              <img src="/UnionPay.png" alt="UnionPay" className="h-7 rounded object-contain" onError={(e) => e.target.style.display = 'none'} />
              <span className="text-xs text-gray-600">UnionPay</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Cardholder Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={cardDetails.cardholderName}
              onChange={(e) => setCardDetails({ ...cardDetails, cardholderName: e.target.value })}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-sm font-medium flex items-center justify-between mb-1">
              <span>Card Number</span>
              {cardDetails.cardType && (
                <span className="text-xs font-semibold text-cyan-600 capitalize">{cardDetails.cardType}</span>
              )}
            </label>
            <input
              type="text"
              placeholder="4242 4242 4242 4242"
              value={cardDetails.cardNumber}
              onChange={handleCardNumberChange}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              disabled={loading}
              maxLength="19"
            />
            <div className="text-xs text-gray-500 mt-1">
              💳 Test Cards: Visa: 4242 4242 4242 4242 • MC: 5555 5555 5555 4444 • UnionPay: 62 1234 (any 14+ digits)
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                value={cardDetails.cardExpiry}
                onChange={handleExpiryChange}
                className="w-full rounded-lg border px-3 py-2 text-sm"
                disabled={loading}
                maxLength="5"
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">CVC</label>
              <input
                type="text"
                placeholder="123"
                value={cardDetails.cardCVC}
                onChange={handleCVCChange}
                className="w-full rounded-lg border px-3 py-2 text-sm"
                disabled={loading}
                maxLength="3"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 text-white font-bold rounded-xl transition-colors"
          >
            {loading ? 'Processing...' : `Pay $${tour?.price || 0}`}
          </button>

          <div className="text-xs text-gray-500 text-center">
            🔒 Secure payment • Your card details are encrypted
          </div>
        </form>
      </div>
    </div>
  );
};

const PriceSelector = ({ tour, airport, onClose, onSelectPrice }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Confirm Your Selection</h2>
            <p className="text-sm text-gray-600 mt-1">{tour?.title}</p>
          </div>
          <button onClick={onClose} className="text-2xl font-bold text-gray-400 hover:text-gray-600">×</button>
        </div>

        <div className="bg-cyan-50 rounded-2xl p-6 mb-6 border-2 border-cyan-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-sm">Total Price per Person</p>
              <h3 className="text-4xl font-bold text-cyan-600">${tour?.price}</h3>
            </div>
            <div className="text-right">
              <p className="text-gray-600 text-sm">{tour?.nights} nights</p>
              <p className="text-lg font-semibold text-gray-800">${Math.round((tour?.price || 0) / (tour?.nights || 1))}/night</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <span className="text-2xl">🏨</span>
            <div>
              <p className="font-semibold text-gray-800">{tour?.accommodation === 'budget' ? '3-Star Hotel' : tour?.accommodation === 'luxury' ? '5-Star Luxury' : '4-Star Resort'}</p>
              <p className="text-sm text-gray-600">{tour?.accommodation === 'budget' ? 'Standard accommodations' : tour?.accommodation === 'luxury' ? 'Premium experience' : 'Comfortable hotels & guided experiences'}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">Back</Button>
          <Button variant="primary" onClick={() => onSelectPrice(tour)} className="flex-1">Continue</Button>
        </div>
      </div>
    </div>
  );
};

const PassengerForm = ({ tour, onClose, onContinue }) => {
  const [passengers, setPassengers] = useState(
    Array(tour?.passengers || 1).fill('').map(() => ({ name: '' }))
  );

  const handleNameChange = (index, name) => {
    const updated = [...passengers];
    updated[index].name = name;
    setPassengers(updated);
  };

  const handleContinue = () => {
    if (passengers.every(p => p.name.trim())) {
      onContinue(passengers);
    } else {
      alert('Please enter names for all passengers');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Passenger Details</h2>
            <p className="text-sm text-gray-600 mt-1">{tour?.title}</p>
          </div>
          <button onClick={onClose} className="text-2xl font-bold text-gray-400 hover:text-gray-600">×</button>
        </div>

        <div className="space-y-4 mb-6">
          {passengers.map((passenger, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium mb-2">
                Passenger {idx + 1} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Full name"
                value={passenger.name}
                onChange={(e) => handleNameChange(idx, e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleContinue}>Continue to Payment</Button>
        </div>
      </div>
    </div>
  );
};

const PrivacyPolicy = ({ onClose }) => (
  <div id="privacy" className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
    <div className="bg-white rounded-3xl max-w-4xl w-full my-8 p-8">
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-3xl font-bold">Privacy Policy</h2>
        <button onClick={onClose} className="text-2xl font-bold text-gray-400 hover:text-gray-600">×</button>
      </div>
      <div className="space-y-6 text-gray-700 max-h-[70vh] overflow-y-auto">
        <section>
          <h3 className="text-xl font-bold mb-3">1. Introduction</h3>
          <p>SAYVA Travel ("we", "us", "our") operates this website. This Privacy Policy explains how we collect, use, protect and share your personal information.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold mb-3">2. Information We Collect</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Information:</strong> When you submit a quote request or booking inquiry, we collect your name, email, phone number, destination preferences, travel dates, and any notes you provide.</li>
            <li><strong>Browsing Information:</strong> We use cookies and analytics to understand how you interact with our site (pages visited, time spent, etc.).</li>
            <li><strong>Device Information:</strong> We may collect information about your device, including IP address, browser type, and operating system.</li>
          </ul>
        </section>
        <section>
          <h3 className="text-xl font-bold mb-3">3. How We Use Your Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process your travel quote requests and bookings</li>
            <li>Communicate with you about your inquiries</li>
            <li>Improve our website and services</li>
            <li>Send promotional emails (you can opt-out anytime)</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>
        <section>
          <h3 className="text-xl font-bold mb-3">4. Data Protection</h3>
          <p>Your data is securely stored and protected by industry-standard encryption. We do not sell or rent your personal information to third parties. We only share information with trusted travel partners necessary to fulfill your bookings.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold mb-3">5. Your Rights</h3>
          <p>You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at support@sayvatravel.com.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold mb-3">6. Contact Us</h3>
          <p>If you have questions about this Privacy Policy, please contact: <strong>support@sayvatravel.com</strong></p>
        </section>
      </div>
      <button onClick={onClose} className="mt-6 w-full px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl transition-colors">
        Close
      </button>
    </div>
  </div>
);

const TermsOfService = ({ onClose }) => (
  <div id="terms" className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
    <div className="bg-white rounded-3xl max-w-4xl w-full my-8 p-8">
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-3xl font-bold">Terms of Service</h2>
        <button onClick={onClose} className="text-2xl font-bold text-gray-400 hover:text-gray-600">×</button>
      </div>
      <div className="space-y-6 text-gray-700 max-h-[70vh] overflow-y-auto">
        <section>
          <h3 className="text-xl font-bold mb-3">1. Agreement to Terms</h3>
          <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold mb-3">2. Use License</h3>
          <p>Permission is granted to temporarily download one copy of the materials (information or software) on SAYVA Travel's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold mb-3">3. Booking and Payment</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>All quotes are valid for 30 days from the date issued</li>
            <li>A deposit may be required to confirm your booking</li>
            <li>Full payment terms will be outlined in your personalized quote</li>
            <li>Cancellation policies vary by travel partner and destination</li>
          </ul>
        </section>
        <section>
          <h3 className="text-xl font-bold mb-3">4. Limitation of Liability</h3>
          <p>In no case shall SAYVA Travel, its suppliers, or contributors be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SAYVA Travel's website.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold mb-3">5. Accuracy of Materials</h3>
          <p>The materials appearing on SAYVA Travel's website could include technical, typographical, or photographic errors. SAYVA Travel does not warrant that any of the materials on this website are accurate, complete, or current.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold mb-3">6. Modifications</h3>
          <p>SAYVA Travel may revise these terms of service for this website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold mb-3">7. Governing Law</h3>
          <p>These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which SAYVA Travel operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold mb-3">8. Contact Us</h3>
          <p>If you have questions about these Terms of Service, please contact: <strong>support@sayvatravel.com</strong></p>
        </section>
      </div>
      <button onClick={onClose} className="mt-6 w-full px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl transition-colors">
        Close
      </button>
    </div>
  </div>
);


export default function SayvaAgency(){
  const [filter, setFilter] = useState({ dest: null, minNights: 0 });
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [paymentTour, setPaymentTour] = useState(null);
  const [paymentEmail, setPaymentEmail] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchFilter, setSearchFilter] = useState(null);
  const [showPassengerForm, setShowPassengerForm] = useState(false);
  const [passengerData, setPassengerData] = useState([]);
  const [showPriceSelector, setShowPriceSelector] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);

  const handleSearch = (criteria) => {
    setSearchFilter(criteria);
    setSelectedAirport(criteria.airport);
    setShowSearchResults(true);
  };

  const handleInitiateBooking = (tour) => {
    setPaymentTour(tour);
    setShowBookingDetails(true);
  };

  const handleBookingDetailsSelected = (selectedTour) => {
    setPaymentTour(selectedTour);
    setShowBookingDetails(false);
    setShowPriceSelector(true);
  };

  const handlePriceSelected = (selectedTour) => {
    setPaymentTour(selectedTour);
    setShowPriceSelector(false);
    setShowPassengerForm(true);
  };

  const handlePassengersSubmit = (passengers) => {
    setPassengerData(passengers);
    setShowPassengerForm(false);
    setPaymentEmail('');
    setShowPayment(true);
  };

  const handlePaymentSuccess = (paymentData) => {
    console.log('Payment successful:', paymentData);
    // You can add additional logic here, like sending confirmation email
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav/>
      <Hero onSearch={handleSearch}/>
      <AboutUs/>
      <Destinations/>
      <Tours filter={filter} onInitiatePayment={(tour, email) => { handleInitiateBooking(tour); setPaymentEmail(email); }}/>
      <Packages/>
      <Reviews/>
      <FAQ/>
      <Contact onInitiatePayment={(email) => { setPaymentEmail(email); setShowPayment(true); }}/>
      <PaymentMethods/>
      <Partners/>
      <Footer/>
      <CookieConsent onOpenPrivacy={() => setShowPrivacy(true)} onOpenTerms={() => setShowTerms(true)} />
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
      {showTerms && <TermsOfService onClose={() => setShowTerms(false)} />}
      {showBookingDetails && <BookingDetails tour={paymentTour} airport={selectedAirport} onClose={() => setShowBookingDetails(false)} onContinue={handleBookingDetailsSelected} />}
      {showPriceSelector && <PriceSelector tour={paymentTour} airport={selectedAirport} onClose={() => setShowPriceSelector(false)} onSelectPrice={handlePriceSelected} />}
      {showPassengerForm && <PassengerForm tour={paymentTour} onClose={() => setShowPassengerForm(false)} onContinue={handlePassengersSubmit} />}
      {showPayment && <PaymentGateway tour={paymentTour} email={paymentEmail} onClose={() => setShowPayment(false)} onSuccess={handlePaymentSuccess} />}
      {showSearchResults && <SearchResults 
        filter={searchFilter} 
        onClose={() => setShowSearchResults(false)} 
        onPayTour={(tour) => { handleInitiateBooking(tour); }}
        onBookTour={(tour) => { scrollTo('tours'); }}
      />}
    </div>
  );
}
            {['ABTA‑style care','24/7 support','Best‑price match','Flexible dates'].map(t=> <div key={t} className="rounded-2xl border bg-gray-50 p-3 text-center font-medium">{t}</div>)}

