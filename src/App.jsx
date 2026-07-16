import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, Camera, Check, ChevronRight, Clock3, Hotel, House, MapPin, Menu, MessageCircle, Music2, Pause, Phone, Play, Scissors, ShieldCheck, Ship, Star, Users, X } from 'lucide-react';

const BUSINESS = {
  phoneDisplay: '+1 (340) 000-0000',
  phoneHref: '+13400000000',
  whatsappNumber: '13400000000',
  instagramUrl: '#',
  bookingUrl: '#',
  email: 'booking@reymonmobilebarber.com',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=St.+Thomas+USVI',
  musicUrl: '',
};

const copy = {
  es: {
    nav:['Inicio','Servicios','Galería','Experiencias','Contacto'], book:'Reservar cita', place:'St. Thomas, Islas Vírgenes de EE. UU.',
    kicker:'Barbería móvil dominicana de lujo', titleA:'TU BARBERO.', titleB:'TU LUGAR.',
    hero:'Servicio privado en tu residencia, hotel, villa, yate, oficina o evento. Precisión dominicana con comodidad de concierge.',
    whatsapp:'Reservar por WhatsApp', view:'Ver precios', trust:['Vamos hasta ti','Equipo desinfectado','Adultos y niños'],
    servicesKicker:'Servicios premium', servicesTitle:'La barbería llega hasta ti', servicesText:'Los precios reflejan traslado, preparación, limpieza y atención privada en St. Thomas.',
    reserve:'Reservar', travel:'Servicio en el área central de St. Thomas incluido. Zonas remotas, estacionamiento, ferry y horarios nocturnos pueden tener cargos adicionales.',
    gallery:'Galería', galleryTitle:'Detalles limpios. Presencia impecable.', galleryText:'Espacio preparado para las fotos reales del trabajo de Reymon.',
    experiences:'Elige tu experiencia', experiencesTitle:'Servicio diseñado para tu estadía',
    audience:['Estoy en un hotel o resort','Estoy en una villa o Airbnb','Soy residente local','Necesito servicio para yate o evento'],
    reviews:'Reseñas', reviewsTitle:'Servicio privado que se nota', reviewNote:'Marcadores para futuras reseñas verificadas de Google.',
    about:'Sobre Reymon', aboutTitle:'Técnica dominicana con estándar de isla', aboutText:'Reymon ofrece cortes detallados y servicio móvil profesional para residentes y visitantes de St. Thomas.',
    points:['Casas, hoteles, villas, yates y oficinas','Niños, adultos, bodas y grupos','Servicio puntual, limpio y privado'],
    events:'Grupos y eventos', eventsTitle:'Bodas, villas y grupos privados', eventsText:'Cotizaciones personalizadas para bodas, sesiones de fotos, despedidas, yates y huéspedes de villas.', quote:'Solicitar cotización',
    bookingKicker:'¿Listo para verte impecable?', bookingTitle:'Reymon llega hasta ti', bookingText:'Selecciona tu servicio y ubicación. Usa el enlace de reserva o escribe directamente por WhatsApp.',
    contact:'Contacto', follow:'Instagram', music:'Ambiente', noMusic:'Música opcional disponible al añadir una pista con licencia.', map:'Ver área de servicio', rights:'Todos los derechos reservados.'
  },
  en: {
    nav:['Home','Services','Gallery','Experiences','Contact'], book:'Book appointment', place:'St. Thomas, US Virgin Islands',
    kicker:'Luxury Dominican mobile barbering', titleA:'YOUR BARBER.', titleB:'YOUR LOCATION.',
    hero:'Private service at your residence, hotel, villa, yacht, office, or event. Dominican precision with concierge convenience.',
    whatsapp:'Book on WhatsApp', view:'View pricing', trust:['We come to you','Sanitized equipment','Adults and kids'],
    servicesKicker:'Premium services', servicesTitle:'The barbershop comes to you', servicesText:'Pricing reflects travel, setup, sanitation, and private service throughout St. Thomas.',
    reserve:'Book now', travel:'Central St. Thomas service is included. Remote areas, parking, ferry access, and late-night appointments may require additional fees.',
    gallery:'Gallery', galleryTitle:'Clean details. Impeccable presence.', galleryText:'Ready for Reymon’s real portfolio photos.',
    experiences:'Choose your experience', experiencesTitle:'Service designed around your stay',
    audience:['I am at a hotel or resort','I am at a villa or Airbnb','I am a local resident','I need yacht or event service'],
    reviews:'Reviews', reviewsTitle:'Private service people remember', reviewNote:'Placeholders for future verified Google reviews.',
    about:'About Reymon', aboutTitle:'Dominican technique with an island standard', aboutText:'Reymon provides detailed cuts and professional mobile service for St. Thomas residents and visitors.',
    points:['Homes, hotels, villas, yachts, and offices','Kids, adults, weddings, and groups','On-time, clean, private service'],
    events:'Groups and events', eventsTitle:'Weddings, villas, and private groups', eventsText:'Custom quotes for weddings, photo shoots, bachelor parties, yachts, and villa guests.', quote:'Request a quote',
    bookingKicker:'Ready to look impeccable?', bookingTitle:'Reymon comes to you', bookingText:'Choose your service and location. Use the booking link or message directly on WhatsApp.',
    contact:'Contact', follow:'Instagram', music:'Ambience', noMusic:'Optional music is available after adding a licensed track.', map:'View service area', rights:'All rights reserved.'
  }
};

