import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, Camera, Check, ChevronRight, Clock3, MapPin, Menu, MessageCircle, Music2, Pause, Phone, Play, Scissors, ShieldCheck, Star, Users, X } from 'lucide-react';

const BUSINESS = {
  phoneDisplay: '+1 (340) 000-0000',
  phoneHref: '+13400000000',
  whatsappNumber: '13400000000',
  instagramUrl: '#',
  bookingUrl: '#',
  email: 'booking@reymonmobilebarber.com',
  musicUrl: '', // Add only an owned or licensed MP3 URL. Music never autoplays.
};

const text = {
  es: {
    nav: ['Inicio','Servicios','Galería','Sobre mí','Contacto'], book:'Reservar cita',
    place:'St. Thomas, Islas Vírgenes de EE. UU.', kicker:'Barbería móvil dominicana de lujo',
    titleA:'TU CORTE.', titleB:'TU TERRITORIO.',
    hero:'Servicio privado de barbería premium en tu casa, resort, hotel, villa, yate, oficina o evento. Sin filas. Sin prisa. Solo precisión.',
    whatsapp:'Reservar por WhatsApp', view:'Ver servicios', trust:['Vamos hasta ti','Equipo desinfectado','Adultos y niños'],
    servicesKicker:'Servicios concierge', servicesTitle:'Barbería de lujo, donde tú estés',
    servicesText:'Los precios reflejan traslado, preparación profesional, limpieza, servicio privado y comodidad móvil en St. Thomas.',
    reserve:'Reservar', travel:'El servicio en zonas centrales de St. Thomas está incluido. Zonas remotas, estacionamiento, yates, ferry y citas nocturnas pueden tener cargos adicionales.',
    gallery:'Galería', galleryTitle:'Detalles limpios. Resultados reales.', galleryText:'Esta galería está preparada para sustituir las imágenes por fotos reales del trabajo de Reymon.',
    about:'Sobre Reymon', aboutTitle:'Técnica dominicana con servicio concierge', aboutText:'Reymon ofrece cortes detallados y atención móvil privada para residentes, visitantes, hoteles, villas y eventos en St. Thomas.',
    points:['Casas, hoteles, villas, resorts y yates','Niños, adultos, grupos y eventos','Servicio puntual, limpio y completamente privado'],
    events:'Grupos y experiencias', eventsTitle:'Bodas, villas, yates y grupos privados', eventsText:'Cotizaciones personalizadas para bodas, sesiones de fotos, despedidas, huéspedes de villas, resorts y servicios en yate.', quote:'Solicitar cotización',
    bookingKicker:'¿Listo para una experiencia premium?', bookingTitle:'Reymon llega hasta ti', bookingText:'Elige tu servicio, ubicación, fecha y hora. Usa el enlace de reserva o escribe directamente por WhatsApp.',
    contact:'Contacto', follow:'Instagram', music:'Ambiente', noMusic:'Añade una canción con licencia en la configuración.', rights:'Todos los derechos reservados.'
  },
  en: {
    nav:['Home','Services','Gallery','About','Contact'], book:'Book appointment',
    place:'St. Thomas, US Virgin Islands', kicker:'Luxury Dominican mobile barbering',
    titleA:'YOUR CUT.', titleB:'YOUR TERRITORY.',
    hero:'Private premium barber service at your home, resort, hotel, villa, yacht, office, or event. No lines. No rush. Just precision.',
    whatsapp:'Book on WhatsApp', view:'View services', trust:['We come to you','Sanitized equipment','Adults and kids'],
    servicesKicker:'Concierge services', servicesTitle:'Luxury barbering, wherever you are',
    servicesText:'Pricing reflects travel, professional setup, sanitation, private service, and mobile convenience in St. Thomas.',
    reserve:'Book now', travel:'Central St. Thomas service is included. Remote areas, parking, yachts, ferry access, and late-night appointments may require additional fees.',
    gallery:'Gallery', galleryTitle:'Clean details. Real results.', galleryText:'This gallery is ready for Reymon’s real portfolio photos.',
    about:'About Reymon', aboutTitle:'Dominican technique with concierge service', aboutText:'Reymon provides detailed cuts and private mobile service for residents, visitors, hotels, villas, and events across St. Thomas.',
    points:['Homes, hotels, villas, resorts, and yachts','Kids, adults, groups, and events','On-time, clean, completely private service'],
    events:'Groups and experiences', eventsTitle:'Weddings, villas, yachts, and private groups', eventsText:'Custom quotes for weddings, photo shoots, bachelor parties, villa guests, resorts, and yacht service.', quote:'Request a quote',
    bookingKicker:'Ready for a premium experience?', bookingTitle:'Reymon comes to you', bookingText:'Choose your service, location, date, and time. Use the booking link or message directly on WhatsApp.',
    contact:'Contact', follow:'Instagram', music:'Ambience', noMusic:'Add a licensed song in the configuration.', rights:'All rights reserved.'
  }
};

