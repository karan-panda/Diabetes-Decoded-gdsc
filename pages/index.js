"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import logo from "../public/images/second.png";
import { AccordionDemo } from "../components/AccordianDemo"; // Import the AccordionDemo component


const TypedAnimation = dynamic(() => import("../components/TypedAnimation"), {
  ssr: false,
});

function LandingPage() {
  useEffect(() => {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 82,
          density: {
            enable: true,
            value_area: 787.7116975187079,
          },
        },
        color: {
          value: "#181515",
        },
        shape: {
          type: "polygon",
          stroke: {
            width: 1,
            color: "#000000",
          },
          polygon: {
            nb_sides: 3,
          },
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 0.5437824870051982,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 255.89764094362266,
          color: "#d3d3d3",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });

    var count_particles, stats, update;
    if (typeof Stats !== "undefined") {
      stats = new Stats();
      stats.setMode(0);
      stats.domElement.style.position = "absolute";
      stats.domElement.style.left = "0px";
      stats.domElement.style.top = "0px";
      document.body.appendChild(stats.domElement);
      count_particles = document.querySelector(".js-count-particles");
      update = function () {
        stats.begin();
        stats.end();
        if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
          count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
        }
        requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
    }
  }, []);

  const features = [
    {
      title: "Smart Glucose Tracking",
      description:
        "Advanced AI-powered glucose monitoring system that learns from your patterns and provides predictive insights.",
      icon: "📊",
    },
    {
      title: "Personalized Diet Plans",
      description:
        "Custom meal plans and recommendations based on your glucose levels, preferences, and dietary requirements.",
      icon: "🥗",
    },
    {
      title: "Exercise Programs",
      description:
        "Tailored workout routines that help maintain optimal glucose levels while improving overall fitness.",
      icon: "💪",
    },
    {
      title: "Medication Management",
      description:
        "Smart reminders and tracking for medication schedules, with refill alerts and interaction warnings.",
      icon: "💊",
    },
    {
      title: "Community Support",
      description:
        "Connect with others on similar journeys, share experiences, and get motivation from success stories.",
      icon: "👥",
    },
    {
      title: "Expert Consultation",
      description:
        "Direct access to healthcare professionals for guidance and regular check-ins on your progress.",
      icon: "👨‍⚕️",
    },
  ];

  const faqs = [
    {
      question: "How does the glucose tracking system work?",
      answer:
        "Our system uses advanced AI algorithms to analyze your glucose readings, helping identify patterns and predict potential fluctuations. It learns from your daily habits and provides personalized insights.",
    },
    {
      question: "Can I connect with healthcare professionals through the app?",
      answer:
        "Yes! Our platform allows you to connect with certified diabetes educators and healthcare professionals for virtual consultations and ongoing support.",
    },
    {
      question: "Is my data secure?",
      answer:
        "We take data security seriously. All your health information is encrypted and stored securely following HIPAA compliance standards.",
    },
    {
      question: "How personalized are the diet and exercise plans?",
      answer:
        "Our plans are highly personalized, taking into account your glucose patterns, lifestyle, preferences, and health goals. They adapt based on your progress and feedback.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 relative">
      <div id="particles-js" className="absolute inset-0 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <Image
              // src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rMIA7Qoj7xmzy7pDcIyL6xrCZfVV1m.png"
              src={logo}
              alt="Diabetes Decoded Logo"
              width={60}
              height={60}
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <span className="text-2xl font-bold  text-gray-900">Diabetes <span className="text-teal-600">Decoded</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/features"  className="text-gray-600 font-semibold text-lg hover:text-teal-600">
              Features
            </Link>
            <Link href="/faq" className="text-gray-600  font-semibold text-lg hover:text-teal-600">
              FAQ
            </Link>
            <Link href="/about" className="text-gray-600 font-semibold  text-lg hover:text-teal-600">
              About
            </Link>
            <Link href="/login" className="text-gray-600 font-semibold  text-lg hover:text-teal-600">
              Login
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="py-20 text-center max-w-4xl mx-auto">
          <p className="text-6xl text-teal-600 font-semibold mb-4">All in One</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Diabetes <TypedAnimation />
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your comprehensive companion for personalized diabetes management and a healthier lifestyle. Smart tracking,
            expert guidance, and community support - all in one place.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/login">
              <button className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105">
                Start Now
              </button>
            </Link>
            <Link href="/features">
              <button className="px-8 py-3 bg-white hover:bg-gray-50 text-teal-600 border border-teal-600 rounded-full text-lg transition duration-300 flex items-center gap-2">
                Learn More <ChevronDown className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>

             {/* Features Section */}
        <section className="py-20" id="features">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Comprehensive Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 hover:scale-105"
              >
                <div className="text-4xl mb-4 flex justify-center items-center">
                  <span className="animate-bounce">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 text-center animate-fadeIn">{feature.title}</h3>
                <p className="text-gray-600 text-center animate-fadeIn">{feature.description}</p>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20" id="faq">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <AccordionDemo items={faqs} />
        </section>

            {/* CTA Section */}
        <section className="py-20 text-center">
          <div className="bg-teal-50 rounded-2xl p-12 max-w-4xl mx-auto animate-fadeInUp">
            <h2 className="text-3xl font-bold mb-6 animate-fadeIn">Ready to Take Control?</h2>
            <p className="text-xl text-gray-600 mb-8 animate-fadeIn">
              Join thousands of others who have transformed their diabetes management journey.
            </p>
            <Link href="/register">
              <button className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 animate-bounceIn">
                Get Started Today
              </button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-600 border-t">
          <div className="flex justify-center items-center gap-6 mb-4">
            <Link href="/privacy" className="hover:text-teal-600">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-teal-600">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-teal-600">
              Contact Us
            </Link>
          </div>
          <p>&copy; 2024 Diabetes Decoded. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;


