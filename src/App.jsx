import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Gift, Clock, CheckCircle2, Calendar, Music, Map, CheckSquare, Square, Sparkles, Quote } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- CONFIGURAZIONE DATE (Fuso Orario Italiano) ---
const DATA_INIZIO = "2023-06-19T00:00:00"; 
const DATA_SAN_VALENTINO = "2026-02-14T00:00:00"; 
const DATA_COMPLEANNO = { mese: 4, g: 25 }; 
const DATA_ANNIVERSARIO = { mese: 5, g: 19 }; 

// --- FRASI DEL GIORNO ---
const DAILY_PHRASES = [
  "Il vero amore è vedere una persona imperfetta perfettamente.",
  "L'amore fa uscire la tua anima dal suo nascondiglio.",
  "Sei l'unico e solo amore della mia vita.",
  "Sei il regalo più grande che abbia mai ricevuto.",
  "Non voglio mai smettere di creare ricordi con te.",
  "Se so cos'è l'amore, è grazie a te.",
  "Se avessi un fiore per ogni volta che ho pensato a te, potrei camminare nel mio giardino per sempre.",
  "Sei il mio posto felice.",
  "Un milione di volte, ti sceglierò sempre.",
  "Sei l'amore della mia vita e la luce del mio amore.",
  "Casa è ovunque io sia con te.",
  "Tutti i miei giorni migliori sono quelli trascorsi con te.",
  "Pensare a te mi tiene sveglio. Sognare di te mi fa dormire. Stare con te mi tiene in vita.",
  "L'amore è composto da un'unica anima che abita due corpi.",
  "Una parola ci libera da tutto il peso e il dolore della vita: quella parola è amore. (Sofocle)",
  "Non puoi incolpare la gravità per l'innamoramento. (Albert Einstein)",
  "Se tu vivi fino a cent'anni, io voglio vivere fino a cento meno un giorno così non dovrò mai vivere senza di te. (A.A. Milne)",
  "Perché il vero amore è inesauribile: più dai, più hai. (Antoine de Saint-Exupéry)",
  "Invecchia con me: il meglio deve ancora venire. (Robert Browning)",
  "Sembra che ti abbia amato in innumerevoli forme, innumerevoli volte, vita dopo vita, età dopo età per sempre. (Rabindranath Tagore)",
  "Se so cos'è l'amore, è grazie a te. (Herman Hesse)",
  "È stato amore a prima vista, a ultima vista, a eterna vista. (Vladimir Nabokov)",
  "L'amore è essere stupidi insieme. (Paul Valery)",
  "Non ti sto dicendo che sarà facile, ti sto dicendo che ne varrà la pena. (Art Williams)",
  "Gli innamorati non si incontrano finalmente da qualche parte. Sono l'uno nell'altro per tutto il tempo. (Rumi)",
  "L'amore è tutto. Noi siamo solo pezzi. (Rumi)",
  "Preferirei dividere una sola vita con te piuttosto che affrontare tutte le ere di questo mondo da solo. (J.R.R. Tolkien)",
  "Non ci sono addii per noi: ovunque tu sia, sarai sempre nel mio cuore. (Mahatma Gandhi)",
  "Se ti ricordi di me, allora non mi importa se tutti gli altri dimenticano. (Haruki Murakami)",
  "Vorrei che tu sapessi che sei stato l'ultimo sogno della mia anima. (Charles Dickens)",
  "Sono solo una ragazza, in piedi di fronte a un ragazzo, che gli chiede di amarla. (Notting Hill)",
  "Il cuore non è come una scatola che si riempie: più ami e più il cuore si espande. (Her)",
  "Sei la mia più grande avventura. (Up)",
  "Il nostro amore è come il vento. Non riesco a vederlo, ma posso sentirlo. (I passi dell'amore)",
  "Non mi ricordo di dimenticarti. (Memento)",
  "Mi piaci molto. Così come sei. (Il diario di Bridget Jones)",
  "Voglio tutto da te, per sempre, io e te ogni giorno. (Le pagine della nostra vita)",
  "Per me, sei perfetta. (Love Actually)",
  "Quando ti rendi conto che vuoi passare il resto della tua vita con qualcuno, vuoi che il resto della tua vita inizi il prima possibile. (Harry ti presento Sally)",
  "La cosa più grande che tu possa imparare è amare e lasciarti amare. (Moulin Rouge)",
  "Dicono che quando incontri l'amore della tua vita, il tempo si ferma. (Big Fish)",
  "Prendi la mia mano, prendi anche tutta la mia vita. (Elvis Presley)",
  "Hai l'amore di cui ho bisogno per sopravvivere. (Florence + The Machine)",
  "L'amore è stato creato per me e per te. (Nat King Cole)",
  "Tutto di me ama tutto di te. (John Legend)",
  "Ho bisogno di te come un cuore ha bisogno di un battito. (One Republic)",
  "Amare significa dover chiedere scusa ogni quindici minuti. (John Lennon)",
  "Mi senti meraviglioso perché vedo la luce dell'amore nei tuoi occhi. (Eric Clapton)",
  "Sei nell'anima e lì ti lascio per sempre, sei in ogni parte di me. (Gianna Nannini)",
  "Voglio che tutto intorno ci sia solo la vita per me: voglio te, notte e giorno. (Cesare Cremonini)",
  "Il vero amore può nascondersi, confondersi, ma non può perdersi mai. (Francesco De Gregori)"
];

