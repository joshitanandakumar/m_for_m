import { useState, useEffect } from "react";
import "./App.css";

const MESSAGES = [
  "you're the sister we always wished for. the best sister we could ever get hehe -joshi",
  "In this world full of chaos you are my place of calm and comfort ! -hafieza",
  "as long as l'm there, you'll always have someone who is proud of you in everything, thanks for making my life brighter madhu :) happiest birthday to you -lokesh",
  "Always loved our gossip sessions and hopefully we will gossip endlessly when we me meet - ganesh",
  "Ishq karoon ya karoon ibaadat ikko hi gal ae alf madhu, alf madhu, alf madhu hu. madhu hi meri noor ka jharna hai<333333 -pani",
  "'Ammaadi needhaan illaadha naanum venmegam vandhu neendhaadha vaanam'",
  "Happiest bday to the elder sister I have never had -Faheema",
  "van gogh chose to see the beauty in the mundane; be it skies, flowers, people or the different colours hiding in this vast stretch of nature. it's a shame he didn't get to see you during your favourite holi celebrations, would've made one hell of a painting. -faheems",
  "This is the second birthday of yours I’m lucky enough to celebrate, and that still feels surreal to me. Getting to know you has been one of the greatest privileges of my life♡♡ -pani",
  "'Ponmanjal manjal pennae engae selgiraai? Minnanjal polae vanthu sendru kolgiraai'",
  "I love you soooo much from that first day of Sr. KG to forever ! -hafieza",
  "you are beautiful, our beautiful princess",
  " i hope everyone who gets to see you irl hears the first few notes of balam pichkaari on their mind. you bring so much colour into people's lives madhuuuu and in return get shades of different colours on yourself, the ones you'd let stay a little while longer before washing it off. -faheems",
  "everyone needs a madhu in their lives",
  "I will always embrace and be proud that you will always stand alongside of this brother of yours all the time -ganesh",
  "Hi Madhu my birthday baby, remember when we used to lie that we paraglided from China to India together when we were 6 years old😭 Thank  you for growing up with me and I’m so excited and proud to see the woman you’ve become 🫶🫶 -natya",
  "you are a renaissance soul di chellam",
  "Thank you for coming into my life and making it a thousand times better, my baby. -thara",
  "Thank you so much Madhu for existing, You helped me a lot of times and you supported me and Thara as well and we had a lot of great fun memories, we all should meet soon and I love you so much and A very happy bday to MADHU MAM -adi",
  "i still look at that one crocheted clip you sent me and think how grateful i am to have someone to love me this much -Roofa",
  "You have no idea how much i look up to you and love you - so sexy so smart and so funny pls don't go bald -Kaavz",
  "thank you for being the person i can run to and cry with no matter how far away you are i will always feel like you're beside me because of how much love you give",
  "'Poovum ivalum onnu, enna konnupputtaa konnu'",
  "Okay here if goes my love, the first thing I'm proud of in this life is being called your bestfriend🫶🏻 You mean the world to me Madhu and nothing can ever ever change that -Sakshi",
  "Hi Madhu!! Though we talk too less, I have always felt this twin sister vibes from you😛 -Nei",
  "you have changed many people's lives with your words & kindess, and i think thats the most precious thing in the world -joshi",
  "You are super intelligent and one of the most boldest people I know from twitter!! Happiest Birthday babyy!!😘😘😘 -Nei",
  "Happyy Birthdayy madhu🙂‍↕️, big 24 ehh?? congratulations on being promoted to aunty and hope you stop bothering street dogs and cats now😊 jokes apart hope you have great great year, happy birthday againn🥳 -abra",
  "Many more happy returns of the day Madhu!! wishing you only the best and nothing less -ganesh",
  "thank you for crossing my path in this vast universe, for making my world brighter by just being in it,i pray that all the warmth, love, and light you give to everyone else comes back to you tenfold because someone as special as you deserves nothing less♡♡♡ -pani",
  "'Baatein teri itni haseen'",
  "You’re the ray of sunshine that keeps me warm and makes my life bright. -thara",
  "madhu you are a light and the brightest star for so many people in your life , always hoping for a chance to get close to you and love you for the way you are and the amazing human being you are , stay the same and let's get drunk as soon as possible 🥰🥰🌹🌹💋💋💋 -Harini",
  "en azhaga neenga? en chellamma neenga? en pattaa neenga? en chittaa neenga? en thangakutti ah neenga? en vairamaa neenga? en muththazhagi nee ummaaaaa hehehe",
  "you absolutely slay, your body tea, skin smooth, your vibe ethereal, your haters will rot and you keep winning -Roofa",
  "In next life we wouldn’t be long distance besties and we would have sleepover every weekends -Faheema",
  "There aren’t enough words to express how much I love you, and I would do anything to keep you by my side. -thara",
  "i hope this new chapter of yours brings more yellow into your life ummaaaa buh bye iloveyouuuu 💛💛💛 - faheems",
  "'Dil karta hai teri baatein sunu'",
  "You’re my world -Faheema",
  "en azhagu raajathi nee",
  "thinking about you and how far you've come how many lives you've changed inspires me the most -joshi",
  "everything is gonna be okay",
  "Hope you have a great year and you will always be in my prayers and hope you get everything you wish for🧿🧿🧿 -ganesh",
  "what is life without you madhu",
  "Iloveyouuuuuu so much you're so amazing♡♡♡♡♡-pani",


];

