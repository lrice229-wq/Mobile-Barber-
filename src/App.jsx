import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, Camera, Check, ChevronRight, Clock3, MapPin, Menu, MessageCircle, Music2, Pause, Phone, Play, Scissors, ShieldCheck, Sparkles, Star, Users, X } from 'lucide-react';

const BUSINESS = {
  phoneDisplay: '+1 (340) 000-0000',
  phoneHref: '+13400000000',
  whatsappNumber: '13400000000',
  instagramUrl: '#',
  bookingUrl: '#',
  email: 'booking@reymonmobilebarber.com',
  musicUrl: '', // Add a licensed MP3 URL. Music never autoplays.
};

const text = {
  es: {
    nav: ['Inicio','Servicios','Galería','Sobre mí','Contacto'], book:'Reservar cita',
    place:'St. Thomas, Islas Vírgenes de EE. UU.', kicker:'Barbería móvil dominicana',
    titleA:'TU CORTE.', titleB:'TU TERRITORIO.',
    hero:'Servicio de barbería premium en tu casa, hotel, villa, oficina o evento. Sin filas. Sin prisa. Solo precisión.',
    whatsapp:'Reservar por WhatsApp', view:'Ver servicios', trust:['Vamos hasta ti','Equipo desinfectado','Adultos y niños'],
    servicesKicker:'Servicios y precios', servicesTitle:'Calidad de barbería, comodidad de casa',
    servicesText:'El precio incluye traslado, preparación profesional, limpieza y atención privada en St. Thomas.',
    reserve:'Reservar', travel:'El servicio central en St. Thomas está incluido. Zonas remotas, estacionamiento, citas nocturnas o acceso por ferry pueden tener cargos adicionales.',
    gallery:'Galería', galleryTitle:'Detalles limpios. Resultados reales.', galleryText:'Galería preparada para sustituir estas imágenes por fotos reales del trabajo de Reymon.',
    about:'Sobre Reymon', aboutTitle:'Técnica dominicana con estándar de isla', aboutText:'Reymon ofrece cortes detallados y servicio móvil profesional para residentes y visitantes de St. Thomas.',
    points:['Casas, hoteles, villas y oficinas','Niños, adultos, grupos y eventos','Servicio puntual, limpio y privado'],
    events:'Grupos y eventos', eventsTitle:'Bodas, villas y grupos privados', eventsText:'Cotizaciones personalizadas para bodas, sesiones de fotos, despedidas y huéspedes de villas.', quote:'Solicitar cotización',
    bookingKicker:'¿Listo para un corte fresco?', bookingTitle:'Reymon llega hasta ti', bookingText:'Elige tu servicio, ubicación, fecha y hora. Usa el enlace de reserva o escribe directamente por WhatsApp.',
    contact:'Contacto', follow:'Instagram', music:'Ambiente', noMusic:'Añade una canción con licencia en la configuración.', rights:'Todos los derechos reservados.'
  },
  en: {
    nav:['Home','Services','Gallery','About','Contact'], book:'Book appointment',
    place:'St. Thomas, US Virgin Islands', kicker:'Dominican mobile barbering',
    titleA:'YOUR CUT.', titleB:'YOUR TERRITORY.',
    hero:'Premium barber service at your home, hotel, villa, office, or event. No lines. No rush. Just precision.',
    whatsapp:'Book on WhatsApp', view:'View services', trust:['We come to you','Sanitized equipment','Adults and kids'],
    servicesKicker:'Services and pricing', servicesTitle:'Barbershop quality, at-home convenience',
    servicesText:'Pricing includes travel, professional setup, sanitation, and private service in St. Thomas.',
    reserve:'Book now', travel:'Central St. Thomas service is included. Remote areas, parking, late-night appointments, or ferry access may require additional fees.',
    gallery:'Gallery', galleryTitle:'Clean details. Real results.', galleryText:'Gallery prepared for Reymon’s real portfolio photos.',
    about:'About Reymon', aboutTitle:'Dominican technique with an island standard', aboutText:'Reymon provides detailed cuts and professional mobile service for St. Thomas residents and visitors.',
    points:['Homes, hotels, villas, and offices','Kids, adults, groups, and events','On-time, clean, private service'],
    events:'Groups and events', eventsTitle:'Weddings, villas, and private groups', eventsText:'Custom quotes for weddings, photo shoots, bachelor parties, and villa guests.', quote:'Request a quote',
    bookingKicker:'Ready for a fresh cut?', bookingTitle:'Reymon comes to you', bookingText:'Choose your service, location, date, and time. Use the booking link or message directly on WhatsApp.',
    contact:'Contact', follow:'Instagram', music:'Ambience', noMusic:'Add a licensed song in the configuration.', rights:'All rights reserved.'
  }
};

