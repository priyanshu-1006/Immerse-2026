/* ─── Event Icons (SVG paths for sci-fi look) ─── */
export const EVENTS = [
  {
    id: 'stellar-genesis',
    name: 'Stellar Genesis',
    type: 'Flagship Hackathon',
    color: '#ff6622',
    emissive: '#ff6622',
    description: 'Premier innovation challenge pushing participants beyond conventional thinking to create impactful tech solutions.',
    shortDesc: 'Innovation Beyond Boundaries',
    icon: '⬡',
    detail: {
      about: 'Stellar Genesis is the premier innovation challenge of IMMERSE 2026, designed to push participants beyond conventional thinking and inspire the creation of impactful technology-driven solutions. This hackathon encourages teams to identify real-world problems and transform ideas into scalable prototypes within a high-energy collaborative environment.',
      objective: [
        'Identify meaningful real-world challenges',
        'Design innovative and feasible solutions',
        'Develop functional prototypes',
        'Demonstrate creativity & technical excellence',
        'Present solutions to a judging panel'
      ],
      format: [
        'Team-based event',
        'Team Size: 2–4 members'
      ],
      focusAreas: [
        'Artificial Intelligence',
        'Web & App Solutions',
        'Smart Systems',
        'Automation & Productivity',
        'Open Innovation'
      ],
      evaluation: [
        'Innovation & Problem Relevance',
        'Technical Implementation',
        'Feasibility & Scalability',
        'User Experience / Design',
        'Presentation & Impact'
      ],
      rules: [
        'Identify real-world problems',
        'Design scalable solutions',
        'Build functional prototypes',
        'Present ideas to judges',
      ],
      schedule: [
        { time: 'Day 1', event: 'Problem Identification' },
        { time: 'Day 1', event: 'Prototyping Phase' },
        { time: 'Day 2', event: 'Final Pitch' },
      ],
      prize: '₹1,00,000+',
      teamSize: '2-4',
      duration: '24-36 Hours',
      difficulty: 'Advanced',
    },
  },
  {
    id: 'cosmic-intelligence',
    name: 'Cosmic Intelligence',
    type: 'Artificial Intelligence',
    color: '#00ccff',
    emissive: '#00eeff',
    description: 'AI-centric challenge exploring the boundaries of machine intelligence, creativity, and problem-solving.',
    shortDesc: 'AI Reasoning & Creativity',
    icon: '◈',
    detail: {
      about: 'Cosmic Intelligence is an AI-centric challenge exploring the boundaries of machine intelligence, creativity, and problem-solving. This event tests participants’ ability to leverage AI tools, prompt engineering, and reasoning skills to generate meaningful outputs and solutions.',
      objective: [
        'Solve AI-driven tasks',
        'Demonstrate prompt engineering skills',
        'Showcase reasoning & creativity',
        'Build AI-assisted workflows or outputs'
      ],
      format: [
        'Individual / Team-based (flexible)'
      ],
      focusAreas: [
        'Prompt Engineering',
        'AI Reasoning Tasks',
        'Content & Logic Challenges',
        'AI Tool Utilization',
        'Applied AI Creativity'
      ],
      evaluation: [
        'Accuracy & Quality of Output',
        'Creativity & Innovation',
        'Prompt Design Strategy',
        'Efficiency & Clarity',
        'Problem-solving approach'
      ],
      rules: [
        'Use AI tools effectively',
        'Prompt engineering required',
        'Originality in output',
      ],
      schedule: [
        { time: 'Round 1', event: 'Prompt Engineering' },
        { time: 'Round 2', event: 'Applied AI Task' },
      ],
      prize: 'Excel. Rewards',
      teamSize: '1-2',
      duration: '6-12 Hours',
      difficulty: 'Intermediate',
    },
  },
  {
    id: 'quantum-logic',
    name: 'Quantum Logic',
    type: 'Competitive Programming',
    color: '#aa44ff',
    emissive: '#cc66ff',
    description: 'Elite algorithmic battle designed for participants with strong logical reasoning and problem-solving skills.',
    shortDesc: 'Algorithmic Battle',
    icon: '⧫',
    detail: {
      about: 'Quantum Logic is an elite algorithmic battle designed for participants with strong logical reasoning and problem-solving skills. This event challenges coders to solve complex Data Structures & Algorithms (DSA) problems under time constraints.',
      objective: [
        'Solve algorithmic problems',
        'Demonstrate coding efficiency',
        'Apply logical precision',
        'Optimize performance'
      ],
      format: [
        'Individual-based competition'
      ],
      focusAreas: [
        'Data Structures',
        'Algorithms',
        'Logical puzzles',
        'Optimization challenges'
      ],
      evaluation: [
        'Correctness',
        'Execution Efficiency',
        'Time & Space Optimization',
        'Problem-solving strategy'
      ],
      rules: [
        'Solve algorithmic problems',
        'No plagiarism',
        'Optimize code efficiency',
      ],
      schedule: [
        { time: 'Round 1', event: 'Qualifiers' },
        { time: 'Round 2', event: 'Final Battle' },
      ],
      prize: 'Top Ranks',
      teamSize: 'Solo',
      duration: '3-5 Hours',
      difficulty: 'Expert',
    },
  },
  {
    id: 'mission-control',
    name: 'Mission Control',
    type: 'Technical Workshop',
    color: '#00ff88',
    emissive: '#00ff88',
    description: 'Hands-on experiential learning workshop focused on emerging technologies and intelligent systems.',
    shortDesc: 'Hands-on Learning',
    icon: '⊛',
    detail: {
      about: 'Mission Control is a hands-on experiential learning workshop focused on emerging technologies, modern development paradigms, and intelligent systems. Designed to provide practical exposure beyond theoretical learning.',
      objective: [
        'Learn advanced concepts',
        'Build real-world mini implementations',
        'Explore modern tools & workflows',
        'Gain applied technical insights'
      ],
      format: [
        'Workshop / Hands-on Session'
      ],
      focusAreas: [
        'AI & Intelligent Systems',
        'Full Stack Development',
        'Automation & Agents',
        'Modern Tech Tools'
      ],
      evaluation: [
        'Practical learning experience',
        'Certification',
        'Industry-relevant exposure'
      ],
      rules: [
        'Bring laptop',
        'Complete mini-projects',
        'Active participation',
      ],
      schedule: [
        { time: 'Session 1', event: 'Concept Deep Dive' },
        { time: 'Session 2', event: 'Live Implementation' },
      ],
      prize: 'Certified',
      teamSize: 'Open',
      duration: '4-6 Hours',
      difficulty: 'All Levels',
    },
  },
  {
    id: 'orbit-shift',
    name: 'Orbit Shift',
    type: 'Startup Turnaround',
    color: '#ffaa00',
    emissive: '#ffcc33',
    description: 'Entrepreneurship-driven innovation challenge encouraging participants to design tech-based startup ideas.',
    shortDesc: 'Startup Ideathon',
    icon: '△',
    detail: {
      about: 'Orbit Shift is an entrepreneurship-driven innovation challenge encouraging participants to design technology-based startup ideas. Focus on feasibility, scalability, and impact.',
      objective: [
        'Identify real-world problems',
        'Design business solutions',
        'Build innovative startup models',
        'Pitch ideas to judges'
      ],
      format: [
        'Team / Individual-based'
      ],
      focusAreas: [
        'Problem Relevance',
        'Innovation',
        'Feasibility',
        'Scalability'
      ],
      evaluation: [
        'Problem Relevance',
        'Innovation',
        'Feasibility',
        'Scalability',
        'Presentation & Clarity'
      ],
      rules: [
        'Develop business model',
        'Pitch deck required',
        'Focus on viability',
      ],
      schedule: [
        { time: 'Phase 1', event: 'Idea Submission' },
        { time: 'Phase 2', event: 'Pitching Round' },
      ],
      prize: 'Incubation',
      teamSize: '1-4',
      duration: 'Multi-stage',
      difficulty: 'Intermediate',
    },
  },
  {
    id: 'synthetic-cosmos',
    name: 'Synthetic Cosmos',
    type: 'Creative AI Challenge',
    color: '#ff44aa',
    emissive: '#ff66cc',
    description: 'Blend creativity with technology by leveraging Generative AI tools for visual storytelling.',
    shortDesc: 'Generative AI Art',
    icon: '◎',
    detail: {
      about: 'Synthetic Cosmos blends creativity with technology, challenging participants to leverage Generative AI tools for visual storytelling and artistic innovation. This event explores AI’s role in creative transformation.',
      objective: [
        'Create AI-assisted visuals',
        'Demonstrate creative thinking',
        'Blend imagination & technology',
        'Showcase artistic innovation'
      ],
      format: [
        'Individual / Team'
      ],
      focusAreas: [
        'AI Image Generation',
        'AI-Enhanced Art',
        'Visual Storytelling',
        'Creative Transformation'
      ],
      evaluation: [
        'Creativity & Originality',
        'Visual Impact',
        'AI Utilization Strategy',
        'Concept & Execution'
      ],
      rules: [
        'Use GenAI tools',
        'Focus on storytelling',
        'Originality required',
      ],
      schedule: [
        { time: 'Theme 1', event: 'Visual Storytelling' },
        { time: 'Theme 2', event: 'Digital Imagination' },
      ],
      prize: 'Awards',
      teamSize: '1-2',
      duration: '4-6 Hours',
      difficulty: 'Creative',
    },
  },
  {
    id: 'event-horizon',
    name: 'Event Horizon',
    type: 'Cybersecurity Challenge',
    color: '#44ff44',
    emissive: '#00ff88',
    description: 'Immersive cybersecurity-driven challenge combining logic puzzles, cyber concepts, and escape-room dynamics.',
    shortDesc: 'Cyber Escape / CTF',
    icon: '⬢',
    detail: {
      about: 'Event Horizon is an immersive cybersecurity-driven challenge combining logic puzzles, cyber concepts, and escape-room dynamics. Participants must analyze, decode, and solve system-based challenges.',
      objective: [
        'Solve cybersecurity puzzles',
        'Demonstrate logical reasoning',
        'Analyze system challenges',
        'Work under pressure'
      ],
      format: [
        'Team-based'
      ],
      focusAreas: [
        'Encryption puzzles',
        'Logic challenges',
        'Cyber concepts',
        'System analysis tasks'
      ],
      evaluation: [
        'Problem-solving efficiency',
        'Logical accuracy',
        'Strategy & teamwork',
        'Completion time'
      ],
      rules: [
        'No brute force unless specified',
        'Solve logic puzzles',
        'Analyze vulnerabilities',
      ],
      schedule: [
        { time: 'Level 1', event: 'Logic Breaker' },
        { time: 'Level 2', event: 'System Escape' },
      ],
      prize: 'Top Hacker',
      teamSize: '1-3',
      duration: '6-12 Hours',
      difficulty: 'Advanced',
    },
  },
]
