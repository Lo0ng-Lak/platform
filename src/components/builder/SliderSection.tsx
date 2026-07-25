import type { CSSProperties } from "react";
import { useEffect, useCallback, useState } from "react";

export type SlideItem = {
  image: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonHref: string;
  textAlign: "left" | "center" | "right";
  contentVertical: "flex-start" | "center" | "flex-end";
  overlayColor: string;
  overlayOpacity: number;
  titleColor: string;
  subtitleColor: string;
  titleSize: number;
  subtitleSize: number;
};

export type SliderSectionProps = {
  slides: SlideItem[];
  height: number;
  autoplay: "yes" | "no";
  interval: number;
  loop: "yes" | "no";
  transition: "fade" | "slide" | "zoom";
  transitionMs: number;
  showArrows: "yes" | "no";
  showDots: "yes" | "no";
  textAnimation: "none" | "fadeUp" | "fadeIn" | "slideLeft" | "zoomIn";
  pauseOnHover: "yes" | "no";
};

const animKeyframes: Record<string, string> = {
  fadeUp: "puck-fade-up",
  fadeIn: "puck-fade-in",
  slideLeft: "puck-slide-left",
  zoomIn: "puck-zoom-in",
  none: "",
};

export function SliderSection({
  slides,
  height,
  autoplay,
  interval,
  loop,
  transition,
  transitionMs,
  showArrows,
  showDots,
  textAnimation,
  pauseOnHover,
}: SliderSectionProps) {
  const items = slides?.length
    ? slides
    : [
        {
          image:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
          title: "Slide title",
          subtitle: "Add more slides in the settings panel",
          buttonLabel: "Learn more",
          buttonHref: "#",
          textAlign: "center" as const,
          contentVertical: "center" as const,
          overlayColor: "#000000",
          overlayOpacity: 40,
          titleColor: "#ffffff",
          subtitleColor: "#f5f5f4",
          titleSize: 48,
          subtitleSize: 18,
        },
      ];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animTick, setAnimTick] = useState(0);

  const goTo = useCallback(
    (next: number) => {
      const len = items.length;
      if (len === 0) return;
      if (loop === "yes") {
        setIndex(((next % len) + len) % len);
      } else {
        setIndex(Math.max(0, Math.min(len - 1, next)));
      }
      setAnimTick((t) => t + 1);
    },
    [items.length, loop]
  );

  useEffect(() => {
    if (autoplay !== "yes" || paused || items.length < 2) return;
    const id = window.setInterval(() => {
      goTo(index + 1);
    }, Math.max(1500, interval));
    return () => window.clearInterval(id);
  }, [autoplay, paused, interval, index, goTo, items.length]);

  const animName = animKeyframes[textAnimation] || "";

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: `${height}px`,
        overflow: "hidden",
        background: "#0c0a09",
      }}
      onMouseEnter={() => pauseOnHover === "yes" && setPaused(true)}
      onMouseLeave={() => pauseOnHover === "yes" && setPaused(false)}
    >
      <style>{`
        @keyframes puck-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes puck-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes puck-slide-left {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes puck-zoom-in {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {items.map((slide, i) => {
        const active = i === index;
        let transform = "translateX(0) scale(1)";
        let opacity = active ? 1 : 0;

        if (transition === "slide") {
          opacity = 1;
          transform = `translateX(${(i - index) * 100}%)`;
        } else if (transition === "zoom") {
          transform = active ? "scale(1)" : "scale(1.08)";
          opacity = active ? 1 : 0;
        }

        return (
          <div
            key={i}
            aria-hidden={!active}
            style={{
              position: "absolute",
              inset: 0,
              opacity,
              transform,
              transition: `opacity ${transitionMs}ms ease, transform ${transitionMs}ms ease`,
              zIndex: active ? 2 : 1,
              pointerEvents: active ? "auto" : "none",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt={slide.title || `Slide ${i + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: slide.overlayColor,
                opacity: (slide.overlayOpacity ?? 0) / 100,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: slide.contentVertical || "center",
                justifyContent:
                  slide.textAlign === "left"
                    ? "flex-start"
                    : slide.textAlign === "right"
                      ? "flex-end"
                      : "center",
                padding: "48px 64px",
              }}
            >
              <div
                key={`${animTick}-${i}`}
                style={{
                  maxWidth: 720,
                  textAlign: slide.textAlign,
                  animation:
                    active && animName
                      ? `${animName} ${Math.max(400, transitionMs)}ms ease both`
                      : undefined,
                }}
              >
                {slide.title ? (
                  <h2
                    style={{
                      margin: 0,
                      color: slide.titleColor,
                      fontSize: slide.titleSize,
                      fontWeight: 700,
                      lineHeight: 1.15,
                      letterSpacing: -0.5,
                    }}
                  >
                    {slide.title}
                  </h2>
                ) : null}
                {slide.subtitle ? (
                  <p
                    style={{
                      margin: "14px 0 0",
                      color: slide.subtitleColor,
                      fontSize: slide.subtitleSize,
                      lineHeight: 1.6,
                    }}
                  >
                    {slide.subtitle}
                  </p>
                ) : null}
                {slide.buttonLabel ? (
                  <a
                    href={slide.buttonHref || "#"}
                    style={{
                      display: "inline-flex",
                      marginTop: 22,
                      padding: "12px 20px",
                      background: "#047857",
                      color: "#fff",
                      borderRadius: 8,
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    {slide.buttonLabel}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}

      {showArrows === "yes" && items.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goTo(index - 1)}
            style={arrowStyle("left")}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => goTo(index + 1)}
            style={arrowStyle("right")}
          >
            ›
          </button>
        </>
      ) : null}

      {showDots === "yes" && items.length > 1 ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 18,
            zIndex: 5,
            display: "flex",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              style={{
                width: i === index ? 22 : 8,
                height: 8,
                borderRadius: 99,
                border: "none",
                background: i === index ? "#fff" : "rgba(255,255,255,0.45)",
                cursor: "pointer",
                transition: "width 200ms ease",
              }}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function arrowStyle(side: "left" | "right"): CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    [side]: 16,
    transform: "translateY(-50%)",
    zIndex: 5,
    width: 42,
    height: 42,
    borderRadius: "50%",
    border: "none",
    background: "rgba(0,0,0,0.45)",
    color: "#fff",
    fontSize: 28,
    lineHeight: 1,
    cursor: "pointer",
  };
}
