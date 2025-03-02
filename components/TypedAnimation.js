"use client";

import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

function TypedAnimation() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Management", "Monitoring", "Tracking", "Improving"],
      typeSpeed: 80,
      backSpeed: 50,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return <span ref={el} className="text-teal-600"></span>;
}

export default TypedAnimation;