const services = [
  ['Corte de hombre',"Men's haircut",'$60','Fade, taper, cerquillo y acabado.','Fade, taper, lineup, and finish.','https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=82'],
  ['Corte + barba','Haircut + beard','$85','Corte, barba, navaja y toalla caliente.','Cut, beard, razor line, and hot towel.','https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=82'],
  ['Corte de niño','Kids cut','$45','Para niños de 12 años o menos.','For children age 12 and under.','https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=82'],
  ['Cerquillo','Shape up','$35','Línea frontal, cuello y contornos.','Hairline, neck, and edge cleanup.','https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?auto=format&fit=crop&w=900&q=82'],
  ['Barba premium','Premium beard service','$40','Recorte, forma, línea y acondicionamiento.','Trim, shape, lineup, and conditioning.','https://images.unsplash.com/photo-1593702288056-ccbf5b10e960?auto=format&fit=crop&w=900&q=82'],
  ['Paquete ejecutivo','Executive package','$105','Corte, barba, toalla caliente y facial.','Cut, beard, hot towel, and facial.','https://images.unsplash.com/photo-1532710093739-9470acff878f?auto=format&fit=crop&w=900&q=82'],
  ['Tratamiento presidencial','Presidential treatment','$135','Servicio VIP completo y acabado detallado.','Complete VIP service and detailed finish.','https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=900&q=82'],
  ['Diseños','Hair designs','$20+','Líneas y diseños personalizados.','Custom lines and freestyle designs.','https://images.unsplash.com/photo-1534080124707-1bcce7c0ecb3?auto=format&fit=crop&w=900&q=82']
];

const gallery = services.slice(0,6).map(item => item[5]);
const bookingHref = BUSINESS.bookingUrl !== '#' ? BUSINESS.bookingUrl : `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent('Hola Reymon, quiero reservar una cita de barbería móvil.')}`;

