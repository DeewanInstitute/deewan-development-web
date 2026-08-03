import { useEffect, useState } from "react";

// Temporary diagnostic overlay — remove once the footer-visibility issue is confirmed fixed.
function DebugHud() {
  const [info, setInfo] = useState({
    scrollY: 0,
    maxScrollY: 0,
    bodyScrollHeight: 0,
    innerHeight: 0,
    footerTop: 0,
    footerBottom: 0,
    footerVisible: false,
  });

  useEffect(() => {
    const update = () => {
      const footer = document.querySelector("footer");
      const rect = footer ? footer.getBoundingClientRect() : null;
      setInfo({
        scrollY: Math.round(window.scrollY),
        maxScrollY: Math.round(document.body.scrollHeight - window.innerHeight),
        bodyScrollHeight: Math.round(document.body.scrollHeight),
        innerHeight: window.innerHeight,
        footerTop: rect ? Math.round(rect.top) : -1,
        footerBottom: rect ? Math.round(rect.bottom) : -1,
        footerVisible: rect ? rect.top < window.innerHeight && rect.bottom > 0 : false,
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const interval = setInterval(update, 300);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 8,
        right: 8,
        zIndex: 999999,
        background: "rgba(0,0,0,0.85)",
        color: "#0f0",
        fontFamily: "monospace",
        fontSize: 12,
        padding: "10px 14px",
        borderRadius: 6,
        lineHeight: 1.5,
        pointerEvents: "none",
      }}
    >
      <div>scrollY: {info.scrollY}</div>
      <div>maxScrollY: {info.maxScrollY}</div>
      <div>bodyScrollHeight: {info.bodyScrollHeight}</div>
      <div>innerHeight: {info.innerHeight}</div>
      <div>footer top/bottom: {info.footerTop} / {info.footerBottom}</div>
      <div style={{ color: info.footerVisible ? "#0f0" : "#f55" }}>
        footerVisible: {String(info.footerVisible)}
      </div>
    </div>
  );
}

export default DebugHud;
