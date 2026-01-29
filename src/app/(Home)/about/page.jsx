"use client";
import GlassCard from "@/components/GlassCard";
import { IconEye, IconHeart, IconTarget, IconUsers } from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function About() {
  const team = [
    {
      name: "Alex Rivera",
      role: "Founder & CEO",
      bio: "Former HR Tech leader with 15 years of recruitment experience.",
    },
    {
      name: "Jamie Chen",
      role: "CTO",
      bio: "AI specialist passionate about solving hiring challenges with technology.",
    },
    {
      name: "Morgan Taylor",
      role: "Head of Product",
      bio: "UX expert dedicated to making recruitment effortless for everyone.",
    },
    {
      name: "Sam Johnson",
      role: "VP of Customer Success",
      bio: "Committed to helping companies maximize their hiring potential.",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "Founded",
      description:
        "Hire-Hub was born from a vision to revolutionize recruitment",
    },
    {
      year: "2021",
      title: "First 100 Customers",
      description: "Reached our first major milestone with companies worldwide",
    },
    {
      year: "2022",
      title: "AI Integration",
      description: "Launched our intelligent matching and filtering systems",
    },
    {
      year: "2023",
      title: "5,000+ Companies",
      description: "Trusted by thousands of organizations globally",
    },
  ];

  const values = [
    {
      icon: IconTarget,
      title: "Innovation",
      description:
        "Constantly pushing boundaries to improve how companies hire",
    },
    {
      icon: IconEye,
      title: "Transparency",
      description: "Open, honest communication with candidates and companies",
    },
    {
      icon: IconHeart,
      title: "Empathy",
      description: "Understanding the human side of recruitment",
    },
    {
      icon: IconUsers,
      title: "Inclusivity",
      description: "Building tools that promote fair, unbiased hiring",
    },
  ];
  return (
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
                Our Mission:{" "}
                <span className="bg-linear-to-b from-primary to-secondary bg-clip-text text-transparent">
                  Better Hiring for Everyone
                </span>
              </h1>
              <p className="text-xl text-base-content/80">
                We're building the future of recruitment—where finding the right
                job and hiring the right person is faster, fairer, and more
                effective.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-base-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard>
                  <h2 className="text-3xl font-bold text-base-content mb-6">
                    Why We Built Hire-Hub
                  </h2>
                  <div className="space-y-4 text-base-content/80">
                    <p>
                      Recruitment has always been broken. Candidates spend hours
                      applying to jobs only to never hear back. Recruiters drown
                      in resumes, struggling to find qualified candidates. The
                      process is slow, expensive, and frustrating for everyone
                      involved.
                    </p>
                    <p>
                      We knew there had to be a better way. That's why we
                      created Hire-Hub—a platform that uses smart technology to
                      make hiring efficient, fair, and actually enjoyable.
                    </p>
                    <p>
                      Today, thousands of companies use Hire-Hub to find great
                      talent faster. Candidates get real-time updates and
                      transparent feedback. And recruiters finally have tools
                      that actually help them do their jobs better.
                    </p>
                    <p className="text-base-content font-semibold">
                      This is just the beginning. We're committed to
                      continuously improving recruitment for everyone.
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-base-300">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-base-content mb-4">
                Our Values
              </h2>
              <p className="text-xl text-base-content/80 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <GlassCard key={index} delay={index * 0.1}>
                  <div className="p-3 rounded-lg bg-linear-to-b from-primary/20 to-primary/40 w-fit mb-4">
                    <value.icon className="h-6 w-6 text-primary-content" />
                  </div>
                  <h3 className="text-lg font-semibold text-base-content mb-2">
                    {value.title}
                  </h3>
                  <p className="text-base-content/80 text-sm">
                    {value.description}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-base-100">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-base-content mb-4">
                Our Journey
              </h2>
              <p className="text-xl text-base-content/80 max-w-2xl mx-auto">
                Key milestones in building the recruitment platform of the
                future
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <GlassCard>
                      <div className="flex gap-6">
                        <div className="shrink-0">
                          <div className="w-16 h-16 rounded-lg bg-linear-to-b from-primary/20 to-primary/40 flex items-center justify-center">
                            <span className="text-base-content font-bold">
                              {milestone.year}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-base-content mb-2">
                            {milestone.title}
                          </h3>
                          <p className="text-base-content/80">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-base-300">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-base-content mb-4">
                Meet the Team
              </h2>
              <p className="text-xl text-base-content/80 max-w-2xl mx-auto">
                The people behind Hire-Hub's success
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {team.map((member, index) => (
                <GlassCard key={index} delay={index * 0.1}>
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-linear-to-b from-primary/20 to-primary/40 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-base-content mb-1">
                      {member.name}
                    </h3>
                    <div className="text-sm text-primary font-medium mb-3">
                      {member.role}
                    </div>
                    <p className="text-sm text-base-content/80">{member.bio}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