const services = [
  ['Corte premium de hombre',"Premium men's haircut",'$75','Fade, taper, cerquillo, acabado y servicio móvil privado.','Fade, taper, lineup, finish, and private mobile service.','https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=82'],
  ['Corte + barba','Haircut + beard','$95','Corte, barba, navaja, detalles y toalla caliente.','Cut, beard, razor line, detailing, and hot towel.','https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=82'],
  ['Corte de niño','Kids cut','$55','Servicio paciente y detallado para niños de 12 años o menos.','Patient, detailed service for children age 12 and under.','https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=82'],
  ['Cerquillo premium','Premium shape up','$40','Línea frontal, cuello, contornos y acabado de precisión.','Hairline, neck, edge cleanup, and precision finish.','https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?auto=format&fit=crop&w=900&q=82'],
  ['Barba premium','Premium beard service','$45','Recorte, forma, línea, acondicionamiento y toalla caliente.','Trim, shape, lineup, conditioning, and hot towel.','https://images.unsplash.com/photo-1593702288056-ccbf5b10e960?auto=format&fit=crop&w=900&q=82'],
  ['Paquete ejecutivo','Executive package','$125','Corte, barba, toalla caliente, limpieza facial y acabado detallado.','Cut, beard, hot towel, facial cleanse, and detailed finish.','https://images.unsplash.com/photo-1532710093739-9470acff878f?auto=format&fit=crop&w=900&q=82'],
  ['Experiencia presidencial','Presidential experience','$165','Experiencia VIP completa con corte, barba, facial y acabado premium.','Complete VIP experience with cut, beard, facial, and premium finish.','https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=900&q=82'],
  ['Diseños personalizados','Custom hair designs','$25+','Líneas, figuras y diseños personalizados.','Custom lines, patterns, and freestyle designs.','https://images.unsplash.com/photo-1534080124707-1bcce7c0ecb3?auto=format&fit=crop&w=900&q=82']
];