const MSG_INDEX_KEY = "motd_message_index";
const LAST_OPENED_KEY = "motd_last_opened_time";

function getThreeHourCountdown() {
  const lastOpened = parseInt(localStorage.getItem(LAST_OPENED_KEY) ?? "0", 10);
  if (!lastOpened) return { h: 3, m: 0, s: 0 };

  const now = Date.now();
  const THREE_HOURS = 3 * 60 * 60 * 1000;
  const elapsed = now - lastOpened;
  const remaining = Math.max(0, THREE_HOURS - elapsed);

  const h = Math.floor(remaining / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  return { h, m, s };
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [message, setMessage] = useState("");
  const [hasOpened, setHasOpened] = useState(false);
  const [countdown, setCountdown] = useState(getThreeHourCountdown());
  const [animating, setAnimating] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [gifKey, setGifKey] = useState(0);
  const [gifLoaded, setGifLoaded] = useState(false);

useEffect(() => {
  setShowIntro(true);
  setGifKey((prev) => prev + 1);
}, []);

useEffect(() => {
  if (!gifLoaded) return;

  const timer = setTimeout(() => {
    setShowIntro(false);
  }, 3700); // NOW starts AFTER gif loads

  return () => clearTimeout(timer);
}, [gifLoaded]);

useEffect(() => {
  const savedIndex = parseInt(localStorage.getItem(MSG_INDEX_KEY) ?? "0", 10);
  const lastOpened = parseInt(localStorage.getItem(LAST_OPENED_KEY) ?? "0", 10);

  const now = Date.now();
  const THREE_HOURS = 3 * 60 * 60 * 1000;

  setMessage(MESSAGES[savedIndex]);

  if (lastOpened && now - lastOpened < THREE_HOURS) {
    setHasOpened(true);
  } else {
    setHasOpened(false);
  }
}, []);

useEffect(() => {
  const interval = setInterval(() => {
    setCountdown(getThreeHourCountdown());
  }, 1000);

  return () => clearInterval(interval);
}, []);


function handleOpen() {
  setAnimating(true);

  setTimeout(() => {
    const now = Date.now();
    const lastOpened = parseInt(localStorage.getItem(LAST_OPENED_KEY) ?? "0", 10);
    const savedIndex = parseInt(localStorage.getItem(MSG_INDEX_KEY) ?? "0", 10);

    const THREE_HOURS = 3 * 60 * 60 * 1000;

    let currentIndex = savedIndex;

    if (!lastOpened) {
      // first ever open → stay at 0
      currentIndex = 0;
    } else if (now - lastOpened >= THREE_HOURS) {
      // enough time passed → move forward
      currentIndex = (savedIndex + 1) % MESSAGES.length;
      localStorage.setItem(MSG_INDEX_KEY, String(currentIndex));
    }

    // ✅ ONLY NOW start the timer
    localStorage.setItem(LAST_OPENED_KEY, String(now));

    setMessage(MESSAGES[currentIndex]);
    setHasOpened(true);
    setOpened(true);
    setAnimating(false);
  }, 900);
}

function handleReset() {
  // ❌ DO NOT touch localStorage at all

  setOpened(false);

  // keep hasOpened TRUE so it doesn't advance
  // (this is key)

  setShowIntro(true);
  setGifKey((prev) => prev + 1);

  setTimeout(() => setShowIntro(false), 2400);
}

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0px rgba(74, 155, 190, 0); transform: scale(1); }
          50% { box-shadow: 0 0 14px 4px rgba(219, 222, 132, 0.4); transform: scale(1.03); }
        }
        @keyframes dovefly {
          0%   { transform: translateX(-180px) translateY(60px) scale(0.6); opacity: 0; }
          30%  { opacity: 1; }
          70%  { transform: translateX(10px) translateY(-20px) scale(1.05); opacity: 1; }
          100% { transform: translateX(80px) translateY(-60px) scale(1.15); opacity: 0; }
        }
        @keyframes fadeInCard {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={styles.root}>
        <div style={styles.noise} />

        {showIntro ? (
          <div style={styles.introStage}>
<img
  key={gifKey}
  src={`/dove.gif?${gifKey}`}
  alt="dove animation"
  onLoad={() => setGifLoaded(true)} // 🔥 THIS is the fix
  style={{
    ...styles.doveImg,
    mixBlendMode: "multiply",
    pointerEvents: "none",
  }}
/>
          </div>
        ) : (
          <div style={{ ...styles.card, animation: "fadeInCard 0.7s ease forwards" }}>
            <p style={styles.label}>🌻princess madhu,</p>
            <h1 style={styles.title}>A MESSAGE AWAITS YOU</h1>

            {!opened ? (
              <button
                style={{ ...styles.envelope, ...(animating ? styles.envelopeAnim : {}) }}
                onClick={handleOpen}
                aria-label="Open your message"
              >
                <EnvelopeSVG animating={animating} />
              </button>
            ) : (
              <div style={styles.messageBox}>
                <p style={styles.messageText}>{message}</p>
              </div>
            )}

{opened && hasOpened && (
              <div style={styles.countdownBox}>
                <span style={styles.countdownLabel}>next message in</span>
                <span style={styles.countdownTime}>
                  {pad(countdown.h)}:{pad(countdown.m)}:{pad(countdown.s)}
                </span>
              </div>
            )}

            <p style={styles.footer}>remember, you are always loved ♡</p>
          </div>
        )}

        {!showIntro && opened && (
          <button
            onClick={handleReset}
            style={styles.moonButton}
            aria-label="Restart messages"
          >
            🌙
          </button>
        )}
      </div>
    </>
  );
}