const services = [
  ['Corte premium de hombre',"Premium men's haircut",'$75','Fade, taper, cerquillo y acabado personalizado.','Fade, taper, lineup, and personalized finish.','https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=84'],
  ['Corte + barba','Haircut + beard','$95','Corte, barba, navaja y toalla caliente.','Cut, beard, razor line, and hot towel.','https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=84'],
  ['Corte de niño','Kids cut','$55','Para niños de 12 años o menos.','For children age 12 and under.','https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=84'],
  ['Cerquillo premium','Premium shape up','$40','Línea frontal, cuello y contornos.','Hairline, neck, and edge cleanup.','https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?auto=format&fit=crop&w=900&q=84'],
  ['Barba premium','Premium beard service','$45','Recorte, forma, línea y acondicionamiento.','Trim, shape, lineup, and conditioning.','https://images.unsplash.com/photo-1593702288056-ccbf5b10e960?auto=format&fit=crop&w=900&q=84'],
  ['Paquete ejecutivo','Executive package','$125','Corte, barba, toalla caliente y facial.','Cut, beard, hot towel, and facial.','https://images.unsplash.com/photo-1532710093739-9470acff878f?auto=format&fit=crop&w=900&q=84'],
  ['Experiencia presidencial','Presidential experience','$165','Servicio VIP completo con acabado detallado.','Complete VIP service with a detailed finish.','https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=900&q=84'],
  ['Diseños personalizados','Custom hair designs','$25+','Líneas y diseños personalizados.','Custom lines and freestyle designs.','https://images.unsplash.com/photo-1534080124707-1bcce7c0ecb3?auto=format&fit=crop&w=900&q=84']
];

const gallery = services.slice(0,6).map(item=>item[5]);
const bookingHref = BUSINESS.bookingUrl !== '#' ? BUSINESS.bookingUrl : `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent('Hola Reymon, quiero reservar una cita de barbería móvil.')}`;
const audienceIcons=[Hotel,House,Users,Ship];

