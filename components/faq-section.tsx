"use client"

import { useState } from "react"
import { ChevronDown, X } from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface CategoryFAQ {
  name: string
  faqs: FAQItem[]
}

const FAQ_DATA: Record<string, CategoryFAQ> = {
  general: {
    name: "General",
    faqs: [
      {
        id: "g1",
        question: "What is Ceramic Coating and how does it work?",
        answer:
          "Ceramic coating is a liquid polymer that chemically bonds to your car's paint, creating a protective layer. It provides superior protection against UV rays, contaminants, and environmental damage while enhancing the glossiness of your vehicle.",
      },
      {
        id: "g2",
        question: "How long will the ceramic coating last?",
        answer:
          "Depending on the product quality and care, professional-grade ceramic coatings typically last 2 to 5 years, and can extend beyond that with proper maintenance.",
      },
      {
        id: "g3",
        question: "Can ceramic coating prevent scratches?",
        answer:
          "While ceramic coating provides excellent protection, it cannot completely prevent scratches. However, it significantly reduces the visibility of minor scratches and protects the clear coat underneath.",
      },
      {
        id: "g4",
        question: "Do I still need to wash my car after ceramic coating?",
        answer:
          "Yes, regular washing is essential to maintain the ceramic coating. We recommend washing your car every 2 weeks with pH-neutral soap to preserve the coating's effectiveness.",
      },
    ],
  },
  tint: {
    name: "Tint",
    faqs: [
      {
        id: "t1",
        question: "Is window tinting legal?",
        answer:
          "Window tinting laws vary by region. Our team is familiar with local regulations and will ensure your tint complies with all applicable laws.",
      },
      {
        id: "t2",
        question: "How long does window tinting last?",
        answer:
          "High-quality window tint typically lasts 5-10 years when professionally installed. The lifespan depends on the product quality and sun exposure.",
      },
      {
        id: "t3",
        question: "Can I tint all windows?",
        answer:
          "Most windows can be tinted, but front windshield and driver side window regulations vary by location. We'll advise you on what's legal in your area.",
      },
      {
        id: "t4",
        question: "Does tinting affect visibility at night?",
        answer:
          "No, high-quality automotive window tint does not significantly affect night visibility. Our professional-grade films are designed to maintain safety while providing UV protection.",
      },
    ],
  },
  coating: {
    name: "Coating",
    faqs: [
      {
        id: "c1",
        question: "What are the benefits of paint protection film?",
        answer:
          "Paint protection film (PPF) guards against rock chips, scratches, and UV damage. It's self-healing and maintains your car's original paint finish and resale value.",
      },
      {
        id: "c2",
        question: "Is ceramic coating better than wax?",
        answer:
          "Yes, ceramic coating provides longer-lasting protection (2-5 years vs 3-6 months) and superior resistance to contaminants, UV rays, and chemical damage compared to traditional wax.",
      },
      {
        id: "c3",
        question: "Can I apply ceramic coating myself?",
        answer:
          "While DIY ceramic coatings exist, professional application ensures proper preparation, even coverage, and optimal bonding for best results and longevity.",
      },
      {
        id: "c4",
        question: "How often should I reapply ceramic coating?",
        answer:
          "Professional ceramic coatings last 2-5 years with proper maintenance. We recommend annual inspections to determine if reapplication is needed.",
      },
    ],
  },
  ppf: {
    name: "PPF",
    faqs: [
      {
        id: "p1",
        question: "What is Paint Protection Film (PPF)?",
        answer:
          "PPF is a transparent polyurethane film applied to your car's paint to protect against minor scratches, rock chips, and UV damage while maintaining your car's original appearance.",
      },
      {
        id: "p2",
        question: "Does PPF yellow over time?",
        answer:
          "Premium quality PPF like the brands we use resist yellowing. Professional installation and maintenance ensure long-term clarity and protection.",
      },
      {
        id: "p3",
        question: "How is PPF applied?",
        answer:
          "Our technicians carefully measure and cut the PPF to fit your vehicle perfectly, then apply it using a special application fluid. The process typically takes 1-2 days depending on coverage.",
      },
      {
        id: "p4",
        question: "Can PPF be removed?",
        answer:
          "Yes, professional-grade PPF can be safely removed without damaging the paint beneath when applied and removed correctly by professionals.",
      },
    ],
  },
  wrapping: {
    name: "Wrapping",
    faqs: [
      {
        id: "w1",
        question: "What is vehicle wrapping?",
        answer:
          "Vehicle wrapping involves applying adhesive vinyl film to your car's exterior to change its appearance. It's perfect for customization, advertising, or protecting original paint.",
      },
      {
        id: "w2",
        question: "How long does a wrap last?",
        answer:
          "A professionally installed wrap typically lasts 5-7 years. Lifespan depends on climate conditions, vehicle usage, and maintenance.",
      },
      {
        id: "w3",
        question: "Will wrapping damage my car's paint?",
        answer:
          "No, professional wrapping does not damage original paint when installed and removed correctly. It actually protects the paint underneath.",
      },
      {
        id: "w4",
        question: "Can I wrap a partial or full vehicle?",
        answer:
          "Yes! We offer both full wraps and partial wraps for hoods, roofs, stripes, and specific panels. Our team will help you design the perfect look.",
      },
    ],
  },
  combo: {
    name: "Combo",
    faqs: [
      {
        id: "cb1",
        question: "What is included in combo packages?",
        answer:
          "Our combo packages combine multiple services like tinting, ceramic coating, and PPF to provide comprehensive protection at a better value.",
      },
      {
        id: "cb2",
        question: "Do combo packages save money?",
        answer:
          "Yes, our combo packages offer significant savings compared to purchasing individual services separately.",
      },
      {
        id: "cb3",
        question: "Can I customize my combo package?",
        answer: "We can tailor any combo package to match your specific needs and preferences.",
      },
      {
        id: "cb4",
        question: "How long does a complete combo service take?",
        answer:
          "Depending on the services included, a full combo package typically takes 2-4 days. Our team will provide an accurate timeline during consultation.",
      },
    ],
  },
}

