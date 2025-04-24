"use client";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../lib/firebase"; // Adjust path as needed
import emailjs from "@emailjs/browser";
import { Toaster, toast } from "sonner";
import { FaHeadset, FaEnvelope, FaClipboardList } from "react-icons/fa";

export default function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);

  // Initialize Firebase Auth
  const auth = getAuth(app);

  // Check auth state on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // Pre-fill form with user data if available
        setFormData(prev => ({
          ...prev,
          email: user.email || "",
          name: user.displayName || ""
        }));
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        {
          to_name: "Support Team",
          from_name: formData.name || "Anonymous User",
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message,
          user_id: user?.uid || "not_logged_in",
          current_date: new Date().toLocaleDateString(),
          year: new Date().getFullYear()
        },
        process.env.NEXT_PUBLIC_PUBLIC_KEY
      );

      toast.success("Support ticket submitted successfully!");
      setFormData({
        name: user?.displayName || "",
        email: user?.email || "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to submit support ticket");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="support-container p-6 mx-auto">
      <Toaster position="top-center" />
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaHeadset className="text-blue-500" />
        Support Center
      </h2>

      {user && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            You&apos;re submitting as: <span className="font-medium">{user.email}</span>
          </p>
        </div>
      )}

      {/* Support Ticket Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaClipboardList className="text-blue-500" />
          Submit a Support Ticket
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Your Name {!user && "(Optional)"}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!!user?.displayName} // Disable if name comes from Firebase
              className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent ${user?.displayName ? "bg-gray-100" : ""
                }`}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={!!user?.email} // Disable if email comes from Firebase
              className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent ${user?.email ? "bg-gray-100" : ""
                }`}
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="subject">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              placeholder="What is your issue about ?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="message">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent min-h-[150px]"
              placeholder="Please describe your issue in detail..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Ticket"
            )}
          </button>
        </form>
      </div>

      {/* Contact Information */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaEnvelope className="text-blue-500" />
          Direct Contact
        </h3>
        <p className="text-gray-700 mb-4">
          For immediate assistance, please contact our support team directly:
        </p>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <FaHeadset className="text-blue-500 mr-2" />
            <a href="tel:+911234567890" className="text-blue-600 hover:underline">
              +91 12345 67890
            </a>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Our typical response time is within 24 hours on business days.
          </p>
        </div>
      </div>
    </div>
  );
}