export default function App(){
  const [lang,setLang]=useState('es'); const [menu,setMenu]=useState(false); const [scrolled,setScrolled]=useState(false); const [playing,setPlaying]=useState(false); const audio=useRef(null); const t=copy[lang];
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>18);fn();window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn)},[]);
  const toggleMusic=async()=>{if(!BUSINESS.musicUrl||!audio.current)return;if(playing){audio.current.pause();setPlaying(false)}else{await audio.current.play();setPlaying(true)}};
  const ids=['home','services','gallery','experiences','contact'];
  return <div className="site-shell">
    <header className={scrolled?'header scrolled':'header'}><a className="brand" href="#home"><img src="/reymon-logo.svg" alt="Reymon Mobile Barber"/><div><strong>REYMON</strong><span>MOBILE BARBER</span></div></a><nav className="desktop-nav">{ids.map((id,i)=><a key={id} href={`#${id}`}>{t.nav[i]}</a>)}</nav><div className="header-actions"><button className="language" onClick={()=>setLang(lang==='es'?'en':'es')}><b className={lang==='es'?'active':''}>ES</b>/<b className={lang==='en'?'active':''}>EN</b></button><a className="button gold desktop-book" href={bookingHref}>{t.book}</a><button className="menu-button" onClick={()=>setMenu(true)} aria-label="Menu"><Menu/></button></div></header>
    <aside className={menu?'mobile-menu open':'mobile-menu'}><div><img src="/reymon-logo.svg" alt=""/><button onClick={()=>setMenu(false)} aria-label="Close"><X/></button></div>{ids.map((id,i)=><a key={id} href={`#${id}`} onClick={()=>setMenu(false)}>{t.nav[i]}<ChevronRight/></a>)}<a className="button gold" href={bookingHref}>{t.book}</a></aside>
    <main>
      <section className="hero" id="home"><div className="hero-shade"/><div className="hero-copy"><span className="pill"><MapPin size={16}/>{t.place}</span><p className="kicker">{t.kicker}</p><h1>{t.titleA}<span>{t.titleB}</span></h1><p>{t.hero}</p><div className="buttons"><a className="button gold" href={`https://wa.me/${BUSINESS.whatsappNumber}`}><MessageCircle/>{t.whatsapp}</a><a className="button outline" href="#services"><Scissors/>{t.view}</a></div><div className="trust">{t.trust.map(x=><span key={x}><Check/>{x}</span>)}</div></div></section>
      <section className="section" id="services"><div className="heading"><p className="kicker">{t.servicesKicker}</p><h2>{t.servicesTitle}</h2><p>{t.servicesText}</p></div><div className="service-grid">{services.map((s,i)=><article className={i===1?'service-card featured':'service-card'} key={s[1]}>{i===1&&<em>POPULAR</em>}<img src={s[5]} alt={lang==='es'?s[0]:s[1]}/><div><header><h3>{lang==='es'?s[0]:s[1]}</h3><strong>{s[2]}</strong></header><p>{lang==='es'?s[3]:s[4]}</p><a href={bookingHref}>{t.reserve}<ChevronRight/></a></div></article>)}</div><p className="travel">{t.travel}</p></section>
      <section className="feature-strip"><span><Clock3/>Flexible</span><span><MapPin/>St. Thomas</span><span><ShieldCheck/>Clean</span><span><Star/>Premium</span></section>
      <section className="section gallery-section" id="gallery"><div className="heading left"><p className="kicker">{t.gallery}</p><h2>{t.galleryTitle}</h2><p>{t.galleryText}</p></div><div className="gallery-grid">{gallery.map((src,i)=><img key={src} src={src} alt={`${t.gallery} ${i+1}`}/>)}</div></section>
      <section className="section experience-section" id="experiences"><div className="heading"><p className="kicker">{t.experiences}</p><h2>{t.experiencesTitle}</h2></div><div className="experience-grid">{t.audience.map((label,i)=>{const Icon=audienceIcons[i];return <a href={bookingHref} className="experience-card" key={label}><Icon/><span>{label}</span><ChevronRight/></a>})}</div></section>
      <section className="section reviews"><div className="heading"><p className="kicker">{t.reviews}</p><h2>{t.reviewsTitle}</h2><p>{t.reviewNote}</p></div><div className="review-grid">{[1,2,3].map(n=><article key={n}><div className="stars">★★★★★</div><p>“Servicio profesional, puntual y privado. Exactamente lo que buscábamos durante nuestra estadía.”</p><strong>Cliente verificado</strong></article>)}</div></section>
      <section className="section about"><img src="/reymon-logo.svg" alt="Reymon Mobile Barber"/><div><p className="kicker">{t.about}</p><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p><ul>{t.points.map(x=><li key={x}><Check/>{x}</li>)}</ul></div></section>
      <section className="events"><div><p className="kicker">{t.events}</p><h2>{t.eventsTitle}</h2><p>{t.eventsText}</p></div><a className="button gold" href={`https://wa.me/${BUSINESS.whatsappNumber}`}><Users/>{t.quote}</a></section>
      <section className="booking"><div><p className="kicker">{t.bookingKicker}</p><h2>{t.bookingTitle}</h2><p>{t.bookingText}</p></div><div><a className="button dark" href={bookingHref}><CalendarDays/>{t.book}</a><a className="button light" href={`https://wa.me/${BUSINESS.whatsappNumber}`}><MessageCircle/>WhatsApp</a></div></section>
    </main>
    <a className="floating-whatsapp" href={`https://wa.me/${BUSINESS.whatsappNumber}`} aria-label="WhatsApp"><MessageCircle/></a>
    <footer id="contact"><div className="footer-brand"><img src="/reymon-logo.svg" alt=""/><strong>REYMON MOBILE BARBER</strong><span>{t.place}</span></div><div className="footer-links"><h3>{t.contact}</h3><a href={`tel:${BUSINESS.phoneHref}`}><Phone/>{BUSINESS.phoneDisplay}</a><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a><a href={BUSINESS.instagramUrl}><Camera/>{t.follow}</a><a href={BUSINESS.mapUrl}><MapPin/>{t.map}</a></div><div className="music"><h3><Music2/>{t.music}</h3><button onClick={toggleMusic} disabled={!BUSINESS.musicUrl}>{playing?<Pause/>:<Play/>}{BUSINESS.musicUrl?(playing?'Pause':'Play'):t.noMusic}</button>{BUSINESS.musicUrl&&<audio ref={audio} src={BUSINESS.musicUrl} onEnded={()=>setPlaying(false)}/>}</div><small>© {new Date().getFullYear()} Reymon Mobile Barber. {t.rights}</small></footer>
  </div>
}
