import React from 'react';
import { FAQ } from '@/components/ui/faq-tabs';

const FAQDemo = () => {
  const categories = {
    "ai-automation": "AI Automation",
    "web-dev": "Web Development", 
    "graphics-design": "Graphics Design"
  };

  const faqData = {
    "ai-automation": [
      {
        question: "How does AI automation benefit my business?",
        answer: "AI automation streamlines operational pipelines, automates database syncing, and processes complex documents, reducing manual tasks by up to 90% and unlocking massive efficiency gains."
      },
      {
        question: "Are custom automation agents secure?",
        answer: "Yes, security is our primary focus. We build custom agents with strict data boundaries, ensuring your proprietary company data is never used to train public LLM models."
      },
      {
        question: "How long does it take to deploy an AI agent?",
        answer: "A typical custom agent takes between 2 to 4 weeks to train, test, and integrate seamlessly into your existing software stack."
      }
    ],
    "web-dev": [
      {
        question: "Which technologies do you use for web projects?",
        answer: "We build premium frontends using React, Next.js, Tailwind CSS, and custom 3D web graphics via Spline and Three.js for maximum performance and design aesthetic."
      },
      {
        question: "Will my website be fully responsive?",
        answer: "Absolutely. Every design is crafted with mobile-first responsiveness, ensuring pixel-perfect layouts on smartphones, tablets, and desktops."
      },
      {
        question: "Can we integrate 3D elements later?",
        answer: "Yes, our projects are architected to be highly flexible so you can easily add interactive 3D elements and animations at any time."
      }
    ],
    "graphics-design": [
      {
        question: "What design services do you offer?",
        answer: "We offer comprehensive brand identity design, custom vector assets, interactive UI/UX prototyping, and immersive 3D scene designs."
      },
      {
        question: "Do you design custom assets from scratch?",
        answer: "Yes, all design elements, icons, and illustrations are custom-crafted specifically to align with your brand's unique identity."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-black">
      <FAQ 
        title="Frequently Asked Questions"
        subtitle="Let's answer some questions"
        categories={categories}
        faqData={faqData}
      />
    </div>
  );
};

export default FAQDemo;
