import React, { useState } from 'react';
import { 
  Wrench, Wind, Droplet, Zap, Sun, ShoppingCart, 
  Users, Calendar, DollarSign, CheckCircle, Clock, 
  Menu, X, ArrowRight, ShieldCheck, Wrench as Tool,
  LayoutDashboard, FileText, Settings, LogOut,
  Award, UserCheck, Star,
  Facebook, Instagram, Twitter, Phone, Mail, MapPin,
  ChevronLeft, ChevronRight
} from 'lucide-react';

// --- NEW COMPONENT: IMAGE CAROUSEL ---
function ImageCarousel({ images, altTitle }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-80 lg:h-[450px] rounded-3xl overflow-hidden shadow-lg border-4 border-white group">
      <img 
        src={images[currentIndex]} 
        alt={`${altTitle} - imagen ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-all duration-500 ease-in-out"
      />
      
      {/* Controles del Carrusel (Aparecen al pasar el mouse) */}
      <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between px-4">
        <button 
          onClick={prev} 
          className="bg-white/90 p-2 rounded-full text-slate-800 hover:bg-blue-600 hover:text-white transition-colors shadow-md"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={next} 
          className="bg-white/90 p-2 rounded-full text-slate-800 hover:bg-blue-600 hover:text-white transition-colors shadow-md"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicadores (Puntitos) */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => setCurrentIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`} 
          />
        ))}
      </div>
    </div>
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  const [view, setView] = useState('public'); // 'public' or 'admin'
  const [darkMode, setDarkMode] = useState(false);

  // Effect to apply dark mode class to html element
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-200 ${darkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {view === 'public' ? (
        <PublicSite 
          onSwitchView={() => setView('admin')} 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      ) : (
        <AdminDashboard 
          onSwitchView={() => setView('public')} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
        />
      )}
    </div>
  );
}