export default function App(){
  const [lang,setLang]=useState('es');
  const [menu,setMenu]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const [playing,setPlaying]=useState(false);
  const audio=useRef(null);
  const t=text[lang];
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>18);fn();window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn)},[]);
  const toggleMusic=async()=>{if(!BUSINESS.musicUrl||!audio.current)return;if(playing){audio.current.pause();setPlaying(false)}else{await audio.current.play();setPlaying(true)}};
  const ids=['home','services','gallery','about','contact'];
  return <div className="site-shell">
    <header className={scrolled?'header scrolled':'header'}>
      <a className="brand" href="#home"><img src="/reymon-logo.svg" alt="Reymon Mobile Barber"/><div><strong>REYMON</strong><span>MOBILE BARBER</span></div></a>
      <nav className="desktop-nav">{ids.map((id,i)=><a key={id} href={`#${id}`}>{t.nav[i]}</a>)}</nav>
      <div className="header-actions"><button className="language" onClick={()=>setLang(lang==='es'?'en':'es')}><b className={lang==='es'?'active':''}>ES</b>/<b className={lang==='en'?'active':''}>EN</b></button><a className="button gold desktop-book" href={bookingHref} target="_blank" rel="noreferrer">{t.book}</a><button className="menu-button" onClick={()=>setMenu(true)}><Menu/></button></div>
    </header>
    <aside className={menu?'mobile-menu open':'mobile-menu'}><div><img src="/reymon-logo.svg" alt=""/><button onClick={()=>setMenu(false)}><X/></button></div>{ids.map((id,i)=><a key={id} href={`#${id}`} onClick={()=>setMenu(false)}>{t.nav[i]}<ChevronRight/></a>)}<a className="button gold" href={bookingHref}>{t.book}</a></aside>

    <main>
      <section className="hero" id="home"><div className="hero-shade"/><div className="hero-copy"><span className="pill"><MapPin size={16}/>{t.place}</span><p className="kicker">{t.kicker}</p><h1>{t.titleA}<span>{t.titleB}</span></h1><p>{t.hero}</p><div className="buttons"><a className="button gold" href={`https://wa.me/${BUSINESS.whatsappNumber}`} target="_blank" rel="noreferrer"><MessageCircle/>{t.whatsapp}</a><a className="button outline" href="#services"><Scissors/>{t.view}</a></div><div className="trust">{t.trust.map(x=><span key={x}><Check/>{x}</span>)}</div></div></section>

      <section className="section" id="services"><div className="heading"><p className="kicker">{t.servicesKicker}</p><h2>{t.servicesTitle}</h2><p>{t.servicesText}</p></div><div className="service-grid">{services.map((s,i)=><article className={i===1?'service-card featured':'service-card'} key={s[1]}>{i===1&&<em>POPULAR</em>}<img src={s[5]} alt={lang==='es'?s[0]:s[1]}/><div><header><h3>{lang==='es'?s[0]:s[1]}</h3><strong>{s[2]}</strong></header><p>{lang==='es'?s[3]:s[4]}</p><a href={bookingHref}>{t.reserve}<ChevronRight/></a></div></article>)}</div><p className="travel">{t.travel}</p></section>

      <section className="feature-strip"><span><Clock3/>Flexible</span><span><MapPin/>St. Thomas</span><span><ShieldCheck/>Clean</span><span><Star/>Premium</span></section>

      <section className="section gallery-section" id="gallery"><div className="heading left"><p className="kicker">{t.gallery}</p><h2>{t.galleryTitle}</h2><p>{t.galleryText}</p></div><div className="gallery-grid">{gallery.map((src,i)=><img key={src} src={src} alt={`${t.gallery} ${i+1}`}/>)}</div></section>

      <section className="section about" id="about"><img src="/reymon-logo.svg" alt="Reymon Mobile Barber"/><div><p className="kicker">{t.about}</p><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p><ul>{t.points.map(x=><li key={x}><Check/>{x}</li>)}</ul></div></section>

      <section className="events"><div><p className="kicker">{t.events}</p><h2>{t.eventsTitle}</h2><p>{t.eventsText}</p></div><a className="button gold" href={`https://wa.me/${BUSINESS.whatsappNumber}`}><Users/>{t.quote}</a></section>

      <section className="booking"><div><p className="kicker">{t.bookingKicker}</p><h2>{t.bookingTitle}</h2><p>{t.bookingText}</p></div><div><a className="button dark" href={bookingHref}><CalendarDays/>{t.book}</a><a className="button light" href={`https://wa.me/${BUSINESS.whatsappNumber}`}><MessageCircle/>WhatsApp</a></div></section>
    </main>

    <footer id="contact"><div className="footer-brand"><img src="/reymon-logo.svg" alt=""/><strong>REYMON MOBILE BARBER</strong><span>{t.place}</span></div><div className="footer-links"><h3>{t.contact}</h3><a href={`tel:${BUSINESS.phoneHref}`}><Phone/>{BUSINESS.phoneDisplay}</a><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a><a href={BUSINESS.instagramUrl}><Camera/>{t.follow}</a></div><div className="music"><h3><Music2/>{t.music}</h3><button onClick={toggleMusic} disabled={!BUSINESS.musicUrl}>{playing?<Pause/>:<Play/>}{BUSINESS.musicUrl?(playing?'Pause':'Play'):t.noMusic}</button>{BUSINESS.musicUrl&&<audio ref={audio} src={BUSINESS.musicUrl} onEnded={()=>setPlaying(false)}/>}</div><small>© {new Date().getFullYear()} Reymon Mobile Barber. {t.rights}</small></footer>
  </div>
}
