"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { IconMail, IconMapPin, IconPhone, IconSend } from "@tabler/icons-react";
import GlassCard from "@/components/GlassCard";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Message sent! We'll get back to you as soon as possible.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: IconMail,
      title: "Email",
      value: "hello@hirehub.com",
      link: "mailto:hello@hirehub.com",
    },
    {
      icon: IconPhone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: IconMapPin,
      title: "Office",
      value: "123 Business Ave, Suite 100\nSan Francisco, CA 94105",
      link: "#",
    },
  ];

  return (
    <>
      <>
        <div className="min-h-screen">
          {/* Hero Section */}
          <section className="bg-linear-to-b from-base-300/20 to-primary/20 py-20 min-h-[calc(70vh)] flex items-center">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h1 className="text-5xl font-bold text-base-content mb-6">
                  Get in{" "}
                  <span className="bg-linear-to-b from-primary to-secondary bg-clip-text text-transparent">
                    Touch
                  </span>
                </h1>
                <p className="text-xl text-base-content/80">
                  Have questions about Hire-Hub? We're here to help. Send us a
                  message and we'll respond as soon as possible.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Contact Form & Info Section */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <GlassCard>
                    <h2 className="text-2xl font-bold text-base-content mb-6">
                      Send us a Message
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <fieldset className="fieldset">
                        <legend className="fieldset-legend">
                          Name <span className="text-error">*</span>
                        </legend>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter Your Name"
                          className="input input-primary w-full"
                        />
                      </fieldset>
                      <fieldset className="fieldset">
                        <legend className="fieldset-legend">
                          Email <span className="text-error">*</span>
                        </legend>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Enter Your Email"
                          className="input input-primary w-full"
                        />
                      </fieldset>
                      <fieldset className="fieldset">
                        <legend className="fieldset-legend">
                          Subject <span className="text-error">*</span>
                        </legend>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="What's this about?"
                          className="input input-primary w-full"
                        />
                      </fieldset>
                      <fieldset className="fieldset">
                        <legend className="fieldset-legend">
                          Message <span className="text-error">*</span>
                        </legend>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Tell us more..."
                          className="textarea textarea-primary w-full"
                        />
                      </fieldset>
                      <button
                        type="submit"
                        className="w-full btn btn-primary btn-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            <IconSend className="mr-2 h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </GlassCard>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-base-content mb-6">
                      Contact Information
                    </h2>
                    <p className="text-base-content/80 mb-8">
                      Reach out to us through any of these channels. We're
                      always happy to hear from you!
                    </p>
                  </div>

                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <GlassCard key={index} delay={index * 0.1}>
                        <a
                          href={info.link}
                          className="flex items-start gap-4 group"
                        >
                          <div className="p-3 rounded-lg bg-linear-to-bl from-primary/20 to-secondary/20 group-hover:bg-linear-to-bl group-hover:from-primary/40 group-hover:to-secondary/40 transition-all">
                            <info.icon className="h-6 w-6 text-primary group-hover:text-primary-content transition-colors" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-base-content mb-1">
                              {info.title}
                            </h3>
                            <p className="text-base-content/80 text-sm whitespace-pre-line">
                              {info.value}
                            </p>
                          </div>
                        </a>
                      </GlassCard>
                    ))}
                  </div>

                  {/* Map Placeholder */}
                  <GlassCard>
                    <div className="aspect-video bg-linear-to-bl from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                      <IconMapPin className="h-12 w-12 text-primary" />
                    </div>
                  </GlassCard>
                </motion.div>
              </div>
            </div>
          </section>

          {/* FAQ or Additional Info Section */}
          <section className="py-20 bg-linear-to-t from-primary/20 to-secondary/20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h2 className="text-3xl font-bold text-base-content mb-4">
                  Need Quick Answers?
                </h2>
                <p className="text-xl text-base-content/80 mb-8">
                  Check out our documentation and resources for instant help
                  with common questions.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="btn btn-primary btn-lg btn-outline">
                    View Documentation
                  </button>
                  <button className="btn btn-primary btn-lg btn-outline">
                    FAQs
                  </button>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </>
    </>
  );
}
