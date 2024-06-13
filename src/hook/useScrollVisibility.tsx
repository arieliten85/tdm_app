// useScrollVisibility.ts
import { useState, useEffect } from "react";

export const useScrollVisibility = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(true);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        setIsSearchVisible(false);
      } else {
        setIsSearchVisible(true);
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isSearchVisible;
};
