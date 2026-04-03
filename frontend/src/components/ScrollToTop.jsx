import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This forces the browser to the very top (0,0) every time the path changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use "smooth" if you want a sliding effect, but "instant" is standard for UX
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;