// --- PUBLIC SITE COMPONENT ---
function PublicSite({ onSwitchView, darkMode, setDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [selectedService, setSelectedService] = useState(""); // Nuevo estado para preseleccionar servicio

  const handleOpenModal = (serviceId = "") => {
    setSelectedService(serviceId);
    setIsModalOpen(true);
  };

  const services = [
    { icon: <Wrench className="w-8 h-8 text-blue-600" />, title: "Línea Blanca", desc: "Reparación de lavadoras, secadoras y refrigeradores con repuestos originales." },
    { icon: <Wind className="w-8 h-8 text-blue-600" />, title: "Aire Acondicionado", desc: "Instalación y mantenimiento de equipos mini-split y centrales." },
    { icon: <Droplet className="w-8 h-8 text-blue-600" />, title: "Plomería y Fontanería", desc: "Solución a fugas, instalación de tuberías y mantenimiento general." },
    { icon: <Zap className="w-8 h-8 text-blue-600" />, title: "Electricidad", desc: "Cableado, reparación de cortos circuitos y proyectos eléctricos para empresas." },
    { icon: <Sun className="w-8 h-8 text-green-500" />, title: "Paneles Solares", desc: "Transición a energía limpia con instalación y mantenimiento de celdas solares." },
    { icon: <ShoppingCart className="w-8 h-8 text-blue-600" />, title: "Venta de Equipos", desc: "Comercialización de equipos nuevos y seminuevos con garantía SERTEG." }
  ];

  // Nueva información detallada para cada área principal
  const detailedServices = [
    {
      id: "linea-blanca",
      title: "Línea Blanca",
      desc: "Especialistas en la reparación y mantenimiento preventivo de electrodomésticos para el hogar. Nos aseguramos de alargar la vida útil de tus equipos usando refacciones originales y técnicas de diagnóstico avanzadas.",
      features: ["Reparación de Lavadoras y Secadoras", "Mantenimiento de Refrigeradores", "Reparación de Centros de Lavado", "Garantía de servicio por escrito"],
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1000&auto=format&fit=crop",
      icon: <Wrench className="w-6 h-6 text-blue-600" />,
      reverse: false
    },
    {
      id: "aire",
      title: "Aire Acondicionado",
      desc: "Mantén la temperatura ideal en tu hogar o negocio. Realizamos desde servicios de limpieza profunda (preventivo) hasta la instalación de equipos complejos e industriales.",
      features: ["Mantenimiento Preventivo y Correctivo", "Instalación de equipos Mini-split", "Reparación de Sistemas Centrales", "Recargas de Gas Refrigerante"],
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1000&auto=format&fit=crop",
      icon: <Wind className="w-6 h-6 text-cyan-600" />,
      reverse: true
    },
    {
      id: "electricidad-plomeria",
      title: "Electricidad y Plomería",
      desc: "Soluciones seguras y definitivas para la infraestructura de tu inmueble. Contamos con ingenieros y técnicos que resuelven desde un corto circuito hasta el rediseño de tuberías.",
      features: ["Solución a Cortos Circuitos y Fugas", "Cableado Estructurado Comercial", "Mantenimiento a Tuberías e Hidroneumáticos", "Balanceo de Cargas Eléctricas"],
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1000&auto=format&fit=crop",
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      reverse: false
    },
    {
      id: "paneles",
      title: "Paneles Solares",
      desc: "Únete a la transición energética. Diseñamos, instalamos y damos mantenimiento a sistemas de energía solar para que reduzcas drásticamente tu recibo de luz mientras cuidas el planeta.",
      features: ["Estudio de Consumo Eléctrico", "Instalación de Paneles (Residencial/Industrial)", "Mantenimiento y Limpieza de Celdas", "Gestión de Trámites ante CFE"],
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1000&auto=format&fit=crop",
      icon: <Sun className="w-6 h-6 text-green-500" />,
      reverse: true
    },
    {
      id: "venta",
      title: "Venta de Equipos",
      desc: "Además de reparar, comercializamos equipos de línea blanca y aire acondicionado. Te asesoramos para que compres justo lo que necesitas, con opción de instalación profesional inmediata.",
      features: ["Equipos Nuevos de Primeras Marcas", "Equipos Seminuevos Restaurados", "Garantía Extendida SERTEG", "Instalación Profesional Incluida"],
      images: [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop", // Refrigerador
        "https://images.unsplash.com/photo-1626806787426-5910811b6325?q=80&w=1000&auto=format&fit=crop", // Lavadoras
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1000&auto=format&fit=crop"  // Estufa/Cocina
      ],
      icon: <ShoppingCart className="w-6 h-6 text-indigo-600" />,
      reverse: false
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Navbar */}
      <nav className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Tool className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-800 dark:text-white">SERTEG</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Inicio</a>
              <a href="#servicios" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Servicios</a>
              <a href="#nosotros" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Nosotros</a>
              
              {/* Dark Mode Toggle */}
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <div className="w-5 h-5 bg-slate-800 rounded-full" />} 
              </button>

              <button 
                onClick={onSwitchView}
                className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Portal Interno
              </button>
              <button 
                onClick={() => handleOpenModal()}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 dark:shadow-none"
              >
                Cotizar Servicio
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <div className="w-5 h-5 bg-slate-800 rounded-full" />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 dark:text-slate-300 z-50 relative">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Menu */}
        <div className={`fixed inset-0 bg-slate-900/50 z-40 transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}></div>
        
        <div className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-slate-800 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full pt-24 px-6 pb-6 space-y-6">
            <a href="#" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-b border-slate-100 dark:border-slate-700 pb-2">Inicio</a>
            <a href="#servicios" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-b border-slate-100 dark:border-slate-700 pb-2">Servicios</a>
            <a href="#nosotros" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-b border-slate-100 dark:border-slate-700 pb-2">Nosotros</a>
            
            <div className="mt-auto space-y-4">
              <button 
                onClick={() => { setIsMenuOpen(false); onSwitchView(); }}
                className="w-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-3 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Portal Interno
              </button>
              <button 
                onClick={() => { setIsMenuOpen(false); handleOpenModal(); }}
                className="w-full bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 dark:shadow-none"
              >
                Cotizar Servicio
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors duration-300">
        {/* Background decorative elements */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '4s'}}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Text Content */}
            <div className="flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 shadow-sm text-blue-700 dark:text-blue-400 text-sm font-semibold mb-6">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Técnicos Certificados a tu Servicio
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                Soluciones integrales de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">mantenimiento</span> para tu hogar y empresa
              </h1>
              <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
                Desde la reparación de tu refrigerador hasta proyectos industriales de electricidad y paneles solares. Expertos especializados en cada área listos para ayudarte.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => handleOpenModal()}
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center gap-2 hover:-translate-y-1"
                >
                  Solicitar un Técnico <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => { document.getElementById('servicios-detallados').scrollIntoView({ behavior: 'smooth' }); }}
                  className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center"
                >
                  Explorar Servicios
                </button>
              </div>

              {/* Trust indicators */}
              <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-700 flex items-center gap-8 w-full">
                <div>
                  <h4 className="text-3xl font-black text-slate-900 dark:text-white">15+</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Años de experiencia</p>
                </div>
                <div className="w-px h-12 bg-slate-200 dark:bg-slate-700"></div>
                <div>
                  <h4 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-1">4.9 <Star className="w-6 h-6 fill-amber-400 text-amber-400 mb-1"/></h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Clientes satisfechos</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Image Mockup */}
            <div className="relative lg:ml-10 mt-10 lg:mt-0">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000&auto=format&fit=crop" 
                  alt="Técnico profesional realizando mantenimiento" 
                  className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
                />
                {/* Overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              </div>

              {/* Floating Card 1: Garantía */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl shadow-xl flex items-center gap-4 border border-slate-100 dark:border-slate-700 transition-transform hover:-translate-y-2">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full shrink-0">
                  <CheckCircle className="text-green-600 dark:text-green-400 w-6 h-6 sm:w-8 sm:h-8"/>
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">100% Garantizado</p>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Repuestos originales</p>
                </div>
              </div>

              {/* Floating Card 2: Respuesta Rápida */}
              <div className="absolute top-10 -right-4 sm:-right-8 bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100 dark:border-slate-700 transition-transform hover:-translate-y-2">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full shrink-0">
                  <Clock className="text-blue-600 dark:text-blue-400 w-5 h-5"/>
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Respuesta Rápida</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="servicios" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Especialistas en cada detalle</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">No somos "todólogos". Asignamos al técnico experto específico para el problema que tienes, garantizando un trabajo de primera.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow group">
                <div className="bg-slate-50 dark:bg-slate-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Services Sections */}
      <div id="servicios-detallados" className="py-12 bg-white dark:bg-slate-800 transition-colors duration-300">
        {detailedServices.map((service, idx) => (
          <div key={service.id} className={`py-16 ${idx % 2 !== 0 ? 'bg-slate-50 dark:bg-slate-900' : 'bg-white dark:bg-slate-800'} transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`flex flex-col ${service.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
                
                {/* Image side */}
                <div className="w-full lg:w-1/2 relative">
                  <div className="absolute inset-0 bg-blue-600/10 dark:bg-blue-600/20 rounded-3xl transform translate-x-4 translate-y-4"></div>
                  {service.images ? (
                    <ImageCarousel images={service.images} altTitle={service.title} />
                  ) : (
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="relative rounded-3xl w-full h-80 lg:h-[450px] object-cover shadow-lg border-4 border-white dark:border-slate-700"
                    />
                  )}
                </div>

                {/* Content side */}
                <div className="w-full lg:w-1/2 flex flex-col items-start">
                  <div className="bg-white dark:bg-slate-700 p-3 rounded-xl shadow-sm border border-slate-100 dark:border-slate-600 mb-6 inline-flex">
                    {service.icon}
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">{service.title}</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                    {service.desc}
                  </p>
                  
                  <ul className="space-y-4 mb-8 w-full">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                        <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handleOpenModal(service.id)}
                    className="inline-flex items-center gap-2 bg-slate-900 dark:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                  >
                    Cotizar {service.title} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* About Us Section (Nosotros) */}
      <div id="nosotros" className="py-24 bg-white dark:bg-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Conoce a SERTEG</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">Más de una década brindando soluciones confiables y construyendo relaciones duraderas con nuestros clientes.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Nuestra Historia */}
            <div className="bg-slate-50 dark:bg-slate-700 p-10 rounded-3xl border border-slate-100 dark:border-slate-600 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl text-blue-700 dark:text-blue-300">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Nuestra Historia</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Hace más de 15 años, SERTEG nació con una misión clara: ofrecer un servicio técnico en el que la gente realmente pudiera confiar. Empezamos como un pequeño taller reparando electrodomésticos y, gracias a la recomendación directa de nuestros clientes y nuestro compromiso con la honestidad, crecimos hasta convertirnos en una empresa de servicios integrales.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Hoy, no solo mantenemos la línea blanca de tu hogar en perfecto estado, sino que ejecutamos proyectos eléctricos para empresas y lideramos la transición hacia la energía solar. Nuestra filosofía sigue intacta: resolver tus problemas con rapidez y calidad garantizada.
              </p>
            </div>

            {/* Un Equipo de Expertos */}
            <div className="bg-slate-50 dark:bg-slate-700 p-10 rounded-3xl border border-slate-100 dark:border-slate-600 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-xl text-indigo-700 dark:text-indigo-300">
                  <UserCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Un Equipo de Expertos</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                En SERTEG no creemos en los "todólogos", creemos en la especialización profunda. Nuestro equipo está conformado por técnicos certificados que dedican su carrera a dominar un área específica: desde ingenieros eléctricos y expertos en refrigeración, hasta instaladores de paneles solares.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Cuando un técnico de SERTEG llega a tu domicilio o empresa, tienes la tranquilidad de recibir a un profesional uniformado, en constante capacitación y respaldado por una empresa seria que asume total responsabilidad de cada trabajo. Tu seguridad es nuestra prioridad.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand Info */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Tool className="w-6 h-6 text-blue-500" />
                <span className="font-bold text-2xl tracking-tight text-white">SERTEG</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Soluciones integrales de mantenimiento y reparación para tu hogar y empresa. Expertos en cada área, resultados garantizados.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-6">Enlaces Rápidos</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Inicio</a></li>
                <li><a href="#servicios" className="hover:text-blue-400 transition-colors">Nuestros Servicios</a></li>
                <li><a href="#nosotros" className="hover:text-blue-400 transition-colors">Sobre Nosotros</a></li>
                <li><button onClick={() => setIsModalOpen(true)} className="hover:text-blue-400 transition-colors">Cotizar Servicio</button></li>
                <li><button onClick={onSwitchView} className="hover:text-blue-400 transition-colors">Portal Administrativo</button></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold mb-6">Nuestros Servicios</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Línea Blanca</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Aire Acondicionado</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Electricidad y Plomería</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Paneles Solares</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Venta de Equipos</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-6">Contacto</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span>+52 (123) 456-7890</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span>contacto@serteg.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span>Av. Principal #123, Col. Centro<br/>Ciudad, Estado, C.P. 12345</span>
                </li>
              </ul>
            </div>
            
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm">
            <p>© 2026 SERTEG Servicios Integrales. Todos los derechos reservados.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Aviso de Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex justify-center items-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-slate-50 dark:bg-slate-700 border-b border-slate-100 dark:border-slate-600 px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                <Tool className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Solicitar Servicio
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Body (Form) */}
            <div className="p-6">
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                Déjanos tus datos y un técnico especializado se pondrá en contacto contigo lo antes posible para brindarte una cotización.
              </p>
              
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); alert("¡Solicitud enviada con éxito!"); }}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre Completo</label>
                  <input type="text" required className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Ej. Juan Pérez" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Teléfono</label>
                    <input type="tel" required className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="(000) 000-0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tipo de Servicio</label>
                    <select 
                      required 
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Selecciona uno...</option>
                      <option value="linea-blanca">Línea Blanca</option>
                      <option value="aire">Aire Acondicionado</option>
                      <option value="electricidad-plomeria">Electricidad y Plomería</option>
                      <option value="paneles">Paneles Solares</option>
                      <option value="venta">Venta de Equipos</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Detalles del problema o proyecto</label>
                  <textarea rows="3" required className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" placeholder="Describe brevemente lo que necesitas..."></textarea>
                </div>

                {/* Modal Footer */}
                <div className="pt-4 flex gap-3 justify-end">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2 rounded-lg font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 dark:shadow-none"
                  >
                    Enviar Solicitud
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- ADMIN SUB-COMPONENTS ---

function DashboardHome() {
  const stats = [
    { title: "Trabajos Activos", value: "12", icon: <Wrench className="w-6 h-6 text-blue-500" />, trend: "+2 hoy" },
    { title: "Clientes Atendidos", value: "148", icon: <Users className="w-6 h-6 text-indigo-500" />, trend: "Este mes" },
    { title: "Por Cobrar", value: "$14,500", icon: <DollarSign className="w-6 h-6 text-amber-500" />, trend: "4 facturas pendientes" },
    { title: "Trabajos Completados", value: "85", icon: <CheckCircle className="w-6 h-6 text-green-500" />, trend: "Este mes" },
  ];

  const recentJobs = [
    { id: "TRB-1042", client: "Hotel Paraíso", type: "Aire Acondicionado", tech: "Carlos M.", status: "En progreso", payment: "Pendiente" },
    { id: "TRB-1041", client: "Familia Ruiz", type: "Línea Blanca", tech: "Roberto G.", status: "Completado", payment: "Pagado" },
    { id: "TRB-1040", client: "Empacadora del Norte", type: "Electricidad", tech: "Ana L.", status: "Agendado", payment: "Anticipo 50%" },
    { id: "TRB-1039", client: "Residencial Las Palmas", type: "Paneles Solares", tech: "Ing. Martínez", status: "Completado", payment: "Pendiente" },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Completado': return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Completado</span>;
      case 'En progreso': return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">En progreso</span>;
      case 'Agendado': return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold">Agendado</span>;
      default: return <span>{status}</span>;
    }
  };

  const getPaymentBadge = (payment) => {
    if (payment === 'Pagado') return <span className="text-green-600 font-medium flex items-center gap-1"><CheckCircle className="w-4 h-4"/> Pagado</span>;
    if (payment === 'Pendiente') return <span className="text-red-500 font-medium flex items-center gap-1"><Clock className="w-4 h-4"/> Pendiente</span>;
    return <span className="text-amber-600 font-medium">{payment}</span>;
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-2">{stat.trend}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Jobs Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Trabajos Recientes</h3>
          <button className="text-sm text-blue-600 font-medium hover:text-blue-800">Ver todos</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-sm uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Folio / Cliente</th>
                <th className="px-6 py-4">Servicio</th>
                <th className="px-6 py-4">Técnico Asignado</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Control de Pago</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentJobs.map((job, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{job.client}</div>
                    <div className="text-xs text-slate-500">{job.id}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{job.type}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md text-sm text-slate-700">
                      <Tool className="w-3 h-3 text-slate-400"/> {job.tech}
                    </span>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(job.status)}</td>
                  <td className="px-6 py-4 text-sm">{getPaymentBadge(job.payment)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ClientsView() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for clients
  const clients = [
    { id: 1, name: "Hotel Paraíso", phone: "(555) 123-4567", email: "contacto@hotelparaiso.com", address: "Blvd. Costero #100", status: "Activo" },
    { id: 2, name: "Familia Ruiz", phone: "(555) 987-6543", email: "ruiz.familia@gmail.com", address: "Calle Roble #45, Col. Jardines", status: "Activo" },
    { id: 3, name: "Empacadora del Norte", phone: "(555) 456-7890", email: "compras@empacadora.com", address: "Parque Industrial Lote 4", status: "Activo" },
    { id: 4, name: "Residencial Las Palmas", phone: "(555) 111-2222", email: "admin@laspalmas.com", address: "Av. Las Palmas #500", status: "Inactivo" },
    { id: 5, name: "Restaurante El Sabor", phone: "(555) 333-4444", email: "gerencia@elsabor.mx", address: "Plaza Mayor Local 12", status: "Activo" },
  ];

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isFormOpen) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-800">Registrar Nuevo Cliente</h3>
          <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nombre Completo / Razón Social</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ej. Juan Pérez o Empresa S.A." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">RFC (Opcional)</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="RFC del cliente" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Teléfono Principal</label>
                <input type="tel" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="(000) 000-0000" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Correo Electrónico</label>
                <input type="email" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="cliente@email.com" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-slate-700">Dirección Completa</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Calle, Número, Colonia, Ciudad, CP" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-slate-700">Notas Adicionales</label>
                <textarea rows="3" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Referencias de ubicación, horarios preferidos, etc."></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors">Cancelar</button>
              <button type="button" onClick={() => { alert('Cliente guardado'); setIsFormOpen(false); }} className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">Guardar Cliente</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-xl font-bold text-slate-800">Directorio de Clientes</h3>
        <button onClick={() => setIsFormOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md shadow-blue-200">
          <Users className="w-4 h-4" /> Nuevo Cliente
        </button>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50">
          <div className="relative max-w-md">
            <input 
              type="text" 
              placeholder="Buscar por nombre o correo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <div className="absolute left-3 top-2.5 text-slate-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-sm uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Nombre</th>
                <th className="px-6 py-4">Contacto</th>
                <th className="px-6 py-4">Ubicación</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{client.name}</td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="flex items-center gap-2"><Phone className="w-3 h-3"/> {client.phone}</div>
                      <div className="flex items-center gap-2 text-xs text-slate-400"><Mail className="w-3 h-3"/> {client.email}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{client.address}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${client.status === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Editar</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    No se encontraron clientes con ese criterio de búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function WorkOrdersView() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (isFormOpen) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-800">Crear Nueva Orden de Trabajo</h3>
          <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <form className="space-y-6">
            {/* Sección 1: Información del Cliente */}
            <div>
              <h4 className="text-sm uppercase tracking-wide text-slate-500 font-bold mb-4 border-b border-slate-100 pb-2">Información del Cliente</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Seleccionar Cliente</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value="">Buscar cliente existente...</option>
                    <option value="1">Hotel Paraíso</option>
                    <option value="2">Familia Ruiz</option>
                    <option value="3">Empacadora del Norte</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Ubicación del Servicio</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Confirmar dirección del servicio" />
                </div>
              </div>
            </div>

            {/* Sección 2: Detalles del Servicio */}
            <div>
              <h4 className="text-sm uppercase tracking-wide text-slate-500 font-bold mb-4 border-b border-slate-100 pb-2">Detalles del Servicio</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Tipo de Servicio</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value="">Seleccionar...</option>
                    <option value="aire">Aire Acondicionado</option>
                    <option value="linea">Línea Blanca</option>
                    <option value="electricidad">Electricidad</option>
                    <option value="plomeria">Plomería</option>
                    <option value="solar">Paneles Solares</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Prioridad</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value="normal">Normal</option>
                    <option value="alta">Alta</option>
                    <option value="urgente">Urgente</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Fecha Programada</label>
                  <input type="datetime-local" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="md:col-span-3 space-y-2">
                  <label className="text-sm font-medium text-slate-700">Descripción del Problema / Solicitud</label>
                  <textarea rows="4" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Detalles específicos del trabajo a realizar..."></textarea>
                </div>
              </div>
            </div>

            {/* Sección 3: Asignación */}
            <div>
              <h4 className="text-sm uppercase tracking-wide text-slate-500 font-bold mb-4 border-b border-slate-100 pb-2">Asignación</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Técnico Responsable</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value="">Sin asignar</option>
                    <option value="carlos">Carlos M. (Aire Acondicionado)</option>
                    <option value="roberto">Roberto G. (Línea Blanca)</option>
                    <option value="ana">Ana L. (Electricidad)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Costo Estimado (Opcional)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-500">$</span>
                    <input type="number" className="w-full pl-8 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0.00" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
              <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors">Cancelar</button>
              <button type="button" onClick={() => { alert('Orden generada exitosamente'); setIsFormOpen(false); }} className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">Generar Orden</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-800">Órdenes de Trabajo</h3>
        <button onClick={() => setIsFormOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md shadow-blue-200">
          <FileText className="w-4 h-4" /> Nueva Orden
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-sm uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Folio</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Servicio</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Prioridad</th>
                <th className="px-6 py-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-500">#ORD-202{i}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">Empresa {i} S.A.</td>
                  <td className="px-6 py-4 text-slate-600">Mantenimiento General</td>
                  <td className="px-6 py-4 text-slate-600">Oct {10+i}, 2025</td>
                  <td className="px-6 py-4"><span className="text-amber-600 font-medium text-sm">Media</span></td>
                  <td className="px-6 py-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">En Proceso</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PaymentsView() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-800">Control de Pagos y Facturación</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Ingresos del Mes</p>
          <p className="text-3xl font-bold text-green-600 mt-2">$45,200</p>
          <p className="text-xs text-slate-400 mt-1">+12% vs mes anterior</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Pendiente por Cobrar</p>
          <p className="text-3xl font-bold text-amber-500 mt-2">$12,800</p>
          <p className="text-xs text-slate-400 mt-1">5 facturas pendientes</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Gastos Operativos</p>
          <p className="text-3xl font-bold text-red-500 mt-2">$8,400</p>
          <p className="text-xs text-slate-400 mt-1">Materiales y viáticos</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h4 className="font-bold text-slate-800 mb-4">Registrar Nuevo Pago</h4>
        <div className="flex flex-col md:flex-row gap-4">
          <input type="text" placeholder="Folio de Orden" className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="number" placeholder="Monto ($)" className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <select className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option>Método de Pago...</option>
            <option>Efectivo</option>
            <option>Transferencia</option>
            <option>Tarjeta</option>
          </select>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium">Registrar</button>
        </div>
      </div>
    </div>
  );
}

function SettingsView({ darkMode, setDarkMode }) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h3 className="text-xl font-bold text-slate-800 dark:text-white">Configuración del Sistema</h3>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-colors duration-300">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Perfil de Empresa</h4>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Información general que aparece en cotizaciones y facturas.</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre de la Empresa</label>
              <input type="text" defaultValue="SERTEG Servicios Integrales" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">RFC / ID Fiscal</label>
              <input type="text" defaultValue="SER-123456-TEG" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Dirección Fiscal</label>
              <input type="text" defaultValue="Av. Principal #123, Col. Centro, Ciudad" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-lg shadow-blue-900/20">Guardar Cambios</button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-colors duration-300">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Preferencias del Sistema</h4>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Personaliza el comportamiento de la plataforma.</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-slate-800 dark:text-white">Notificaciones por Correo</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Recibir alertas de nuevos trabajos</p>
            </div>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer transition-colors"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div></div>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-slate-100 dark:border-slate-700">
            <div>
              <p className="font-medium text-slate-800 dark:text-white">Modo Oscuro</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Interfaz de alto contraste</p>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full relative transition-colors duration-300 focus:outline-none ${darkMode ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${darkMode ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- ADMIN DASHBOARD COMPONENT ---
function AdminDashboard({ onSwitchView, darkMode, setDarkMode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <DashboardHome />;
      case 'clients': return <ClientsView />;
      case 'orders': return <WorkOrdersView />;
      case 'payments': return <PaymentsView />;
      case 'settings': return <SettingsView darkMode={darkMode} setDarkMode={setDarkMode} />;
      default: return <DashboardHome />;
    }
  };

  const getTitle = () => {
    switch(activeTab) {
      case 'dashboard': return 'Resumen General';
      case 'clients': return 'Gestión de Clientes';
      case 'orders': return 'Órdenes de Trabajo';
      case 'payments': return 'Finanzas';
      case 'settings': return 'Configuración';
      default: return 'Panel Admin';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 dark:bg-slate-900 relative transition-colors duration-300">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-30 w-64 bg-slate-900 dark:bg-slate-950 text-slate-300 flex flex-col transition-transform duration-300 ease-in-out border-r border-slate-800
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between md:justify-start gap-3 text-white">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Tool className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight">SERTEG <span className="text-xs text-blue-400 block font-normal">Panel Admin</span></span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button 
            onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600/10 text-blue-400' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Tablero
          </button>
          <button 
            onClick={() => { setActiveTab('clients'); setIsSidebarOpen(false); }} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'clients' ? 'bg-blue-600/10 text-blue-400' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <Users className="w-5 h-5" /> Clientes
          </button>
          <button 
            onClick={() => { setActiveTab('orders'); setIsSidebarOpen(false); }} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'orders' ? 'bg-blue-600/10 text-blue-400' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <FileText className="w-5 h-5" /> Órdenes de Trabajo
          </button>
          <button 
            onClick={() => { setActiveTab('payments'); setIsSidebarOpen(false); }} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'payments' ? 'bg-blue-600/10 text-blue-400' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <DollarSign className="w-5 h-5" /> Control de Pagos
          </button>
          <button 
            onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'settings' ? 'bg-blue-600/10 text-blue-400' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <Settings className="w-5 h-5" /> Configuración
          </button>
        </nav>

        <div className="p-4">
          <button 
            onClick={() => { setIsSidebarOpen(false); onSwitchView(); }}
            className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" /> Volver al Sitio Web
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
        {/* Top Header */}
        <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 px-4 md:px-8 py-4 md:py-5 flex justify-between items-center sticky top-0 z-10 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white transition-colors duration-300">{getTitle()}</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900 dark:text-white transition-colors duration-300">Admin Principal</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">admin@serteg.com</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold transition-colors duration-300">
              AD
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