const BUCKET_LIST = [
  { id: 101, task: "Fidanzato ti crea un app" },
  { id: 103, task: "Vedere l'aurora boreale" },
  { id: 105, task: "Adottare una piantina e farla sopravvivere" },
  { id: 106, task: "Andare a un concerto insieme" },
  { id: 107, task: "Maratona Harry Potter in un weekend" },
  { id: 108, task: "Fare un tatuaggio insieme" },
  { id: 109, task: "Viaggio in Giappone" },
  { id: 110, task: "Cucinare un piatto gourmet insieme" },
  { id: 111, task: "Laurearsi" },
  { id: 112, task: "Viaggio in Thailandia" },
  { id: 113, task: "Sposarsi" },
  { id: 114, task: "Fare paracadutismo" },
  { id: 115, task: "Fare immersioni" },
  { id: 116, task: "Picchiare qualcuno" },
  { id: 117, task: "Adottare un altro Cocker" },
];

const COUPONS = [
  { id: 1, title: "Jolly 'Ho Ragione Io'", icon: "⚖️", desc: "Vinci qualsiasi discussione all'istante." },
  { id: 2, title: "Veto sul Ristorante", icon: "🍕", desc: "Scegli tu dove mangiare senza lamentele." },
  { id: 3, title: "Esonero Faccende", icon: "🧹", desc: "Io lavoro, tu mi guardi dal divano." },
  { id: 4, title: "Update Prioritario", icon: "🚀", desc: "Ogni tua richiesta ha la priorità per un'ora." },
  { id: 5, title: "Immunità da Solletici per Procrastinamento", icon: "🛡️", desc: "Protezione totale per 24 ore." },
  { id: 6, title: "Scelta Serie TV", icon: "📺", desc: "Scegli tu e io prometto di non addormentarmi." },
];