const gallery = services.slice(0,6).map(item => item[5]);
const bookingHref = BUSINESS.bookingUrl !== '#' ? BUSINESS.bookingUrl : `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent('Hola Reymon, quiero reservar una cita de barbería móvil premium.')}`;

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
      <div className="header-actions"><button className="language" onClick={()=>setLang(lang==='es'?'en':'es')}><b className={lang==='es'?'active':''}>ES</b>/<b className={lang==='en'?'active':''}>EN</b></button><a className="button gold desktop-book" href={bookingHref} target="_blank" rel="noreferrer">{t.book}</a><button className="menu-button" onClick={()=>setMenu(true)} aria-label="Open menu"><Menu/></button></div>
    </header>
    <aside className={menu?'mobile-menu open':'mobile-menu'}><div><img src="/reymon-logo.svg" alt=""/><button onClick={()=>setMenu(false)} aria-label="Close menu"><X/></button></div>{ids.map((id,i)=><a key={id} href={`#${id}`} onClick={()=>setMenu(false)}>{t.nav[i]}<ChevronRight/></a>)}<a className="button gold" href={bookingHref}>{t.book}</a></aside>

    <main>
      <section className="hero" id="home"><div className="hero-shade"/><div className="hero-copy"><span className="pill"><MapPin size={16}/>{t.place}</span><p className="kicker">{t.kicker}</p><h1>{t.titleA}<span>{t.titleB}</span></h1><p>{t.hero}</p><div className="buttons"><a className="button gold" href={`https://wa.me/${BUSINESS.whatsappNumber}`} target="_blank" rel="noreferrer"><MessageCircle/>{t.whatsapp}</a><a className="button outline" href="#services"><Scissors/>{t.view}</a></div><div className="trust">{t.trust.map(x=><span key={x}><Check/>{x}</span>)}</div></div></section>

      <section className="section" id="services"><div className="heading"><p className="kicker">{t.servicesKicker}</p><h2>{t.servicesTitle}</h2><p>{t.servicesText}</p></div><div className="service-grid">{services.map((s,i)=><article className={i===1?'service-card featured':'service-card'} key={s[1]}>{i===1&&<em>POPULAR</em>}<img src={s[5]} alt={lang==='es'?s[0]:s[1]}/><div><header><h3>{lang==='es'?s[0]:s[1]}</h3><strong>{s[2]}</strong></header><p>{lang==='es'?s[3]:s[4]}</p><a href={bookingHref}>{t.reserve}<ChevronRight/></a></div></article>)}</div><p className="travel">{t.travel}</p></section>

      <section className="feature-strip"><span><Clock3/>Flexible</span><span><MapPin/>St. Thomas</span><span><ShieldCheck/>Private</span><span><Star/>Luxury</span></section>

      <section className="section gallery-section" id="gallery"><div className="heading left"><p className="kicker">{t.gallery}</p><h2>{t.galleryTitle}</h2><p>{t.galleryText}</p></div><div className="gallery-grid">{gallery.map((src,i)=><img key={src} src={src} alt={`${t.gallery} ${i+1}`}/>)}</div></section>

      <section className="section about" id="about"><img src="/reymon-logo.svg" alt="Reymon Mobile Barber"/><div><p className="kicker">{t.about}</p><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p><ul>{t.points.map(x=><li key={x}><Check/>{x}</li>)}</ul></div></section>

      <section className="events"><div><p className="kicker">{t.events}</p><h2>{t.eventsTitle}</h2><p>{t.eventsText}</p></div><a className="button gold" href={`https://wa.me/${BUSINESS.whatsappNumber}`}><Users/>{t.quote}</a></section>

      <section className="booking"><div><p className="kicker">{t.bookingKicker}</p><h2>{t.bookingTitle}</h2><p>{t.bookingText}</p></div><div><a className="button dark" href={bookingHref}><CalendarDays/>{t.book}</a><a className="button light" href={`https://wa.me/${BUSINESS.whatsappNumber}`}><MessageCircle/>WhatsApp</a></div></section>
    </main>

    <footer id="contact"><div className="footer-brand"><img src="/reymon-logo.svg" alt=""/><strong>REYMON MOBILE BARBER</strong><span>{t.place}</span></div><div className="footer-links"><h3>{t.contact}</h3><a href={`tel:${BUSINESS.phoneHref}`}><Phone/>{BUSINESS.phoneDisplay}</a><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a><a href={BUSINESS.instagramUrl}><Camera/>{t.follow}</a></div><div className="music"><h3><Music2/>{t.music}</h3><button onClick={toggleMusic} disabled={!BUSINESS.musicUrl}>{playing?<Pause/>:<Play/>}{BUSINESS.musicUrl?(playing?'Pause':'Play'):t.noMusic}</button>{BUSINESS.musicUrl&&<audio ref={audio} src={BUSINESS.musicUrl} onEnded={()=>setPlaying(false)}/>}</div><small>© {new Date().getFullYear()} Reymon Mobile Barber. {t.rights}</small></footer>
  </div>
}
