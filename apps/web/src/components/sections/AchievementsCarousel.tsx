"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

const ACHIEVEMENTS = [
  {
    id: "star-of-month",
    title: "Star of the Month",
    company: "Tata Consultancy Services (TCS)",
    date: "July 10, 2026",
    image: "/achievements/star-of-the-month.jpg",
    description: "Awarded by my Manager for automating the complete vulnerability fix cycle from a full-day manual process down to 15 minutes. The pipeline automatically updates the main branch, deploys across all AWS environments, validates the infrastructure, and triggers auto-rollback on error."
  },
  {
    id: "emerging-ai-champion",
    title: "Emerging AI Champion",
    company: "TCS Global Aviation Client",
    date: "August 25, 2026",
    image: "/achievements/emerging-ai-champion.jpg",
    description: "Honored out of the entire account by global leaders and customers. Recognized during discussions on future roadmaps and how our engineering teams tackle the hardest technical bottlenecks."
  },
  {
    id: "ai-fridays-s2",
    title: "AI Fridays Season 2",
    company: "Tata Consultancy Services (TCS)",
    date: "July 24, 2026",
    image: "/achievements/ai-fridays-s2.png",
    description: "Certificate of achievement for completing the AI innovation challenge during the TCS AI Friday Hackathon."
  }
];

export function AchievementsCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (isHovered) return;

    let intervalId: NodeJS.Timeout;
    
    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        if (scrollContainerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
          // If reached the end, scroll back to start
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            // Scroll right by one card approx
            const cardWidth = scrollWidth / ACHIEVEMENTS.length;
            scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
          }
        }
      }, 3000); // Scroll every 3 seconds
    };

    startAutoScroll();

    return () => clearInterval(intervalId);
  }, [isHovered]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollWidth } = scrollContainerRef.current;
      const cardWidth = scrollWidth / ACHIEVEMENTS.length;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mt-12">
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <h3
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            color: "var(--color-muted)",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Key Achievements
        </h3>
        <div style={{ flex: 1, height: "1px", background: "color-mix(in srgb, var(--color-border) 50%, transparent)" }} />
      </div>

      <div 
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 p-2 bg-background/80 backdrop-blur border border-border rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
          style={{ transform: "translate(-50%, -50%)" }}
          aria-label="Previous"
        >
          <ChevronLeft size={20} style={{ color: "var(--color-text)" }} />
        </button>

        <div
          ref={scrollContainerRef}
          style={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            gap: "1.5rem",
            paddingTop: "2rem",
            paddingBottom: "3rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            margin: "-2rem -1rem -3rem -1rem", // compensate for padding to avoid layout shift
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE/Edge
          }}
          className="[&::-webkit-scrollbar]:hidden snap-x"
        >
          {ACHIEVEMENTS.map((achievement) => (
            <div
              key={achievement.id}
              style={{
                minWidth: "280px",
                flex: "1 0 30%",
                scrollSnapAlign: "start",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                perspective: "1200px"
              }}
              className="group/card"
              onClick={() => setSelectedImage(achievement.image)}
            >
              <div 
                className="transition-all duration-500 ease-out group-hover/card:[transform:translateZ(30px)_rotateX(5deg)_rotateY(-10deg)_scale(1.08)] group-hover/card:z-10 group-hover/card:shadow-[15px_20px_35px_rgba(0,0,0,0.4)] group-hover/card:border-accent/80"
                style={{ 
                  aspectRatio: "4/3",
                  position: "relative",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-surface)",
                  transformStyle: "preserve-3d",
                  transformOrigin: "center"
                }}
              >
                {/* We use object-contain on hover to 'reveal the full ratio' without cropping, and a nice dark background so the empty space looks intentional */}
                <Image
                  src={achievement.image}
                  alt={achievement.title}
                  fill
                  style={{ transition: "all 0.5s ease-out" }}
                  className="object-cover group-hover/card:object-contain group-hover/card:bg-black/80"
                />
              </div>
              <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.25rem" }}>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--color-text)", lineHeight: 1.2 }}>
                    {achievement.title}
                  </h4>
                  <span style={{ fontSize: "0.65rem", color: "var(--color-accent)", whiteSpace: "nowrap", marginLeft: "0.5rem", marginTop: "0.1rem", fontFamily: "var(--font-mono)" }}>
                    {achievement.date}
                  </span>
                </div>
                <p style={{ fontSize: "0.7rem", color: "var(--color-text)", opacity: 0.8, marginBottom: "0.5rem", fontWeight: 500 }}>
                  {achievement.company}
                </p>
                <p style={{ fontSize: "0.78rem", color: "var(--color-muted)", lineHeight: 1.5 }}>
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 p-2 bg-background/80 backdrop-blur border border-border rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ transform: "translate(50%, -50%)" }}
          aria-label="Next"
        >
          <ChevronRight size={20} style={{ color: "var(--color-text)" }} />
        </button>
      </div>

      {/* Lightbox for full image view */}
      {selectedImage && (
        <div 
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(4px)",
            padding: "2rem"
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div 
            style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="fixed top-4 right-4 md:top-6 md:right-8 z-[110] p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer"
              aria-label="Close fullscreen"
            >
              <X size={28} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={selectedImage} 
              alt="Achievement Full View" 
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: "0.5rem"
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
