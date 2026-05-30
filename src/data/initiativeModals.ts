// Comprehensive modal content for business initiatives
// Each initiative gets rich, detailed content that builds trust and demonstrates value

export interface ModalContent {
  id: string
  name: string
  tagline: string
  hero: {
    headline: string
    subheadline: string
    icon: string
    backgroundGradient: string
  }
  bitcoinPrinciples: {
    title: string
    principles: Array<{
      principle: string
      application: string
      benefit: string
    }>
  }
  businessDetails: {
    overview: string
    services: string[]
    uniqueValue: string[]
    socialProof: {
      testimonial: string
      author: string
      role: string
    }
  }
  pricing: {
    approach: string
    structure: string
    paymentMethods: string[]
    bitcoinAdvantage: string
  }
  location: {
    serviceArea: string
    availability: string
    nextSteps: string
  }
  callToAction: {
    primary: {
      text: string
      action: string
      url: string
    }
    secondary: {
      text: string
      action: string
      url: string
    }
    qualifier: string
  }
}

export const initiativeModals: Record<string, ModalContent> = {
  psab: {
    id: 'psab',
    name: 'Premium Spas & Billiards',
    tagline: 'Quality assets for health, family, and long-term value',
    hero: {
      headline: 'Invest in Therapeutic Wellness Infrastructure',
      subheadline: 'Hot tubs, saunas, and billiards tables that appreciate while improving your quality of life',
      icon: '🛁',
      backgroundGradient: 'from-blue-600 to-blue-800'
    },
    bitcoinPrinciples: {
      title: 'Sound Money Applied to Lifestyle Assets',
      principles: [
        {
          principle: 'Store of Value',
          application: 'Quality therapeutic equipment holds value better than depreciating consumer goods',
          benefit: 'Your wellness investment protects against inflation while providing daily benefits'
        },
        {
          principle: 'Proof of Work',
          application: 'We earn your business through superior craftsmanship and transparent processes',
          benefit: 'No hard selling - our work quality and customer satisfaction speak for themselves'
        },
        {
          principle: 'Time Preference',
          application: 'High-quality installations built for decades of use, not quick replacements',
          benefit: 'Lower total cost of ownership through durable, repairable, upgradeable systems'
        }
      ]
    },
    businessDetails: {
      overview: 'Premium Spas & Billiards specializes in therapeutic wellness infrastructure for health-conscious families. We partner with 9 leading manufacturers to provide hot tubs, saunas, cold plunge systems, and professional billiards tables that combine immediate family enjoyment with long-term asset value.',
      services: [
        'Therapeutic Hot Tub Installation & Service',
        'Traditional & Infrared Sauna Construction',
        'Cold Plunge & Contrast Therapy Systems',
        'Professional Billiards Tables & Game Rooms',
        'Ongoing Maintenance & Support Programs',
        'Custom Wellness Space Design Consultation'
      ],
      uniqueValue: [
        'Direct manufacturer partnerships ensuring best pricing',
        'Full-service installation with warranty protection',
        'Therapeutic focus - health benefits beyond recreation',
        'Quality-first approach using proven brands only',
        'Local support team for ongoing maintenance',
        'Flexible financing including Bitcoin payment options'
      ],
      socialProof: {
        testimonial: 'The hot tub has been transformational for our family\'s evening routine and my wife\'s chronic pain management. The quality is obvious and the service has been exceptional.',
        author: 'Michael R.',
        role: 'Recent Customer, McLean VA'
      }
    },
    pricing: {
      approach: 'Transparent Value-Based Pricing',
      structure: 'Starting investments from $8,000 for therapeutic hot tubs to $25,000+ for complete wellness spaces',
      paymentMethods: ['Traditional financing', 'Bitcoin payments (discount applied)', 'Cash purchases', 'Trade-in programs'],
      bitcoinAdvantage: 'Bitcoin payments receive 3% discount and priority scheduling - demonstrating preference for sound money'
    },
    location: {
      serviceArea: 'Washington DC Metro Area: Northern Virginia, Maryland, DC',
      availability: 'Full showroom appointments available - see products before purchasing',
      nextSteps: 'Schedule consultation to assess your space and discuss therapeutic goals'
    },
    callToAction: {
      primary: {
        text: 'Schedule Showroom Consultation',
        action: 'Book appointment to see products and get personalized recommendations',
        url: 'https://plebmoe.com/psab'
      },
      secondary: {
        text: 'Browse Product Catalog',
        action: 'Explore our manufacturer partners and product specifications',
        url: 'https://plebmoe.com/psab/products'
      },
      qualifier: 'Serious buyers only - we invest significant time in each consultation'
    }
  },

  pqr: {
    id: 'pqr',
    name: 'Penn Quarter Rules',
    tagline: 'AI-moderated discourse for high-signal community building',
    hero: {
      headline: 'Proof-of-Work Applied to Discussion',
      subheadline: 'Merit-based debates where the best ideas rise through structured discourse and AI moderation',
      icon: '🗣️',
      backgroundGradient: 'from-purple-600 to-purple-800'
    },
    bitcoinPrinciples: {
      title: 'Consensus Mechanisms for Human Discourse',
      principles: [
        {
          principle: 'Proof of Work',
          application: 'Quality contributions require effort - shallow comments get filtered out automatically',
          benefit: 'High-signal discussions where participants earn credibility through consistent value'
        },
        {
          principle: 'Verification',
          application: 'AI moderation ensures claims are backed by evidence and logical reasoning',
          benefit: 'Trust emerges through transparent, verifiable discourse rather than authority'
        },
        {
          principle: 'Decentralization',
          application: 'No single moderator controls discussion - community consensus and AI work together',
          benefit: 'Resistant to capture, censorship, and ideological bias'
        }
      ]
    },
    businessDetails: {
      overview: 'Penn Quarter Rules creates structured environments for intellectual discourse using AI moderation and merit-based participation. Members engage in debates, discussions, and collaborative problem-solving with tools that surface the best ideas while filtering noise.',
      services: [
        'AI-Moderated Debate Tournaments',
        'Private Group Discussion Facilitation',
        'Corporate Team Building Through Structured Discourse',
        'Educational Workshop Series',
        'Community Event Hosting',
        'Custom AI Moderation Tool Development'
      ],
      uniqueValue: [
        'First-of-its-kind AI moderation system for human discussions',
        'Merit-based credibility system rewards quality contributions',
        'Bias-resistant platform design prevents echo chambers',
        'In-person and virtual hybrid event capabilities',
        'Focus on local community building and networking',
        'Intellectual growth through respectful disagreement'
      ],
      socialProof: {
        testimonial: 'These debates have sharpened my thinking more than any college course. The AI keeps us honest while allowing passionate disagreement.',
        author: 'Dr. Sarah Chen',
        role: 'Regular Participant, Policy Researcher'
      }
    },
    pricing: {
      approach: 'Community-Supported Access Model',
      structure: 'Free community events, premium memberships $50/month, custom facilitation $500-2000/event',
      paymentMethods: ['Monthly subscriptions', 'Bitcoin payments', 'Community scholarships', 'Corporate sponsorships'],
      bitcoinAdvantage: 'Bitcoin members get priority access to exclusive events and direct input on platform development'
    },
    location: {
      serviceArea: 'Washington DC Penn Quarter district with virtual participation options',
      availability: 'Regular Tuesday evening debates, weekend workshops, custom corporate events',
      nextSteps: 'Attend a free community debate to experience the format'
    },
    callToAction: {
      primary: {
        text: 'Join Next Community Debate',
        action: 'Experience AI-moderated discourse firsthand at our next free event',
        url: 'https://pennquarterrules.com/events'
      },
      secondary: {
        text: 'Learn About AI Moderation',
        action: 'Understand the technology and philosophy behind our approach',
        url: 'https://pennquarterrules.com/how-it-works'
      },
      qualifier: 'Come prepared to engage thoughtfully and challenge your own assumptions'
    }
  },

  solar: {
    id: 'solar',
    name: 'Solar Strive',
    tagline: 'Energy independence enables monetary independence',
    hero: {
      headline: 'Own Your Energy Production Means',
      subheadline: 'Solar installations that reduce dependence on grid systems while building wealth through energy sovereignty',
      icon: '⚡',
      backgroundGradient: 'from-yellow-500 to-orange-600'
    },
    bitcoinPrinciples: {
      title: 'Energy as the Foundation of Value',
      principles: [
        {
          principle: 'Self-Sovereignty',
          application: 'Generate your own power instead of depending on centralized grid systems',
          benefit: 'Protection from energy price inflation and grid instability'
        },
        {
          principle: 'Proof of Work',
          application: 'Solar panels perform ongoing work converting sunlight to usable energy',
          benefit: 'Continuous value creation from natural resources you control'
        },
        {
          principle: 'Long-term Thinking',
          application: 'Solar installations pay for themselves over decades while providing independence',
          benefit: 'Asset that produces value for 25+ years while reducing ongoing expenses'
        }
      ]
    },
    businessDetails: {
      overview: 'Solar Strive designs and installs residential and commercial solar systems focused on energy independence rather than just cost savings. Our approach emphasizes system ownership, battery storage, and backup capabilities that provide true energy sovereignty.',
      services: [
        'Grid-Tied Solar with Battery Backup Systems',
        'Off-Grid Energy Independence Solutions',
        'Commercial Solar Installation & Maintenance',
        'Energy Audit & Efficiency Optimization',
        'Backup Generator Integration',
        'Energy Management System Design'
      ],
      uniqueValue: [
        'Independence-focused design over utility grid dependence',
        'Premium battery storage systems for true backup capability',
        'No leasing programs - you own your energy infrastructure',
        'Local installer network with ongoing support',
        'Integration with home Bitcoin mining operations',
        'Focus on resilience during grid outages and emergencies'
      ],
      socialProof: {
        testimonial: 'Our solar system paid for itself in 4 years and now we generate more power than we use. During the last outage, we were the only house on the block with lights on.',
        author: 'James K.',
        role: 'Homeowner, Fairfax VA'
      }
    },
    pricing: {
      approach: 'True Ownership Investment Model',
      structure: '$15,000-50,000 depending on system size and battery capacity, no leasing options',
      paymentMethods: ['Direct purchase', 'Solar financing', 'Bitcoin payments', 'Federal tax credit assistance'],
      bitcoinAdvantage: 'Bitcoin payments receive priority scheduling and additional battery capacity at cost'
    },
    location: {
      serviceArea: 'Mid-Atlantic region: Virginia, Maryland, DC, Pennsylvania',
      availability: 'Free energy audits, detailed system design consultations',
      nextSteps: 'Energy audit to determine independence potential and system requirements'
    },
    callToAction: {
      primary: {
        text: 'Schedule Energy Independence Audit',
        action: 'Free assessment of your property\'s solar potential and backup needs',
        url: 'https://solarstrive.com/audit'
      },
      secondary: {
        text: 'Calculate Your Independence',
        action: 'Use our calculator to estimate costs and energy production',
        url: 'https://solarstrive.com/calculator'
      },
      qualifier: 'Serious about energy independence - consultation covers technical details and long-term planning'
    }
  },

  pop: {
    id: 'pop',
    name: 'Proof of Putt',
    tagline: 'Merit-based recognition through AI-powered competition',
    hero: {
      headline: 'Skill Verification Through Gamified Competition',
      subheadline: 'AI-scored mini-golf where your putting ability earns rewards and builds community connections',
      icon: '⛳',
      backgroundGradient: 'from-green-500 to-green-700'
    },
    bitcoinPrinciples: {
      title: 'Proof-of-Work Gaming and Merit Recognition',
      principles: [
        {
          principle: 'Proof of Work',
          application: 'Putting skill requires practice and effort - AI scoring ensures accurate merit measurement',
          benefit: 'Recognition and rewards based on demonstrated ability, not arbitrary scoring'
        },
        {
          principle: 'Verification',
          application: 'Computer vision AI eliminates score manipulation and provides transparent competition',
          benefit: 'Trust in competition results through verifiable, tamper-proof scoring'
        },
        {
          principle: 'Network Effects',
          application: 'More players create better competition and larger reward pools',
          benefit: 'Community value increases as participation grows'
        }
      ]
    },
    businessDetails: {
      overview: 'Proof of Putt combines recreational mini-golf with AI-powered skill verification to create merit-based competition and community building. Our computer vision system accurately scores putting performance to enable fair tournaments, skill tracking, and reward distribution.',
      services: [
        'AI-Scored Mini Golf Course Operations',
        'Tournament Organization & Prize Distribution',
        'Corporate Team Building Events',
        'Skill Development Coaching Programs',
        'Community League Management',
        'Custom Course Design & AI Installation'
      ],
      uniqueValue: [
        'First AI-verified mini golf scoring system',
        'Tamper-proof competition results build genuine skill rankings',
        'Reward distribution based on demonstrated merit',
        'Community-building through fair competition',
        'Corporate team building with objective skill assessment',
        'Progressive skill development tracking over time'
      ],
      socialProof: {
        testimonial: 'My kids love that they can\'t cheat and I love watching their skills actually improve through consistent practice. The AI coaching suggestions are surprisingly helpful.',
        author: 'Lisa M.',
        role: 'Parent, Regular Participant'
      }
    },
    pricing: {
      approach: 'Play-to-Earn Recreation Model',
      structure: '$10/round casual play, tournament entry fees $25-100, private events $500-2000',
      paymentMethods: ['Cash payments', 'Digital payments', 'Bitcoin rewards distribution', 'Monthly memberships'],
      bitcoinAdvantage: 'Tournament winnings paid in Bitcoin, and Bitcoin members get discounted practice rates'
    },
    location: {
      serviceArea: 'Northern Virginia locations with expansion planned',
      availability: 'Open play daily, tournaments weekends, private events by appointment',
      nextSteps: 'Visit for casual play to experience AI scoring system'
    },
    callToAction: {
      primary: {
        text: 'Experience AI-Scored Golf',
        action: 'Come play a round and see how computer vision changes the game',
        url: 'https://proofofputt.com/play'
      },
      secondary: {
        text: 'Join Tournament League',
        action: 'Compete in regular tournaments with skill-based rankings',
        url: 'https://proofofputt.com/tournaments'
      },
      qualifier: 'Fun for all skill levels - AI handicapping ensures fair competition'
    }
  },

  boats: {
    id: 'boats',
    name: 'Better Boat Brokers',
    tagline: 'Sound money for premium maritime assets',
    hero: {
      headline: 'Bitcoin-Native Boat Brokerage',
      subheadline: 'Buy and sell premium watercraft using sound money principles and modern payment technology',
      icon: '🛥️',
      backgroundGradient: 'from-cyan-500 to-blue-600'
    },
    bitcoinPrinciples: {
      title: 'Sound Money for Premium Assets',
      principles: [
        {
          principle: 'Store of Value',
          application: 'Quality boats hold value better when purchased with appreciating Bitcoin',
          benefit: 'Asset protection through sound money and premium maritime equipment'
        },
        {
          principle: 'Low Time Preference',
          application: 'Focus on well-maintained, classic boats that appreciate over decades',
          benefit: 'Investment in assets designed for generational ownership'
        },
        {
          principle: 'Peer-to-Peer',
          application: 'Direct transactions between buyers and sellers with minimal intermediary fees',
          benefit: 'Better prices for both parties through efficient marketplace design'
        }
      ]
    },
    businessDetails: {
      overview: 'Better Boat Brokers specializes in premium watercraft transactions using Bitcoin and modern payment technologies. We focus on quality vessels with documented maintenance histories, serving clients who understand that well-maintained boats can be appreciating assets.',
      services: [
        'Premium Boat Sales & Acquisition',
        'Bitcoin Payment Processing & Escrow',
        'Marine Survey Coordination & Analysis',
        'Documentation & Registration Services',
        'Insurance & Financing Assistance',
        'Post-Sale Support & Maintenance Networks'
      ],
      uniqueValue: [
        'First Bitcoin-native boat brokerage with proper custody solutions',
        'Focus on investment-grade vessels that hold or appreciate in value',
        'Transparent fee structure with Bitcoin payment discounts',
        'Extensive network of certified marine surveyors and mechanics',
        'Specialization in classic and restored boats',
        'International transaction capability through Bitcoin'
      ],
      socialProof: {
        testimonial: 'They found us a 1965 Chris-Craft that\'s been perfectly maintained. The Bitcoin transaction was seamless and we saved on fees. The boat has appreciated 15% already.',
        author: 'Robert T.',
        role: 'Boat Owner, Annapolis MD'
      }
    },
    pricing: {
      approach: 'Value-Based Brokerage with Sound Money Benefits',
      structure: '3% commission for Bitcoin transactions, 5% for traditional payments, boats $50K-500K+',
      paymentMethods: ['Bitcoin with escrow', 'Traditional financing', 'Cash purchases', 'Trade-in evaluations'],
      bitcoinAdvantage: 'Bitcoin transactions get reduced commissions, priority service, and international capability'
    },
    location: {
      serviceArea: 'Chesapeake Bay region with national and international reach',
      availability: 'By appointment boat viewings, marina consultations, virtual tours available',
      nextSteps: 'Consultation to understand your boating goals and budget parameters'
    },
    callToAction: {
      primary: {
        text: 'Browse Premium Inventory',
        action: 'View our current selection of investment-grade watercraft',
        url: 'https://betterboatbrokers.com/inventory'
      },
      secondary: {
        text: 'Schedule Consultation',
        action: 'Discuss your boating goals and Bitcoin payment options',
        url: 'https://betterboatbrokers.com/consult'
      },
      qualifier: 'Serious buyers with $50K+ budgets - we specialize in quality over quantity'
    }
  }
}