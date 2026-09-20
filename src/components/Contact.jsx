import { useState } from "react";
import { api } from "../api.js";
import { useData, openExternalUrl, IMG_BASE } from "../utils/helpers.js";
import { Loading, Err } from "./Common.jsx";

export default function Contact() {
  const { data, loading, error } = useData(api.getAbout);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ state: "idle", message: "" });

  if (loading)
    return (
      <section className="section" id="contact">
        <div className="container">
          <Loading />
        </div>
      </section>
    );
  if (error)
    return (
      <section className="section" id="contact">
        <div className="container">
          <Err msg={error} />
        </div>
      </section>
    );
  const me = (data || [])[0];
  if (!me) return null;

  const formSubmitToken = "7fba0790a2bf3606f1af487b47df3fd6";
  const ownerName = me.name || "Muralidharan A";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.state === "error") {
      setStatus({ state: "idle", message: "" });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = formData.subject.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      setStatus({
        state: "error",
        message:
          "Please fill in all fields (Name, Email, Subject/Purpose, Message).",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setStatus({
        state: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    setStatus({ state: "submitting", message: "Sending message..." });

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${formSubmitToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            _subject: `[Portfolio Contact] ${trimmedSubject} - from ${trimmedName}`,
            subject: trimmedSubject,
            message: trimmedMessage,
            _template: "table",
            _captcha: "false",
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus({
        state: "success",
        message: "Message sent successfully!",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Submit error:", err);
      setStatus({
        state: "error",
        message:
          "Could not send message. Please check your connection or try again.",
      });
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setStatus({ state: "idle", message: "" });
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Get in touch</div>
          <h2 className="section-title">
            Contact <span>Me</span>
          </h2>
          <div className="section-line" />
        </div>
        <div className="contact-grid">
          <div className="contact-info fade-in">
            <h3>Let's work together</h3>
            <p>
              Have a project in mind or just want to say hi? My inbox is always
              open.
            </p>
            <div className="contact-items">
              {me.email && (
                <div className="contact-item">
                  <div className="contact-item-icon">📧</div>
                  <div>
                    <div className="contact-item-label">Email</div>
                    <div className="contact-item-value">
                      <a
                        href={`mailto:${me.email}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {me.email}
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {me.mobile && (
                <div className="contact-item">
                  <div className="contact-item-icon">📱</div>
                  <div>
                    <div className="contact-item-label">Phone</div>
                    <div className="contact-item-value">{me.mobile}</div>
                  </div>
                </div>
              )}
              {me.loc && (
                <div className="contact-item">
                  <div className="contact-item-icon">📍</div>
                  <div>
                    <div className="contact-item-label">Location</div>
                    <div className="contact-item-value">{me.loc}</div>
                  </div>
                </div>
              )}
            </div>
            <div className="contact-social">
              <h4>Connect & Profiles</h4>
              <div className="contact-social-buttons">
                {me.linkedId && (
                  <button
                    type="button"
                    className="contact-profile-card btn-linkedin-profile"
                    onClick={(e) => {
                      e.stopPropagation();
                      openExternalUrl(me.linkedId);
                    }}
                    title="Open LinkedIn Profile"
                  >
                    <div className="profile-card-icon linkedin-brand-icon">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </div>
                    <div className="profile-card-content">
                      <div className="profile-card-name">LinkedIn</div>
                      <div className="profile-card-spec">Profile</div>
                    </div>
                    <span className="profile-card-arrow">↗</span>
                  </button>
                )}
                {me.gitId && (
                  <button
                    type="button"
                    className="contact-profile-card btn-github-profile"
                    onClick={(e) => {
                      e.stopPropagation();
                      openExternalUrl(me.gitId);
                    }}
                    title="Open GitHub Profile"
                  >
                    <div className="profile-card-icon github-brand-icon">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                    </div>
                    <div className="profile-card-content">
                      <div className="profile-card-name">GitHub</div>
                      <div className="profile-card-spec">Repositories</div>
                    </div>
                    <span className="profile-card-arrow">↗</span>
                  </button>
                )}
              </div>

              <div className="contact-resume-container">
                {me.resume ? (
                  <a
                    href={`${IMG_BASE}${me.resume}`}
                    download={`${ownerName.replace(/\s+/g, "_")}_Resume.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-contact-resume"
                    title="Download Official Resume / CV"
                  >
                    <div className="resume-btn-icon-box">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="12" y1="18" x2="12" y2="12"></line>
                        <line x1="9" y1="15" x2="12" y2="18"></line>
                        <line x1="15" y1="15" x2="12" y2="18"></line>
                      </svg>
                    </div>
                    <div className="resume-btn-text">
                      <div className="resume-btn-title">Download Resume</div>
                      <div className="resume-btn-desc">
                        Curriculum Vitae (PDF)
                      </div>
                    </div>
                    <span className="resume-btn-arrow">⬇</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    className="btn-contact-resume btn-contact-resume-empty"
                    onClick={() =>
                      alert(
                        "Resume has not been uploaded yet. You can upload it via the Admin Panel!",
                      )
                    }
                    title="Resume will be downloadable once uploaded in admin panel"
                  >
                    <div className="resume-btn-icon-box">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                    </div>
                    <div className="resume-btn-text">
                      <div className="resume-btn-title">Download Resume</div>
                      <div className="resume-btn-desc">
                        Upload in Admin Panel
                      </div>
                    </div>
                    <span className="resume-btn-arrow" style={{ opacity: 0.5 }}>
                      ⏳
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="contact-form-card card fade-in">
            <div className="contact-form-header">
              <span className="contact-form-badge">✉️ Get In Touch</span>
              <h3 className="contact-form-title">Send a Message</h3>
              <p className="contact-form-subtitle">
                Fill out the details below to send a message directly to{" "}
                <strong>{ownerName}</strong>.
              </p>
            </div>

            {status.state === "success" ? (
              <div className="contact-form-success fade-in">
                <div className="success-badge-icon">
                  <svg
                    width="56"
                    height="56"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h4 className="success-title">Message sent successfully!</h4>
                <p className="success-desc">
                  Thank you! Your message has been sent directly to{" "}
                  <strong>{ownerName}</strong>'s email inbox.
                </p>
                <button
                  type="button"
                  className="btn btn-primary btn-send-another"
                  onClick={handleReset}
                >
                  <span>Send Another Message</span>
                  <span className="btn-arrow">↺</span>
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleFormSubmit}>
                {status.state === "error" && (
                  <div className="form-alert-error">⚠️ {status.message}</div>
                )}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      Your Name <span className="req">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      className="form-input"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status.state === "submitting"}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">
                      Your Email <span className="req">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="e.g. john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status.state === "submitting"}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">
                    Subject / Purpose <span className="req">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    className="form-input"
                    placeholder="e.g. Job Opportunity / Project Discussion"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={status.state === "submitting"}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Message <span className="req">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="form-textarea"
                    rows="4"
                    placeholder="Describe your project, opportunity, or message..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status.state === "submitting"}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-submit-message"
                  disabled={status.state === "submitting"}
                  style={
                    status.state === "submitting"
                      ? { opacity: 0.85, cursor: "wait" }
                      : undefined
                  }
                >
                  {status.state === "submitting" ? (
                    <>
                      <span className="btn-spinner" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message to {ownerName}</span>
                      <span className="btn-arrow">📤</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