function EnvelopeSVG({ animating }) {
  return (
    <svg
      viewBox="0 0 120 90"
      width="100"
      height="75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transition: "transform 0.9s cubic-bezier(.4,0,.2,1)",
        transform: animating ? "scale(1.08) rotate(-4deg)" : "scale(1) rotate(0deg)",
      }}
    >
      <rect x="4" y="20" width="112" height="66" rx="8" fill="#1a3a6e" stroke="#000000" strokeWidth="0" />
      <path d="M4 28 L60 58 L116 28 L116 20 Q116 20 108 20 L12 20 Q4 20 4 20 Z" fill="#0f2550" stroke="#000000" strokeWidth="0" />
      <path d="M4 28 L60 58 L116 28" stroke="#000000" strokeWidth="0" fill="none" />
      <circle cx="60" cy="54" r="11" fill="#000000" opacity="0.95" />
      <text x="60" y="59" textAnchor="middle" fontSize="15" fill="#000000">🌻</text>
    </svg>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e8f4f8 0%, #d0eaf5 50%, #b8dded 100%)",
    backgroundImage: "url('/go.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Cinzel'",
    position: "relative",
    overflow: "hidden",
  },
  noise: {
    position: "fixed",
    inset: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
    pointerEvents: "none",
    zIndex: 0,
  },
  introStage: {
    position: "fixed",
    inset: 0,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
  },
  doveImg: {
    width: "100vw",
    height: "100vh",
    objectFit: "cover",
  },
card: {
  position: "relative",
  zIndex: 1,

  background: "rgba(255, 255, 255, 0.22)", // ✨ translucent
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",

  borderRadius: "20px",
  padding: "20px 18px 16px",
  maxWidth: "240px",
  width: "70%",

  boxShadow: "0 8px 32px rgba(20, 80, 120, 0.2)",
  border: "1px solid rgba(255,255,255,0.35)",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  textAlign: "center",
},
  label: {
    fontSize: "11px",
    letterSpacing: "0.12em",
    color: "#e2e1a4",
    margin: 0,
    textTransform: "uppercase",
    fontFamily: "'Cinzel'",
  },
  title: {
    fontSize: "17px",
    fontWeight: "600",
    color: "#ffffff",
    margin: 0,
    lineHeight: 1.2,
    letterSpacing: "0.04em",
    fontFamily: "'Cinzel'",
  },
  envelope: {
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    padding: "10px",
    borderRadius: "12px",
    transition: "background 0.2s",
    animation: "pulse 2.5s ease-in-out infinite",
  },
  envelopeAnim: {
    background: "rgba(90,174,208,0.08)",
  },
  tapHint: {
    fontSize: "11px",
    color: "#bed9ff",
    letterSpacing: "0.08em",
    fontStyle: "italic",
    fontFamily: "'Cinzel'",
  },
messageBox: {
  background: "linear-gradient(135deg, rgba(248, 245, 166, 0.35), rgba(235, 241, 194, 0.35))",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",

  //border: "1.5px solid rgba(255,255,255,0.6)",
  borderRadius: "12px",
  padding: "16px 14px",
  width: "100%",
  boxSizing: "border-box",

  boxShadow: "0 4px 16px rgba(120, 120, 40, 0.15)",
},
  messageText: {
    fontSize: "12px",
    //fontWeight: "600",
    color: "#000000",
    lineHeight: 1.65,
    margin: 0,
    fontStyle: "italic",
    fontFamily: "'Comfortaa'",
  },
  countdownBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "3px",

  },
  countdownLabel: {
    fontSize: "11px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#e2e1a4",
    fontFamily: "'Cinzel'",
  },
  countdownTime: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    fontVariantNumeric: "tabular-nums",
    letterSpacing: "0.06em",
    fontFamily: "'Cinzel'",
  },
  footer: {
    fontSize: "10px",
    color: "#bed9ff",
    margin: 0,
    marginTop: "1px",
    fontFamily: "'Comfortaa'",
  },
  moonButton: {
    background: "rgba(255,255,255,0.15)",
    border: "none",
    borderRadius: "50%",
    width: "28px",
    height: "28px",
    fontSize: "17px",
    cursor: "pointer",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    marginTop: "20px",
  },
};