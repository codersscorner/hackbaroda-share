"use client";

import { useRef, useState, useCallback } from "react";

const SHARE_TEXT = `Excited to share that I, {LEADER}, along with Team {TEAM}, have been selected for the Final Round of HackBaroda 2026 🚀
Looking forward to showcasing our idea, connecting with amazing builders, and experiencing Gujarat's Largest Hackathon ⚡
Big thanks to Coders Corner for organizing this incredible event 💻
See you in Vadodara on 7th June!
#HackBaroda2026 #CodersCorner #Hackathon #Innovation #FinalRound`;



export default function Page() {
  const posterRef = useRef<HTMLDivElement>(null);
  const [leader, setLeader] = useState("");
  const [team, setTeam] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [shareMsg, setShareMsg] = useState("");

  const handlePhoto = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(URL.createObjectURL(file));
  }, []);

  const handleDownload = useCallback(async () => {
    if (!posterRef.current) return;
    setExporting(true);
    try {
      // Load html2canvas from window if available, otherwise fetch from CDN
      let html2canvas: any;
      
      if (typeof window !== "undefined" && (window as any).html2canvas) {
        html2canvas = (window as any).html2canvas;
      } else {
        // Dynamically load from CDN
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
        script.async = true;
        
        await new Promise((resolve, reject) => {
          script.onload = () => {
            html2canvas = (window as any).html2canvas;
            resolve(true);
          };
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
      
      const canvas = await html2canvas(posterRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        imageTimeout: 0,
        width: posterRef.current.offsetWidth,
        height: posterRef.current.offsetHeight,
      });
      
      // Use toDataURL with maximum quality
      const dataUrl = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `hackbaroda-2026-${Date.now()}.png`;
      link.click();
      
      setShareMsg("✓ Poster downloaded successfully!");
      setTimeout(() => setShareMsg(""), 3000);
    } catch (error) {
      console.error("Download failed:", error);
      setShareMsg("❌ Download failed. Please try again.");
      setTimeout(() => setShareMsg(""), 4000);
    } finally {
      setExporting(false);
    }
  }, []);

  const getShareText = () =>
    SHARE_TEXT.replace("{LEADER}", leader || "my team leader").replace("{TEAM}", team || "our team");

  const handleShare = async (platform: string) => {
    const text = getShareText();
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent("https://hackbaroda.vercel.app");

    if (platform === "linkedin") {
      // LinkedIn only supports URL sharing
      await navigator.clipboard.writeText(text);

      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        "_blank",
        "noopener,noreferrer,width=700,height=600"
      );

      setShareMsg("✓ Caption copied! Paste it into your LinkedIn post.");
      setTimeout(() => setShareMsg(""), 4000);
      return;
    }

    if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
        "_blank",
        "noopener,noreferrer,width=700,height=600"
      );
      return;
    }

    if (platform === "instagram") {
      try {
        await navigator.clipboard.writeText(text);

        setShareMsg(
          "✓ Caption copied! Upload the downloaded poster to Instagram Story/Post and paste the caption."
        );

        setTimeout(() => setShareMsg(""), 5000);
      } catch {
        setShareMsg("Failed to copy caption.");
      }

      return;
    }
  };

  return (
    <div
      className="min-h-screen font-serif"
      style={{ backgroundImage: "url('https://iili.io/BkVu8HN.md.jpg')", backgroundRepeat: "repeat" }}
    >
      <div className="fixed inset-0 bg-[rgba(245,235,210,0.88)] z-0" />

      <div className="relative z-10">

        <header className="bg-[#2a0e00] text-center py-4 px-4">
          <p className="text-[#d4a017] text-[10px] tracking-[4px] uppercase font-sans font-semibold">
            HackBaroda 2026 — Gujarat's Largest Hackathon
          </p>
        </header>

        <main className="max-w-xl mx-auto px-4 pb-20">

          <section className="text-center pt-12 pb-8">
            <div className="inline-flex items-center gap-2 border-t border-b border-[#b8860b] py-1 px-5 mb-6">
              <span className="text-[#b8860b] text-[8px] tracking-[4px] uppercase font-sans">Official Poster Generator</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold text-[#1a0700] leading-tight mb-3"
              style={{ fontFamily: "Georgia, serif" }}
            >
              You've been Selected<br />For HackBaroda.
            </h1>

          </section>






          <section className="mb-6">


            <div className="bg-[rgba(255,252,240,0.92)] border border-[#d9c49a] rounded-xl p-6 shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <label className="flex flex-col gap-2">
                  <span className="text-[#b8860b] text-[9px] tracking-[3px] uppercase font-sans">Team Leader Name</span>
                  <input
                    value={leader}
                    onChange={(e) => setLeader(e.target.value)}
                    placeholder="e.g. Riya Shah"
                    className="bg-white border border-[#d9c49a] focus:border-[#b8860b] rounded-md px-3 py-2.5 text-[#2a0e00] text-sm font-serif outline-none transition-colors placeholder:text-[#c4a97a] w-full"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-[#b8860b] text-[9px] tracking-[3px] uppercase font-sans">Team Name</span>
                  <input
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                    placeholder="e.g. Team Baroda"
                    className="bg-white border border-[#d9c49a] focus:border-[#b8860b] rounded-md px-3 py-2.5 text-[#2a0e00] text-sm font-serif outline-none transition-colors placeholder:text-[#c4a97a] w-full"
                  />
                </label>

                <label className="flex flex-col gap-2 cursor-pointer sm:col-span-2">
                  <span className="text-[#b8860b] text-[9px] tracking-[3px] uppercase font-sans">Your Photo</span>
                  <div
                    className={`border border-dashed rounded-md px-4 py-3 text-center text-sm font-sans transition-all ${photo
                      ? "border-[#b8860b] bg-[rgba(184,134,11,0.08)] text-[#b8860b]"
                      : "border-[#d9c49a] bg-white text-[#c4a97a]"
                      }`}
                  >
                    {photo ? "✓ Photo ready" : "Click to upload"}
                    <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
                  </div>
                </label>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleDownload}
                  disabled={exporting}
                  className={`px-6 py-2.5 rounded-md text-xs tracking-[2px] uppercase font-sans font-bold transition-all ${exporting
                    ? "bg-[#d9c49a] text-[#8a6030] cursor-not-allowed"
                    : "bg-[#2a0e00] text-[#d4a017] hover:bg-[#3d1500]"
                    }`}
                >
                  {exporting ? "Exporting…" : "⬇ Download Poster"}
                </button>
              </div>
            </div>
          </section>

          <div className="my-5 text-center">
            <span className="text-[#9a7040] text-[9px] tracking-[3px] uppercase font-sans">Poster Preview</span>
            <div className="border-t border-[#d9c49a] mt-1" />
          </div>

          <div className="flex justify-center mb-8">
            <div
              ref={posterRef}
              className="relative w-full max-w-[560px] rounded-lg overflow-hidden shadow-2xl"
              style={{ aspectRatio: "1 / 1" }}
            >
              <img
                src="/Hack_Baroda.png"
                alt="HackBaroda 2026 Poster"
                className="absolute inset-0 w-full h-full block"
                draggable={false}
                crossOrigin="anonymous"
              />

              <div
                className="absolute pointer-events-none text-[#6f3500]"
                style={{
                  left: "13%",
                  top: "55.5%",
                  width: "44%",
                  fontSize: "clamp(0.6rem, 1.9vw, 1.05rem)",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  lineHeight: 1.6,
                }}
              >
                {"Excited to share that I, "}
                <span className="font-bold">{leader || "[Team Leader Name]"}</span>
                {", along with Team "}
                <span className="font-bold">{team || "[Team Name]"}</span>
                {", have been selected for the Final Round of "}
                <em>HackBaroda 2026</em>
              </div>

              <div
                className="absolute pointer-events-none overflow-hidden rounded-sm border border-[#6e2a00] bg-[#6b2d00]"
                style={{
                  left: "61.5%",
                  top: "54.5%",
                  width: "25%",
                  height: "26%",
                  transform: "rotate(6deg)",
                  transformOrigin: "center center",
                  padding: "6px 6px 16px",
                  boxSizing: "border-box",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
                }}
              >
                {photo ? (
                  <img
                    src={photo}
                    alt="participant"
                    className="w-full h-full object-cover block"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-1 bg-[rgba(170,200,230,0.3)]">
                    <span className="text-2xl opacity-40">📷</span>
                    <span className="text-[55%] text-[#c9a96e] font-sans text-center">your photo</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <section className="bg-[rgba(255,252,240,0.92)] border border-[#d9c49a] rounded-xl p-6 shadow-md mb-8">
            <div className="inline-flex items-center border-t border-b border-[#b8860b] py-1 px-4 mb-4">
              <span className="text-[#b8860b] text-[9px] tracking-[3px] uppercase font-sans">Share Your Achievement</span>
            </div>

            <div className="bg-white border border-[#e8d8b0] rounded-lg px-4 py-4 text-sm text-[#7a4a00] font-serif leading-relaxed whitespace-pre-line mb-5">
              {getShareText()}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleShare("linkedin")}
                className="flex items-center justify-center gap-2 bg-[rgba(10,102,194,0.08)] border border-[rgba(10,102,194,0.3)] rounded-lg px-5 py-2.5 text-[#1a6fc4] text-xs font-semibold font-sans hover:bg-[rgba(10,102,194,0.18)] transition-colors flex-1 min-w-[130px]"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </button>

              <button
                onClick={() => handleShare("twitter")}
                className="flex items-center justify-center gap-2 bg-[rgba(0,0,0,0.05)] border border-[rgba(0,0,0,0.15)] rounded-lg px-5 py-2.5 text-[#2a0e00] text-xs font-semibold font-sans hover:bg-[rgba(0,0,0,0.1)] transition-colors flex-1 min-w-[130px]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.892-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X (Twitter)
              </button>

              <button
                onClick={() => handleShare("instagram")}
                className="flex items-center justify-center gap-2 bg-[rgba(225,48,108,0.07)] border border-[rgba(225,48,108,0.25)] rounded-lg px-5 py-2.5 text-[#c0304a] text-xs font-semibold font-sans hover:bg-[rgba(225,48,108,0.15)] transition-colors flex-1 min-w-[130px]"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Instagram Story
              </button>
            </div>

            {shareMsg && (
              <div className="mt-4 bg-[rgba(184,134,11,0.1)] border border-[rgba(184,134,11,0.3)] rounded-md px-4 py-2.5 text-[#b8860b] text-xs font-sans text-center">
                {shareMsg}
              </div>
            )}
          </section>

        </main>

        <footer className="bg-[#2a0e00] py-10 px-4 text-center">
          <p className="text-[#d4a017] text-base font-bold font-serif mb-1">Coder's Corner</p>
          <p className="text-[#c9a96e] text-xs font-sans mb-6 leading-relaxed">
            Where coders don't just learn.<br />They build. They earn. They grow.
          </p>
          <p className="text-[#b8860b] text-[9px] tracking-[3px] uppercase font-sans mb-2">Official Inquiries</p>
          <p className="text-[#c9a96e] text-sm font-sans mb-6">coderscorner16@gmail.com</p>
          <div className="flex flex-wrap justify-center gap-8 text-[#9a7040] text-[10px] font-sans uppercase tracking-wider">
            <div>
              <p className="text-[#b8860b] mb-1">Organizer</p>
              <p>Harsh Soni</p>
              <p>+91 97145 10905</p>
            </div>
            <div>
              <p className="text-[#b8860b] mb-1">Co-Organizer</p>
              <p>Mann Dosi</p>
              <p>+91 63778 66464</p>
            </div>
          </div>
          <p className="text-[#4a2800] text-[10px] font-sans tracking-widest mt-8 uppercase">
            Coder's Corner · HackBaroda 2026 · Vadodara
          </p>
        </footer>

      </div>
    </div>
  );
}