const CATEGORIES = ["general", "tint", "coating", "ppf", "wrapping", "combo"]

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("general")
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>("g2")

  const currentCategoryData = FAQ_DATA[activeCategory]

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 lg:px-12">
        {/* Title - Left Side */}
        <div className="mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white relative inline-block">
            Everything
            <br />
            You Want To Know
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl bg-blue-600/50 -z-10 rounded-full w-60 md:w-80 h-16 md:h-20" />
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Left: Category Navigation */}
          <div className="lg:col-span-1">
            <nav className="grid grid-cols-3 lg:grid-cols-1 gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category)
                    setExpandedFAQ(null)
                  }}
                  className={`text-center lg:text-left px-2 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-300 font-medium capitalize text-xs md:text-base ${
                    activeCategory === category ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {FAQ_DATA[category].name}
                </button>
              ))}
            </nav>
          </div>

          {/* Right: FAQ Accordion with Background */}
          <div className="lg:col-span-3 relative">
            <div
              className="absolute inset-0 bg-cover bg-center rounded-lg"
              style={{
                backgroundImage: "url(/images/section-6-background.png)",
              }}
            />
            <div className="absolute inset-0 bg-black/70 rounded-lg" />

            <div className="relative z-10 p-4 md:p-8">
              {/* Category Label */}
              <div className="mb-4 md:mb-8">
                <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest mb-2 md:mb-4">
                  {currentCategoryData.name}
                </p>
              </div>

              {/* FAQ Items */}
              <div className="space-y-3 md:space-y-4">
                {currentCategoryData.faqs.map((faq) => (
                  <div key={faq.id} className="border-b border-gray-700 last:border-b-0">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                      className="w-full flex items-center justify-between py-3 md:py-4 text-left group"
                    >
                      <span className="text-white font-medium pr-4 text-sm md:text-base">{faq.question}</span>
                      <div className="flex-shrink-0 ml-2 md:ml-4">
                        {expandedFAQ === faq.id ? (
                          <X className="w-4 h-4 md:w-5 md:h-5 text-white transition-transform duration-300" />
                        ) : (
                          <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                        )}
                      </div>
                    </button>

                    {/* Expanded Content */}
                    {expandedFAQ === faq.id && (
                      <div className="overflow-hidden animate-in fade-in duration-300">
                        <div className="pb-3 md:pb-4 text-gray-300 text-xs md:text-sm leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
