"use client";
import GlassCard from "@/components/GlassCard";
import {
  IconBell,
  IconBolt,
  IconBriefcase,
  IconChartBar,
  IconCircleCheck,
  IconFileText,
  IconFilter,
  IconShield,
  IconTarget,
  IconUsers,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
const Features = () => {
  const coreFeatures = [
    {
      icon: IconBriefcase,
      title: "Smart Job Posting",
      description:
        "Create compelling job posts with AI assistance. Use pre-built templates for common roles and set eligibility filters to attract the right candidates from the start.",
      benefits: [
        "AI-powered job description generator",
        "Industry-specific role templates",
        "Automatic eligibility filters",
        "Multi-platform posting",
      ],
    },
    {
      icon: IconFilter,
      title: "Automatic Candidate Filtering",
      description:
        "Let our intelligent system do the heavy lifting. Filter candidates automatically based on degree, skills, experience, and previous application history.",
      benefits: [
        "Smart degree verification",
        "Skills-based matching",
        "Experience level filtering",
        "Application history tracking",
      ],
    },
    {
      icon: IconUsers,
      title: "Employee Referral System",
      description:
        "Tap into your team's network with a streamlined referral process. Track referrals, manage rewards, and find quality candidates through trusted connections.",
      benefits: [
        "Simple referral submission",
        "Automated reward tracking",
        "Referral performance analytics",
        "Built-in communication tools",
      ],
    },
    {
      icon: IconCircleCheck,
      title: "Assessment Engine",
      description:
        "Evaluate candidates comprehensively with multiple assessment types. From MCQs to coding challenges, ensure you're making data-driven hiring decisions.",
      benefits: [
        "Multiple question types (MCQ, logic, coding)",
        "Custom assessment creation",
        "Automated scoring",
        "Detailed performance reports",
      ],
    },
    {
      icon: IconShield,
      title: "Role-Based Login",
      description:
        "Secure, personalized access for every stakeholder. Admins, HR, companies, candidates, and employees all get tailored dashboards and permissions.",
      benefits: [
        "5 distinct user roles",
        "Customized dashboards",
        "Granular permissions",
        "Secure authentication",
      ],
    },
    {
      icon: IconBell,
      title: "Real-Time Status Tracking",
      description:
        "Keep everyone informed with live updates. Candidates know where they stand, and recruiters can monitor every application's progress instantly.",
      benefits: [
        "Live application status",
        "Automated notifications",
        "Progress milestones",
        "Communication timeline",
      ],
    },
  ];

  const additionalFeatures = [
    {
      icon: IconChartBar,
      title: "Analytics Dashboard",
      description:
        "Track hiring metrics and make informed decisions with comprehensive analytics.",
    },
    {
      icon: IconBolt,
      title: "Quick Actions",
      description:
        "Bulk operations and shortcuts to speed up repetitive recruitment tasks.",
    },
    {
      icon: IconTarget,
      title: "Candidate Sourcing",
      description:
        "Integrated sourcing tools to find passive candidates and build talent pools.",
    },
    {
      icon: IconFileText,
      title: "Document Management",
      description:
        "Organize and manage resumes, portfolios, and certificates in one place.",
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
              <div className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
                Complete Feature Set
              </div>
              <h1 className="text-5xl font-bold text-base-content mb-6">
                Everything You Need to{" "}
                <span className="bg-linear-to-b from-primary to-secondary bg-clip-text text-transparent">
                  Hire Successfully
                </span>
              </h1>
              <p className="text-xl text-base-content/80">
                Powerful recruitment tools designed to save time, improve
                quality, and streamline your entire hiring process.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Core Features Section */}
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
                Core Features
              </h2>
              <p className="text-xl text-base-content/80 max-w-2xl mx-auto">
                The essential tools that make Hire-Hub the complete recruitment
                solution
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {coreFeatures.map((feature, index) => (
                <GlassCard key={index} delay={index * 0.1} className="h-full">
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-linear-to-b from-primary/20 to-primary/40 w-fit">
                      <feature.icon className="h-8 w-8 text-primary-content" />
                    </div>
                    <h3 className="text-2xl font-semibold text-base-content">
                      {feature.title}
                    </h3>
                    <p className="text-base-content/80">
                      {feature.description}
                    </p>
                    <div className="space-y-2 pt-2">
                      {feature.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <IconCircleCheck className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                          <span className="text-sm text-base-content">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features Section */}
        <section className="py-20 bg-base-200">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-base-content mb-4">
                And Much More
              </h2>
              <p className="text-xl text-base-content/80 max-w-2xl mx-auto">
                Additional features to give you a competitive edge in
                recruitment
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {additionalFeatures.map((feature, index) => (
                <GlassCard key={index} delay={index * 0.1}>
                  <div className="p-3 rounded-lg bg-linear-to-b from-primary/20 to-primary/40 w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-primary-content" />
                  </div>
                  <h3 className="text-lg font-semibold text-base-content mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-base-content/80 text-sm">
                    {feature.description}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-20 bg-base-100">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <GlassCard className="text-center p-12">
                <h2 className="text-3xl font-bold text-base-content mb-4">
                  Seamless Integration
                </h2>
                <p className="text-xl text-base-content/80 mb-8">
                  Hire-Hub works with your existing tools and workflows. Import
                  data, sync calendars, and connect with your favorite HR
                  platforms.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="px-6 py-3 bg-accent text-accent-content font-medium rounded-lg">
                    Email Integration
                  </div>
                  <div className="px-6 py-3 bg-accent text-accent-content font-medium rounded-lg">
                    Calendar Sync
                  </div>
                  <div className="px-6 py-3 bg-accent text-accent-content font-medium rounded-lg">
                    API Access
                  </div>
                  <div className="px-6 py-3 bg-accent text-accent-content font-medium rounded-lg">
                    CSV Export
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Features;