const PeonyFlower = ({ delay }) => {
  const [config] = useState(() => ({
    x: Math.random() * 100,
    rotation: Math.random() * 360,
    duration: Math.random() * 10 + 15,
    size: Math.random() * 30 + 40,
    img: Math.floor(Math.random() * 3) + 1
  }));
  if (!config) return null;
  return (
    <motion.div
      initial={{ y: -100, x: `${config.x}vw`, opacity: 0, rotate: 0 }}
      animate={{ y: '115vh', opacity: [0, 0.9, 0.9, 0], rotate: config.rotation }}
      transition={{ duration: config.duration, delay: delay, repeat: Infinity, ease: "linear" }}
      className="fixed top-0 left-0 pointer-events-none z-0 select-none flex items-center justify-center"
      style={{ width: `${config.size}px`, height: `${config.size}px`, filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.1))' }}
    >
      <img src={`/peonia${config.img}.png`} alt="Peonia" className="w-full h-full object-contain" />
    </motion.div>
  );
};

const FallingPeoniesBg = () => {
  const flowerCount = 15;
  const flowers = useMemo(() => Array.from({ length: flowerCount }), []);
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {flowers.map((_, i) => <PeonyFlower key={i} delay={i * 2} />)}
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [claimedData, setClaimedData] = useState(() => JSON.parse(localStorage.getItem('claimedData') || '{}'));
  const [completedTasks, setCompletedTasks] = useState(() => JSON.parse(localStorage.getItem('completedTasks') || '[]'));
  
  const [isValentine, setIsValentine] = useState(false);
  const [isBirthday, setIsBirthday] = useState(false);
  const [isAnniversary, setIsAnniversary] = useState(false);

  const [valentineTime, setValentineTime] = useState({ gg: 0, hh: 0, mm: 0, ss: 0 });
  const [togetherTime, setTogetherTime] = useState({ aa: 0, mm: 0, gg: 0 });
  const [anniversaryDays, setAnniversaryDays] = useState(0);

  const [showProposal, setShowProposal] = useState(false); 
  const [proposalAccepted, setProposalAccepted] = useState(false);
  const [noBtnPosition, setNoBtnPosition] = useState({});
  const [noBtnText, setNoBtnText] = useState("No");
  const [isLetterOpen, setIsLetterOpen] = useState(false); 
  
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const getItalyTime = () => {
    const str = new Date().toLocaleString("en-US", { timeZone: "Europe/Rome" });
    return new Date(str);
  };

  const dailyPhrase = useMemo(() => {
    const now = getItalyTime();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return DAILY_PHRASES[dayOfYear % DAILY_PHRASES.length];
  }, []);

  const avviaMusica = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMusica = () => {
    if (audioRef.current) {
      if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); } 
      else { audioRef.current.play().catch(() => {}); setIsPlaying(true); }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = getItalyTime();
      const nowTime = now.getTime();
      const m = now.getMonth();
      const g = now.getDate();

      setIsBirthday(m === DATA_COMPLEANNO.mese && g === DATA_COMPLEANNO.g);
      setIsValentine(m === 1 && g === 14);
      setIsAnniversary(m === DATA_ANNIVERSARIO.mese && g === DATA_ANNIVERSARIO.g);

      const distVal = new Date(DATA_SAN_VALENTINO).getTime() - nowTime;
      setValentineTime({
        gg: Math.max(0, Math.floor(distVal / (1000 * 60 * 60 * 24))),
        hh: Math.max(0, Math.floor((distVal / (1000 * 60 * 60)) % 24)),
        mm: Math.max(0, Math.floor((distVal / 1000 / 60) % 60)),
        ss: Math.max(0, Math.floor((distVal / 1000) % 60))
      });

      const start = new Date(DATA_INIZIO);
      let aa = now.getFullYear() - start.getFullYear();
      let mm = now.getMonth() - start.getMonth();
      let gg = now.getDate() - start.getDate();
      if (gg < 0) { mm--; gg += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
      if (mm < 0) { aa--; mm += 12; }
      setTogetherTime({ aa, mm, gg });

      let nY = now.getFullYear();
      let nA = new Date(nY, DATA_ANNIVERSARIO.mese, DATA_ANNIVERSARIO.g).getTime();
      if (nowTime > nA) nA = new Date(nY + 1, DATA_ANNIVERSARIO.mese, DATA_ANNIVERSARIO.g).getTime();
      setAnniversaryDays(Math.floor((nA - nowTime) / (1000 * 60 * 60 * 24)));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClaim = (id, title) => {
    if (!claimedData[id]) {
      const newData = { ...claimedData, [id]: getItalyTime().getTime() };
      setClaimedData(newData);
      localStorage.setItem('claimedData', JSON.stringify(newData));
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      const msg = encodeURIComponent(`Amore! Ho riscattato: ${title} 🎁`);
      window.open(`https://wa.me/447951728091?text=${msg}`, '_blank');
    }
  };

  const toggleTask = (id) => {
    const newTasks = completedTasks.includes(id) ? completedTasks.filter(tid => tid !== id) : [...completedTasks, id];
    setCompletedTasks(newTasks);
    localStorage.setItem('completedTasks', JSON.stringify(newTasks));
    if (!completedTasks.includes(id)) confetti({ particleCount: 50, spread: 50 });
  };

  const moveNoButton = () => {
    const x = Math.random() * 80;
    const y = Math.random() * 80;
    setNoBtnPosition({ position: 'absolute', top: `${y}%`, left: `${x}%`, transition: 'all 0.2s' });
    setNoBtnText(["Sei sicura?", "No", "Riprova", "Eheh", "Suca", ":-("][Math.floor(Math.random()*4)]);
  };

  const handleYes = () => {
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
    setProposalAccepted(true);
  };

  const progressPercent = Math.round((completedTasks.length / BUCKET_LIST.length) * 100);

  return (
    <div className={`max-w-md mx-auto min-h-screen pb-28 shadow-2xl relative overflow-hidden transition-colors duration-1000 ${isBirthday ? 'bg-orange-50' : 'bg-white'}`}>
      
      <audio ref={audioRef} src="/musica.mp3" loop />
      <AnimatePresence>{isBirthday && <FallingPeoniesBg />}</AnimatePresence>

      <button 
        onClick={toggleMusica} 
        className="fixed top-4 right-4 z-[60] p-3 bg-white/90 backdrop-blur-md rounded-full shadow-xl border-2 border-white ring-1 ring-pink-100 text-love-red active:scale-90 transition-transform"
      >
        <Music className={isPlaying ? "animate-pulse" : "opacity-30"} size={20} />
      </button>

      <header className={`p-8 text-center bg-gradient-to-b ${isBirthday ? 'from-yellow-200 to-transparent' : 'from-pink-100 to-white'}`}>
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}>
          <Heart className={`mx-auto ${isBirthday ? 'text-orange-500 fill-orange-200' : 'text-love-red fill-love-red'}`} size={40} />
        </motion.div>
        <h1 className="mt-4 text-2xl font-black text-love-red tracking-tight uppercase">
          {isBirthday ? "Auguri Amore! 🎂" : isValentine ? "Buon San Valentino ❤️" : "La Nostra App"}
        </h1>
      </header>

      <main className="px-6 relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div key="h" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }}
                className="bg-pink-50/50 p-4 rounded-3xl border border-pink-100 flex gap-3 items-start shadow-inner"
              >
                <Quote className="text-pink-300 shrink-0 rotate-180" size={18} />
                <p className="text-sm text-love-dark leading-relaxed font-medium tracking-wide italic opacity-90">
                  {dailyPhrase}
                </p>
              </motion.div>

              {isBirthday && (
                <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-6 rounded-3xl text-white shadow-lg">
                  <h2 className="font-bold">Buon Compleanno Amore! </h2>
                  <button onClick={() => { avviaMusica(); handleClaim(777, "Regalo"); }} className="mt-3 bg-white text-orange-500 px-4 py-2 rounded-xl text-xs font-bold">Sblocca Regalo 🎁</button>
                </div>
              )}

              {isValentine && (
                <div className="bg-love-red p-6 rounded-3xl text-white shadow-lg">
                  <button onClick={() => { setShowProposal(true); avviaMusica(); }} className="w-full bg-white text-love-red font-bold py-3 rounded-xl animate-bounce text-sm">Apri Sorpresa 💌</button>
                </div>
              )}

              <div className="bg-white border-2 border-pink-100 p-5 rounded-3xl text-center shadow-sm">
                <p className="text-[10px] font-bold text-pink-400 mb-1 uppercase tracking-widest">Insieme da</p>
                <div className="flex justify-around font-black text-love-red text-xl">
                  <div>{togetherTime.aa}<span className="text-[9px] block text-gray-400">ANNI</span></div>
                  <div>{togetherTime.mm}<span className="text-[9px] block text-gray-400">MESI</span></div>
                  <div>{togetherTime.gg}<span className="text-[9px] block text-gray-400">GIORNI</span></div>
                </div>
              </div>

              <div className="bg-love-red p-6 rounded-3xl text-white shadow-lg text-center relative overflow-hidden">
                <p className="text-[10px] font-bold opacity-80 mb-3 tracking-widest uppercase text-white/90">Verso San Valentino</p>
                <div className="flex justify-around font-mono text-2xl font-black">
                  <div>{valentineTime.gg}<span className="text-[9px] block opacity-70">GG</span></div>
                  <div>{valentineTime.hh}<span className="text-[9px] block opacity-70">HH</span></div>
                  <div>{valentineTime.mm}<span className="text-[9px] block opacity-70">MM</span></div>
                  <div>{valentineTime.ss}<span className="text-[9px] block opacity-70">SS</span></div>
                </div>
              </div>

              <div className="bg-love-dark p-5 rounded-3xl text-white flex justify-between items-center shadow-md">
                <div className="flex items-center gap-3"><Calendar className="text-pink-300" size={24}/><div><p className="text-[10px] font-bold opacity-60 uppercase">Anniversario</p><h3 className="text-sm font-bold italic">19 Giugno</h3></div></div>
                <div className="text-right"><span className="text-2xl font-black text-pink-300">-{anniversaryDays}</span><span className="text-[9px] block opacity-60 uppercase font-bold">Giorni</span></div>
              </div>

              {isAnniversary && (
                <button onClick={() => { setIsLetterOpen(true); avviaMusica(); }} className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-white py-4 rounded-full font-bold shadow-xl">Leggi Storia ✨</button>
              )}
            </motion.div>
          )}

          {activeTab === 'coupons' && (
            <motion.div key="c" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4 pb-4">
              {COUPONS.map(c => {
                const isClaimed = !!claimedData[c.id];
                return (
                  <div key={c.id} className={`p-4 rounded-2xl border-2 flex items-center justify-between ${isClaimed ? 'opacity-50 bg-gray-50' : 'bg-white border-pink-100 shadow-sm'}`}>
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{c.icon}</span>
                      <div><h3 className="font-bold text-sm text-love-red">{c.title}</h3><p className="text-[10px] text-gray-500">{isClaimed ? "Torna tra 30gg" : c.desc}</p></div>
                    </div>
                    <button onClick={() => handleClaim(c.id, c.title)} className={`p-2 rounded-full ${isClaimed ? 'text-green-500' : 'bg-love-red text-white'}`}>
                      {isClaimed ? <CheckCircle2 size={24} /> : <Gift size={20} />}
                    </button>
                  </div>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'roadmap' && (
            <motion.div key="r" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-8">
              <div className="bg-white p-6 rounded-3xl border-2 border-pink-100 shadow-sm">
                <div className="flex justify-between items-end mb-4">
                  <h2 className="font-black text-love-red text-xl uppercase tracking-tight">Roadmap dei Sogni 🗺️</h2>
                  <span className="text-love-red font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full bg-pink-50 h-3 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} className="bg-love-red h-full" />
                </div>
              </div>
              <div className="space-y-3">
                {BUCKET_LIST.map((item) => (
                  <button key={item.id} onClick={() => toggleTask(item.id)} className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${completedTasks.includes(item.id) ? 'bg-pink-50 border-pink-200' : 'bg-white border-gray-100'}`}>
                    {completedTasks.includes(item.id) ? <CheckSquare className="text-love-red" /> : <Square className="text-gray-300" />}
                    <span className={`text-sm font-medium ${completedTasks.includes(item.id) ? 'line-through text-gray-400 italic' : 'text-gray-700'}`}>{item.task}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white/90 backdrop-blur-md border border-pink-50 h-16 rounded-full shadow-2xl flex items-center justify-around px-2 z-50">
        <button onClick={() => setActiveTab('home')} className={`p-3 rounded-full ${activeTab === 'home' ? 'bg-pink-100 text-love-red' : 'text-gray-400'}`}><Clock size={24} /></button>
        <button onClick={() => setActiveTab('coupons')} className={`p-3 rounded-full ${activeTab === 'coupons' ? 'bg-pink-100 text-love-red' : 'text-gray-400'}`}><Gift size={24} /></button>
        <button onClick={() => setActiveTab('roadmap')} className={`p-3 rounded-full ${activeTab === 'roadmap' ? 'bg-pink-100 text-love-red' : 'text-gray-400'}`}><Map size={24} /></button>
      </nav>

      <AnimatePresence>
        {showProposal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-pink-900/95 flex items-center justify-center p-4 text-center">
            <motion.div layout className="bg-white w-full max-w-sm p-8 rounded-3xl shadow-2xl relative min-h-[400px] flex flex-col justify-center items-center">
              <button onClick={() => { setShowProposal(false); setProposalAccepted(false); }} className="absolute top-4 right-4 text-gray-300 font-bold">✕</button>
              <AnimatePresence mode="wait">
                {!proposalAccepted ? (
                  <motion.div key="ask" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="flex flex-col items-center">
                    <Heart className="text-love-red fill-love-red mb-4 animate-bounce" size={60} />
                    <h2 className="text-2xl font-black text-love-red mb-8 uppercase">Vuoi passare San Valentino con me?</h2>
                    <div className="relative h-20 w-full">
                      <button onClick={handleYes} className="absolute left-4 bg-green-500 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg">SÌ!</button>
                      <button style={noBtnPosition} onMouseEnter={moveNoButton} onTouchStart={moveNoButton} onClick={moveNoButton} className="absolute right-4 bg-gray-200 text-gray-500 font-bold py-2 px-6 rounded-full text-sm">{noBtnText}</button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="msg" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
                    <Sparkles className="text-yellow-400 mb-4" size={50} />
                    <h2 className="text-3xl font-black text-love-red mb-4 uppercase text-center">SÌ! ❤️</h2>
                    <p className="text-gray-600 italic px-4">"Sapevo che avresti detto di sì! Non vedo l'ora di passare questo San Valentino con te. Sei la mia vita!"</p>
                    <button onClick={() => setShowProposal(false)} className="mt-8 text-pink-400 font-bold text-xs underline">Chiudi</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
        {isLetterOpen && (
          <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6 text-center">
            <div className="bg-[#fffdfa] p-8 rounded-lg shadow-2xl relative border-t-8 border-yellow-600 max-w-sm">
              <button onClick={() => setIsLetterOpen(false)} className="absolute top-2 right-4 text-2xl font-bold">✕</button>
              <p className="text-[10px] text-yellow-600 font-bold mb-4 uppercase tracking-widest italic text-center">Commit: 19/06/2023</p>
              <p className="text-sm leading-relaxed mb-4 text-gray-800 italic">"Se dovessi fare un refactoring della mia vita, il 19 Giugno sarebbe il giorno in cui ho pushato il codice migliore. Sei la mia vita. Ti amo."</p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}