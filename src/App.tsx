/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import {
  Mountain,
  MapPin,
  Calendar,
  Users,
  ChevronRight,
  Star,
  Camera,
  Compass,
  Menu,
  X,
  Instagram,
  Facebook,
  Twitter,
  Database
} from "lucide-react";
import { useState, useRef } from "react";
import DBMirrorDashboard from "./components/DBMirrorDashboard";

const tours = [
  {
    id: 1,
    name: "Mount Bromo Sunrise",
    description: "Witness the ethereal sunrise over the sea of sand and the smoking crater of Bromo.",
    image: "https://javavolcano-touroperator.com/ops/baratha-hotel-departure-team.jpg",
    price: "$149",
    duration: "12 Hours",
    rating: 4.9
  },
  {
    id: 2,
    name: "Ijen Blue Fire Expedition",
    description: "A midnight trek to see the rare blue fire and the world's largest acidic crater lake.",
    image: "https://javavolcano-touroperator.com/ops/ijen-geopark-briefing.png",
    price: "$189",
    duration: "18 Hours",
    rating: 5.0
  },
  {
    id: 3,
    name: "Mount Merapi Jeep Adventure",
    description: "Explore the lava flows and bunkers of the most active volcano in Indonesia.",
    image: "https://javavolcano-touroperator.com/ops/police-vehicle-support.jpg",
    price: "$129",
    duration: "8 Hours",
    rating: 4.8
  }
];

const features = [
  {
    icon: <Compass className="w-6 h-6" />,
    title: "Expert Local Guides",
    description: "Our guides are born and raised in the shadow of these giants, knowing every secret path."
  },
  {
    icon: <Camera className="w-6 h-6" />,
    title: "Photography Focused",
    description: "We time our tours for the perfect light, ensuring you capture once-in-a-lifetime shots."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Small Groups",
    description: "Intimate experiences with a maximum of 6 people per group for personalized attention."
  }
];

const crew = [
  { name: "Gufron", role: "Expert Guide", image: "https://javavolcano-touroperator.com/uploads/1768225567764-405955176-gufron.png" },
  { name: "Fauzi", role: "Expert Guide", image: "https://javavolcano-touroperator.com/uploads/1768226003889-338819579-fauzi.png" },
  { name: "Taufik", role: "Expert Guide", image: "https://javavolcano-touroperator.com/uploads/1768228083285-919198019-taufik_1_.png" },
  { name: "Boy", role: "Expert Guide", image: "https://javavolcano-touroperator.com/uploads/1768228191022-893381041-boy.png" }
];

