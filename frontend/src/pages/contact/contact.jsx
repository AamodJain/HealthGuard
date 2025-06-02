"use client"

import { useState } from "react"
import Navbar from "../../components/navbar/navbar"
import Footer from "../../components/footer/Footer"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import "./contact.css"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    feedbackType: "general",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState("idle")

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          feedbackType: "general",
        })
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-page">
      <Navbar />

      <div className="contact-outer">
        <div className="contact-inner">
          <div className="contact-header">
            <h1>
              Get In <span className="head">Touch</span>
            </h1>
            <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>

          <div className="contact-grid">
            {/* Contact Information */}
            <div className="info-column">
              <div className="card info-card">
                <h2>Contact Information</h2>
                <div className="info-list">
                  <div className="info-item">
                    <div className="info-icon">
                      <Mail className="icon blue" />
                    </div>
                    <div>
                      <p className="label">Email</p>
                      <p className="value">hello@edubuddy.com</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">
                      <Phone className="icon blue" />
                    </div>
                    <div>
                      <p className="label">Phone</p>
                      <p className="value">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">
                      <MapPin className="icon blue" />
                    </div>
                    <div>
                      <p className="label">Address</p>
                      <p className="value">123 Learning St, Education City, EC 12345</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="form-column">
              <div className="card form-card">
                <h2>Send us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="two-col">
                    <div className="form-group">
                      <label htmlFor="name">Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="feedbackType">Feedback Type</label>
                    <select
                      id="feedbackType"
                      name="feedbackType"
                      value={formData.feedbackType}
                      onChange={handleInputChange}
                    >
                      <option value="general">General Feedback</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="support">Support</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="Brief description of your message"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder="Tell us more about your feedback, suggestions, or questions..."
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className="feedback success">
                      <p>Thank you! Your message has been sent successfully.</p>
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="feedback error">
                      <p>Sorry, there was an error sending your message. Please try again.</p>
                    </div>
                  )}

                  <button type="submit" disabled={isSubmitting} className="btn-submit">
                    {isSubmitting ? <div className="spinner" /> : <Send className="icon white" />}
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