const verificationDocs = [
  { title: "NIB Business ID", image: "https://javavolcano-touroperator.com/legal/NIB-1102230032918-preview.png" },
  { title: "Tourist Police Assignment", image: "https://javavolcano-touroperator.com/legal/SPRIN-POLPAR.png" },
  { title: "HPWKI Approval", image: "https://javavolcano-touroperator.com/legal/HPWKI-approval-preview.png" },
  { title: "Police Travel Order", image: "https://javavolcano-touroperator.com/legal/SPRIN-WAL-TRAVEL-2024-02-12.png" }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'db-mirror'>('home');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  if (currentPage === 'db-mirror') {
    return <DBMirrorDashboard />;
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-gold selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="https://javavolcano-touroperator.com/assets/img/jvto-color.png" alt="JVTO Logo" className="w-10 h-10 object-contain" referrerPolicy="no-referrer" />
            <span className="font-serif text-2xl font-bold tracking-tight">JAVA VOLCANO</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
            <a href="#tours" className="hover:text-gold transition-colors">Tours</a>
            <a href="#about" className="hover:text-gold transition-colors">About</a>
            <a href="#verification" className="hover:text-gold transition-colors">Verification</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
            <button
              onClick={() => setCurrentPage('db-mirror')}
              className="px-4 py-2 glass border border-gold text-gold font-bold rounded-full hover:bg-gold/10 transition-all flex items-center gap-2"
            >
              <Database className="w-4 h-4" />
              DB Mirror
            </button>
            <button className="px-6 py-2 bg-gold text-black font-bold rounded-full hover:bg-white transition-all transform hover:scale-105">
              Book Now
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-40 bg-black pt-24 px-6 flex flex-col gap-8 text-2xl font-serif"
        >
          <a href="#tours" onClick={() => setIsMenuOpen(false)}>Tours</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#verification" onClick={() => setIsMenuOpen(false)}>Verification</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
          <button className="w-full py-4 bg-gold text-black font-bold rounded-xl">Book Now</button>
        </motion.div>
      )}

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <img 
            src="https://javavolcano-touroperator.com/assets/img/hero/home.webp" 
            alt="Majestic Volcano" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gold uppercase tracking-[0.5em] text-sm font-bold mb-6"
          >
            Adventure Awaits
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
          >
            Touch the <span className="italic font-normal text-gold">Clouds</span>, <br />
            Feel the <span className="text-lava">Fire</span>.
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <button className="px-10 py-4 bg-gold text-black font-bold rounded-full text-lg hover:bg-white transition-all flex items-center justify-center gap-2 group">
              Explore Tours <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-4 glass text-white font-bold rounded-full text-lg hover:bg-white/20 transition-all">
              Watch Film
            </button>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll to explore</span>
          <div className="w-px h-12 bg-white/30" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Tours Completed", value: "2,500+" },
            { label: "Happy Travelers", value: "10k+" },
            { label: "Expert Guides", value: "25" },
            { label: "Safety Rating", value: "99.9%" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-4xl font-bold text-gold mb-2">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-white/50">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tours Section */}
      <section id="tours" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-gold uppercase tracking-widest text-sm font-bold mb-4">Curated Experiences</h2>
              <h3 className="text-5xl md:text-6xl font-bold">Our Signature <span className="italic font-normal">Expeditions</span></h3>
            </div>
            <p className="max-w-md text-white/60 text-lg">
              Each tour is meticulously planned to provide a balance of adrenaline, safety, and breathtaking beauty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tours.map((tour, i) => (
              <motion.div 
                key={tour.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl mb-6">
                  <img 
                    src={tour.image} 
                    alt={tour.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                    <Star className="w-3 h-3 text-gold fill-gold" /> {tour.rating}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-gold font-bold text-xl mb-1">{tour.price}</div>
                        <div className="text-xs uppercase tracking-widest opacity-70">Starting From</div>
                      </div>
                      <div className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> {tour.duration}
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="text-2xl font-bold mb-2 group-hover:text-gold transition-colors">{tour.name}</h4>
                <p className="text-white/60 leading-relaxed">{tour.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="about" className="py-32 bg-ash/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img 
                  src="https://javavolcano-touroperator.com/founder/agung_sambuko.jpg" 
                  alt="Our Founder" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 glass p-8 rounded-3xl max-w-xs hidden md:block">
                <p className="italic text-lg mb-4">"The best way to experience Java is through the eyes of those who call it home."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold overflow-hidden">
                    <img src="https://javavolcano-touroperator.com/founder/mr-sam-tourist-police-portrait.png" alt="Mr Sam" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <div className="font-bold">Agung Sambuko (Mr. Sam)</div>
                    <div className="text-xs text-white/50">Founder & Tourist Police Officer</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-gold uppercase tracking-widest text-sm font-bold mb-4">Why Choose Us</h2>
              <h3 className="text-5xl font-bold mb-8">The <span className="text-gold">Java Volcano</span> Difference</h3>
              <div className="space-y-10">
                {features.map((feature, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                      <p className="text-white/60 leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crew Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-gold uppercase tracking-widest text-sm font-bold mb-4">Our Crew</h2>
            <h3 className="text-5xl font-bold">Meet Your <span className="italic font-normal">Guides</span></h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {crew.map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="aspect-square rounded-full overflow-hidden mb-6 border-2 border-transparent group-hover:border-gold transition-all">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
                </div>
                <h4 className="text-xl font-bold">{member.name}</h4>
                <p className="text-white/50 text-sm uppercase tracking-widest">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Verification Section */}
      <section id="verification" className="py-32 bg-ash/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-gold uppercase tracking-widest text-sm font-bold mb-4">Trust & Safety</h2>
            <h3 className="text-5xl font-bold">Verified <span className="italic font-normal">Credentials</span></h3>
            <p className="mt-6 text-white/60 max-w-2xl mx-auto">
              We are a fully registered travel company led by active Tourist Police. Your safety is backed by official certification and government oversight.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {verificationDocs.map((doc, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-4 rounded-2xl group cursor-zoom-in"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-xl mb-4 bg-white/5">
                  <img src={doc.image} alt={doc.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                </div>
                <h4 className="font-bold text-sm text-center uppercase tracking-widest">{doc.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-5xl mx-auto glass rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold/10 to-lava/10 -z-10" />
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready for your next <br /><span className="italic font-normal">Great Adventure?</span></h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Book your tour today and experience the raw power of nature. Custom private tours available upon request.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-gold transition-colors min-w-[300px]"
            />
            <button className="px-10 py-4 bg-gold text-black font-bold rounded-full hover:bg-white transition-all">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <img src="https://javavolcano-touroperator.com/assets/img/jvto-color.png" alt="JVTO Logo" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
                <span className="font-serif text-2xl font-bold tracking-tight">JAVA VOLCANO</span>
              </div>
              <p className="text-white/50 max-w-sm leading-relaxed">
                Java Volcano Tour Operator (JVTO) is a registered Indonesian travel company based in Bondowoso and led by an active Tourist Police officer.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-6 uppercase tracking-widest text-xs">Quick Links</h5>
              <ul className="space-y-4 text-white/50 text-sm">
                <li><a href="#" className="hover:text-gold transition-colors">Destinations</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Safety Protocols</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Sustainability</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 uppercase tracking-widest text-xs">Follow Us</h5>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-gold transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-gold transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-gold transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-xs text-white/30 uppercase tracking-widest gap-4">
            <div>© 2026 Java Volcano Tour Operator. All rights reserved.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
