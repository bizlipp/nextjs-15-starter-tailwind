"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SelfAssessment() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  // Enhanced profile structure with module recommendation capabilities
  const [profile, setProfile] = useState({
    mindset1: null,
    mindset2: null,
    emotional1: null,
    emotional2: null,
    growthPriorities: {
      health: null,
      career: null,
      relationships: null,
      personalDev: null,
      finances: null
    },
    barrier: null,
    barrierImpact: null,
    learningStyle: null,
    decisionStyle: null,
    readiness: null,
    enneagramType: null,
    // Module scoring system
    moduleScores: {
      S1: 0, S2: 0, S3: 0,   // Stress Management & Mindset Modules
      P1: 0, P2: 0, P3: 0,   // Physical Health & Vitality Modules
      E1: 0, E2: 0, E3: 0,   // Social & Emotional Growth Modules
      SP1: 0, SP2: 0, SP3: 0 // Life Purpose & Spiritual Well-Being Modules
    },
    recommendedModules: [],
    recommendedGroups: []
  });

  const questions = [    // 🌟 Enneagram Typing (6 Questions)
    {
        id: 1,
        text: "You just received a once-in-a-lifetime opportunity to do something that excites you. What is it?",
        options: [
            "Fixing something broken",
            "Making a difference",
            "Achieving something great",
            "Expressing creativity",
            "Gaining knowledge"
        ],
        category: "Enneagram"
    },
    {
        id: 2,
        text: "You're about to start something new, but a deep hesitation creeps in. What are you most afraid of?",
        options: ["Making mistakes", "Not being needed", "Failure", "Losing uniqueness", "Not knowing enough"],
        category: "Enneagram"
    },
    {
        id: 3,
        text: "Something unexpected throws your plans off track. How do you react?",
        options: ["Take control", "Analyze details", "Seek reassurance", "Withdraw", "Distract myself"],
        category: "Mindset"
    },
    {
        id: 4,
        text: "You wake up feeling completely fulfilled and energized. What is happening in your life?",
        options: [
            "I've improved something important",
            "I'm surrounded by people who value me",
            "I've achieved something great",
            "I'm fully expressing my creativity",
            "I've gained deep knowledge and mastery"
        ],
        category: "Enneagram"
    },
    {
        id: 5,
        text: "You're facing a tough challenge. What keeps you motivated to push through?",
        options: [
            "Knowing it's the right thing to do",
            "Wanting to help or inspire others",
            "Proving I can succeed",
            "Expressing my deeper purpose",
            "Finding an intellectual solution"
        ],
        category: "Enneagram"
    },
    {
        id: 6,
        text: "You're given complete freedom to do whatever you want today. How do you spend your time?",
        options: [
            "Fixing something that needs improvement",
            "Helping or supporting someone",
            "Working toward an ambitious goal",
            "Creating something original",
            "Exploring and learning something new"
        ],
        category: "Enneagram"
    },

    // 🧠 Mindset & Learning Style (4 Questions)
    {
        id: 7,
        text: "You're about to tackle something new. What's your natural approach?",
        options: [
            "Plan every step before starting",
            "Jump in and adjust as I go",
            "Research and gather knowledge first",
            "Look for guidance from others",
            "Try different approaches to see what works"
        ],
        category: "Mindset"
    },
    {
        id: 8,
        text: "You recently made a mistake that had consequences. What do you tell yourself?",
        options: [
            "I should have been more careful",
            "I'll learn from this and improve",
            "This proves I'm not good enough",
            "I don't like failing, but I'll move on",
            "Everyone makes mistakes, I won't dwell on it"
        ],
        category: "Mindset"
    },
    {
        id: 9,
        text: "You're reflecting on a past failure. What do you focus on?",
        options: [
            "How to avoid it happening again",
            "The lessons I learned from it",
            "What it says about my abilities",
            "How it changed my perspective",
            "I try not to think about it"
        ],
        category: "Mindset"
    },
    {
        id: 10,
        text: "When you're trying to learn something complex, what helps the most?",
        options: [
            "Breaking it into steps and structuring it",
            "Jumping in and learning hands-on",
            "Watching, listening, or observing others",
            "Reading and researching extensively",
            "Discussing it with someone experienced"
        ],
        category: "Learning Style"
    },

    // 🚧 Growth Barriers & Challenges (4 Questions)
    {
        id: 11,
        text: "When you set personal goals, what usually holds you back?",
        options: [
            "Not knowing exactly what I want",
            "Fear of failing or making mistakes",
            "Feeling overwhelmed by too many choices",
            "Not enough time or resources",
            "Lack of motivation or consistency"
        ],
        category: "Barriers"
    },
    {
        id: 12,
        text: "You're making progress toward a goal, but then hit a roadblock. What's your reaction?",
        options: [
            "I analyze what went wrong and adjust",
            "I look for support or encouragement",
            "I push through even harder",
            "I take a break and reassess",
            "I move on to something else for now"
        ],
        category: "Barriers"
    },

    // 🔄 Readiness for Change (4 Questions)
    {
        id: 13,
        text: "You're thinking about making a big change in your life. Where are you in the process?",
        options: [
            "Not sure I need to change",
            "I know I need to change, but unsure how",
            "I'm planning how to change",
            "I'm actively making the change"
        ],
        category: "Readiness"
    },

    // 🎯 Decision-Making Style (4 Questions)
    {
        id: 14,
        text: "You have an important decision to make, and time is running out. What do you do?",
        options: [
            "Analyze all possible outcomes first",
            "Go with my gut instinct",
            "Ask for advice from others",
            "Wait until the last moment to decide",
            "Make a quick choice and adapt later"
        ],
        category: "Decision-Making"
    },

    // 💬 Relationship & Communication Growth (3 Questions)
    {
        id: 15,
        text: "You're in a conversation with someone who strongly disagrees with you. How do you react?",
        options: [
            "Try to keep the peace and avoid conflict",
            "Speak my mind directly",
            "Listen and reflect before responding",
            "Disengage and move on"
        ],
        category: "Communication"
    },
    {
        id: 16,
        text: "You want to strengthen your relationships. What's the biggest area you want to improve?",
        options: [
            "Expressing my thoughts and needs",
            "Deepening emotional connections",
            "Building professional relationships",
            "Being more socially confident"
        ],
        category: "Communication"
    },

    // New Communication Style Question
    {
        id: 30,
        text: "When giving feedback to others, which approach do you usually take?",
        options: [
            "Direct and straightforward, focusing on facts",
            "Gentle and supportive, focusing on positives first",
            "Analytical and detailed, providing complete context",
            "Asking questions rather than making statements"
        ],
        category: "Communication"
    },

    // New Emotional Approach Questions
    {
        id: 31,
        text: "When you experience difficult emotions, what's your typical response?",
        options: [
            "Analyze them logically to understand the cause",
            "Express them openly to process them",
            "Contain them until I can process them privately",
            "Seek support from others",
            "Distract myself with activity"
        ],
        category: "Communication"  // Using Communication category for Emotional Approach
    },
    {
        id: 32,
        text: "In emotionally charged situations, what's most important to you?",
        options: [
            "Maintaining rational thinking",
            "Authentically expressing my feelings",
            "Understanding others' emotional perspectives",
            "Finding practical solutions",
            "Preserving harmony in the group"
        ],
        category: "Communication"  // Using Communication category for Emotional Approach
    },

    // New Learning Style Questions
    {
        id: 33,
        text: "When you successfully learn something new, what approach typically works best for you?",
        options: [
            "Following step-by-step instructions or tutorials",
            "Figuring it out through trial and error",
            "Reading comprehensive background information first",
            "Watching someone else demonstrate it",
            "Discussing the concept with others"
        ],
        category: "Learning Style"
    },
    {
        id: 34,
        text: "When you need to remember important information, how do you usually do it?",
        options: [
            "Create visual diagrams or mind maps",
            "Write detailed notes to review later",
            "Teach the information to someone else",
            "Apply the information in a practical way",
            "Create acronyms or memory devices"
        ],
        category: "Learning Style"
    },

    // 🔄 Readiness for Change (3 Questions)
    {
        id: 17,
        text: "Think about an area of your life where you want to improve. What best describes your mindset?",
        options: [
            "I feel ready to make changes",
            "I know I need to change, but I'm hesitant",
            "I want to change but don't know how",
            "I don't think I need to change right now"
        ],
        category: "Readiness"
    },
    {
        id: 18,
        text: "Someone offers to help you make a change. How do you respond?",
        options: [
            "I appreciate the help and accept it",
            "I prefer to figure things out on my own",
            "I hesitate but might consider it",
            "I don't trust outside help"
        ],
        category: "Readiness"
    },
    {
        id: 19,
        text: "How do you typically feel when faced with the idea of major personal growth?",
        options: [
            "Excited—I love improving myself",
            "Cautious—I like taking things step by step",
            "Nervous—I worry about failing",
            "Overwhelmed—I don't know where to start"
        ],
        category: "Readiness"
    },

    // 🎯 Coaching & Personalization (5 Questions)
    {
        id: 20,
        text: "What's the biggest reason you struggle to follow through on personal goals?",
        options: [
            "I set goals that are too ambitious",
            "I lose motivation over time",
            "I struggle with time management",
            "I lack accountability and support",
            "I don't know where to start"
        ],
        category: "Coaching"
    },
    {
        id: 21,
        text: "You're feeling stuck in one area of your life. Which area is it?",
        options: [
            "My personal growth and mindset",
            "My career or work-life balance",
            "My relationships and social life",
            "My health and well-being",
            "My finances and security"
        ],
        category: "Coaching"
    },
    {
        id: 22,
        text: "You want to build better habits. What's your first step?",
        options: [
            "Set a clear, structured plan",
            "Start small and adjust over time",
            "Find an accountability partner",
            "Track my progress daily",
            "Make the habit fun and rewarding"
        ],
        category: "Coaching"
    },
    {
        id: 23,
        text: "You're about to start working on a long-term goal. What's your strategy?",
        options: [
            "Create a step-by-step plan",
            "Jump in and figure it out along the way",
            "Seek advice from experienced people",
            "Break it into small, achievable milestones",
            "Visualize success before taking action"
        ],
        category: "Coaching"
    },
    {
        id: 24,
        text: "When setting goals, what's your biggest priority?",
        options: [
            "Making sure they are realistic",
            "Ensuring they align with my deeper purpose",
            "Having accountability to stay committed",
            "Finding ways to keep them engaging",
            "Keeping flexibility in how I approach them"
        ],
        category: "Coaching"
    },

    // Additional Decision-Making Style Questions
    {
        id: 26,
        text: "You're at a crossroads in life. How do you decide what to do next?",
        options: [
            "I weigh all options carefully before deciding",
            "I follow my intuition and instincts",
            "I ask for advice from trusted people",
            "I avoid making a decision until I have to",
            "I take action quickly and adjust as needed"
        ],
        category: "Decision-Making"
    },
    {
        id: 27,
        text: "You're making a big purchase. What's your process?",
        options: [
            "Research everything to make an informed choice",
            "Go with what feels right in the moment",
            "Ask others for their opinions first",
            "Wait and see if I really need it",
            "Make a quick decision based on what excites me"
        ],
        category: "Decision-Making"
    },
    {
        id: 28,
        text: "You've been given two equally good opportunities. How do you choose?",
        options: [
            "Compare all the pros and cons",
            "Go with what excites me most",
            "Get input from others before deciding",
            "Wait to see if one opportunity fades away",
            "Follow the path that feels most intuitive"
        ],
        category: "Decision-Making"
    },

    // Adding a unique communication question to replace the duplicates
    {
        id: 31,
        text: "You're struggling with a difficult conversation. What's your approach?",
        options: [
            "Plan exactly what I want to say",
            "Express my feelings honestly",
            "Listen more than I speak",
            "Try to avoid conflict if possible",
            "Use humor or distraction to lighten the mood"
        ],
        category: "Communication"
    }
];

  // Calculate progress percentage based on answered questions
  useEffect(() => {
    const questionsAnswered = Object.keys(answers).length;
    const totalQuestionEstimate = 10; // Estimate of questions needed for completion
    const calculatedProgress = Math.min(Math.round((questionsAnswered / totalQuestionEstimate) * 100), 100);
    setProgress(calculatedProgress);
  }, [answers]);

  // Add animation when questions change
  useEffect(() => {
    setFadeIn(false);
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Enhanced update profile function with more flexible pattern matching
  const updateProfile = (questionId, answer) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    // Create a new profile object to avoid direct state mutation
    const updatedProfile = { ...profile };

    // Update profile based on the answer and question category with improved pattern matching
    switch (question.category) {
      case "Enneagram":
        // Question 1 is the main Enneagram determination question
        if (question.id === 1) {
          // First major split - determines primary center/triad
          if (answer.includes("Making a difference") || answer.includes("help")) {
            updatedProfile.enneagramType = "Helper"; // Type 2
          } else if (answer.includes("Achieving") || answer.includes("great")) {
            updatedProfile.enneagramType = "Achiever"; // Type 3
          } else if (answer.includes("creativity") || answer.includes("express")) {
            updatedProfile.enneagramType = "Individualist"; // Type 4
          } else if (answer.includes("knowledge") || answer.includes("Gaining")) {
            updatedProfile.enneagramType = "Investigator"; // Type 5
          } else if (answer.includes("fixing") || answer.includes("improve") || answer.includes("broken")) {
            updatedProfile.enneagramType = "Reformer"; // Type 1
          }
        }

        // Question 2 refines Enneagram determination
        if (question.id === 2) {
          if (answer.includes("Making mistakes")) {
            updatedProfile.enneagramType = "Reformer"; // Type 1 - perfectionistic
          } else if (answer.includes("Not being needed")) {
            updatedProfile.enneagramType = "Helper"; // Type 2 - rejection sensitivity
          } else if (answer.includes("Failure")) {
            updatedProfile.enneagramType = "Achiever"; // Type 3 - fear of failure
          } else if (answer.includes("Losing uniqueness")) {
            updatedProfile.enneagramType = "Individualist"; // Type 4 - identity fears
          } else if (answer.includes("Not knowing enough")) {
            updatedProfile.enneagramType = "Investigator"; // Type 5 - competency fears
          }
        }

        // Question 4 provides additional Enneagram refinement
        if (question.id === 4) {
          if (answer.includes("improved something")) {
            updatedProfile.enneagramType = "Reformer"; // Type a
          } else if (answer.includes("surrounded by people") || answer.includes("value me")) {
            updatedProfile.enneagramType = "Helper"; // Type 2
          } else if (answer.includes("achieved something great")) {
            updatedProfile.enneagramType = "Achiever"; // Type 3
          } else if (answer.includes("expressing my creativity")) {
            updatedProfile.enneagramType = "Individualist"; // Type 4
          } else if (answer.includes("gained deep knowledge")) {
            updatedProfile.enneagramType = "Investigator"; // Type 5
          }
        }

        // Update growth priorities based on enneagram type
        if (updatedProfile.enneagramType === "Reformer") {
          updatedProfile.growthPriorities.personalDev = updatedProfile.growthPriorities.personalDev || "Self-improvement";
        } else if (updatedProfile.enneagramType === "Helper") {
          updatedProfile.growthPriorities.relationships = updatedProfile.growthPriorities.relationships || "Relationship building";
        } else if (updatedProfile.enneagramType === "Achiever") {
          updatedProfile.growthPriorities.career = updatedProfile.growthPriorities.career || "Achievement and success";
        } else if (updatedProfile.enneagramType === "Individualist") {
          updatedProfile.growthPriorities.personalDev = updatedProfile.growthPriorities.personalDev || "Creative expression";
        } else if (updatedProfile.enneagramType === "Investigator") {
          updatedProfile.growthPriorities.personalDev = updatedProfile.growthPriorities.personalDev || "Knowledge acquisition";
        }
        break;

      case "Mindset":
        // More flexible mindset determination
        if (question.id === 8) {
          if (answer.includes("learn") || answer.includes("improve")) {
            updatedProfile.mindset1 = "Growth-oriented";
            updatedProfile.moduleScores.S2 += 2;
            updatedProfile.moduleScores.SP2 += 1;
          } else if (answer.includes("not good") || answer.includes("proves")) {
            updatedProfile.mindset1 = "Fixed mindset tendencies";
            updatedProfile.moduleScores.S2 += 3;
            updatedProfile.moduleScores.E1 += 2;
          } else if (answer.includes("should have") || answer.includes("careful")) {
            // Added additional pattern for common fixed mindset indicators
            updatedProfile.mindset1 = "Cautious mindset";
            updatedProfile.moduleScores.S2 += 2;
          }
        }

        if (question.id === 9) {
          if (answer.includes("lessons") || answer.includes("learned")) {
            updatedProfile.mindset2 = "Embraces challenges as learning opportunities";
            updatedProfile.moduleScores.S2 += 1;
          } else if (answer.includes("avoid") || answer.includes("try not to")) {
            updatedProfile.mindset2 = "Tends to avoid challenges";
            updatedProfile.moduleScores.S2 += 3;
            updatedProfile.moduleScores.E1 += 2;
          } else if (answer.includes("what it says about") || answer.includes("abilities")) {
            // Added pattern for fixed mindset thinking
            updatedProfile.mindset2 = "Self-evaluative approach to challenges";
            updatedProfile.moduleScores.S2 += 2;
          }

          // If mindset1 is still null, infer from mindset2
          if (!updatedProfile.mindset1 && updatedProfile.mindset2) {
            if (updatedProfile.mindset2.includes("Embraces")) {
              updatedProfile.mindset1 = "Growth-oriented";
            } else if (updatedProfile.mindset2.includes("avoid")) {
              updatedProfile.mindset1 = "Fixed mindset tendencies";
            }
          }
        }

        // Reaction to unexpected situations helps determine mindset
        if (question.id === 3) {
          if (answer === "Take control") {
            updatedProfile.mindset1 = updatedProfile.mindset1 || "Action-oriented mindset";
            updatedProfile.moduleScores.S3 += 1;
          } else if (answer === "Analyze details") {
            updatedProfile.mindset1 = updatedProfile.mindset1 || "Analytical mindset";
            updatedProfile.moduleScores.E1 += 1;
          } else if (answer === "Seek reassurance") {
            updatedProfile.mindset1 = updatedProfile.mindset1 || "Collaborative mindset";
            updatedProfile.moduleScores.E2 += 2;
            updatedProfile.moduleScores.E3 += 1;
          } else if (answer === "Withdraw") {
            updatedProfile.mindset1 = updatedProfile.mindset1 || "Protective mindset";
            updatedProfile.moduleScores.S1 += 2;
            updatedProfile.moduleScores.E3 += 2;
          } else if (answer === "Distract myself") {
            updatedProfile.mindset1 = updatedProfile.mindset1 || "Avoidant mindset";
            updatedProfile.moduleScores.S1 += 2;
            updatedProfile.moduleScores.S3 += 1;
          }
        }
        break;

      case "Decision-Making":
        // More precise decision-making style determination
        if (answer.includes("Analyze") || answer.includes("weigh") || answer.includes("pros and cons")) {
          updatedProfile.decisionStyle = "Analytical";
          updatedProfile.moduleScores.SP1 += 1;
        } else if (answer.includes("gut") || answer.includes("instinct") || answer.includes("feels")) {
          updatedProfile.decisionStyle = "Intuitive";
          updatedProfile.moduleScores.E1 += 1;
        } else if (answer.includes("advice") || answer.includes("others") || answer.includes("input") || answer.includes("ask")) {
          updatedProfile.decisionStyle = "Collaborative";
          updatedProfile.moduleScores.E2 += 2;
          updatedProfile.moduleScores.E3 += 1;
        } else if (answer.includes("wait") || answer.includes("avoid") || answer.includes("last moment") || answer.includes("until")) {
          updatedProfile.decisionStyle = "Cautious";
          updatedProfile.moduleScores.S2 += 2;
          updatedProfile.moduleScores.SP1 += 1;
        } else if (answer.includes("quick") || answer.includes("adapt") || answer.includes("act") || answer.includes("decide")) {
          updatedProfile.decisionStyle = "Decisive";
          updatedProfile.moduleScores.SP2 += 1;
        }
        break;

      case "Communication":
        // Improved communication style determination
        if (answer.includes("peace") || answer.includes("avoid conflict") || answer.includes("keep")) {
          updatedProfile.emotional1 = "Values harmony";
          updatedProfile.communicationStyle = "Accommodating";
          updatedProfile.moduleScores.E2 += 2;
          updatedProfile.moduleScores.E3 += 3;
        } else if (answer.includes("speak") || answer.includes("directly") || answer.includes("mind")) {
          updatedProfile.emotional1 = "Direct communicator";
          updatedProfile.communicationStyle = "Direct";
          updatedProfile.moduleScores.E2 += 1;
        } else if (answer.includes("listen") || answer.includes("reflect") || answer.includes("before responding")) {
          updatedProfile.emotional1 = "Reflective";
          updatedProfile.communicationStyle = "Reflective";
          updatedProfile.moduleScores.E1 += 2;
          updatedProfile.moduleScores.SP3 += 1;
        } else if (answer.includes("Disengage") || answer.includes("move on")) {
          updatedProfile.emotional1 = "Independent";
          updatedProfile.communicationStyle = "Avoidant";
          updatedProfile.moduleScores.E2 += 3;
          updatedProfile.moduleScores.E3 += 2;
        }

        // For question about relationships - more flexible matching
        if (question.id === 16) {
          if (answer.includes("emotional") || answer.includes("Deepening")) {
            updatedProfile.emotional2 = "Prioritizes emotional depth";
            updatedProfile.growthPriorities.relationships = "Deepening emotional connections";
            updatedProfile.moduleScores.E1 += 2;
            updatedProfile.moduleScores.E2 += 3;
          } else if (answer.includes("professional") || answer.includes("Building")) {
            updatedProfile.emotional2 = "Career-focused relationships";
            updatedProfile.growthPriorities.career = "Building professional networks";
            updatedProfile.moduleScores.E2 += 2;
            updatedProfile.moduleScores.E3 += 1;
          } else if (answer.includes("socially") || answer.includes("confident")) {
            updatedProfile.emotional2 = "Developing social confidence";
            updatedProfile.growthPriorities.personalDev = "Building social confidence";
            updatedProfile.moduleScores.E2 += 2;
            updatedProfile.moduleScores.E3 += 2;
          } else if (answer.includes("Expressing") || answer.includes("thoughts") || answer.includes("needs")) {
            updatedProfile.emotional2 = "Self-expression focused";
            updatedProfile.moduleScores.E1 += 2;
            updatedProfile.moduleScores.E2 += 2;
          }

          // Infer emotional1 if not set yet
          if (!updatedProfile.emotional1) {
            if (updatedProfile.emotional2 === "Prioritizes emotional depth") {
              updatedProfile.emotional1 = "Emotionally aware";
            } else if (updatedProfile.emotional2 === "Self-expression focused") {
              updatedProfile.emotional1 = "Direct communicator";
            }
          }
        }

        // New Communication Style Question - (ID 30)
        if (question.id === 30) {
          if (answer.includes("Direct and straightforward")) {
            updatedProfile.communicationStyle = "Direct";
            updatedProfile.moduleScores.E2 += 2;
          } else if (answer.includes("Gentle and supportive")) {
            updatedProfile.communicationStyle = "Supportive";
            updatedProfile.moduleScores.E2 += 1;
            updatedProfile.moduleScores.E3 += 2;
          } else if (answer.includes("Analytical and detailed")) {
            updatedProfile.communicationStyle = "Analytical";
            updatedProfile.moduleScores.E2 += 1;
          } else if (answer.includes("Asking questions")) {
            updatedProfile.communicationStyle = "Inquiring";
            updatedProfile.moduleScores.E2 += 2;
            updatedProfile.moduleScores.E1 += 1;
          }
        }

        // New Emotional Approach Questions (ID 31 & 32)
        if (question.id === 31) {
          if (answer.includes("Analyze them logically")) {
            updatedProfile.emotional2 = "Analytical emotional processor";
            updatedProfile.moduleScores.E1 += 2;
          } else if (answer.includes("Express them openly")) {
            updatedProfile.emotional2 = "Expressive emotional processor";
            updatedProfile.moduleScores.E1 += 1;
            updatedProfile.moduleScores.E2 += 2;
          } else if (answer.includes("Contain them until")) {
            updatedProfile.emotional2 = "Private emotional processor";
            updatedProfile.moduleScores.E1 += 3;
          } else if (answer.includes("Seek support")) {
            updatedProfile.emotional2 = "Socially connected emotional processor";
            updatedProfile.moduleScores.E2 += 2;
            updatedProfile.moduleScores.E3 += 1;
          } else if (answer.includes("Distract myself")) {
            updatedProfile.emotional2 = "Distractive emotional processor";
            updatedProfile.moduleScores.S1 += 2;
            updatedProfile.moduleScores.E1 += 2;
          }
        }

        if (question.id === 32) {
          if (answer.includes("Maintaining rational")) {
            updatedProfile.emotional2 = updatedProfile.emotional2 || "Rational emotional approach";
            updatedProfile.moduleScores.S2 += 1;
          } else if (answer.includes("Authentically expressing")) {
            updatedProfile.emotional2 = updatedProfile.emotional2 || "Authentic emotional approach";
            updatedProfile.moduleScores.E1 += 2;
          } else if (answer.includes("Understanding others")) {
            updatedProfile.emotional2 = updatedProfile.emotional2 || "Empathetic emotional approach";
            updatedProfile.moduleScores.E2 += 2;
            updatedProfile.moduleScores.E3 += 1;
          } else if (answer.includes("Finding practical")) {
            updatedProfile.emotional2 = updatedProfile.emotional2 || "Solution-oriented emotional approach";
            updatedProfile.moduleScores.S3 += 2;
          } else if (answer.includes("Preserving harmony")) {
            updatedProfile.emotional2 = updatedProfile.emotional2 || "Harmony-focused emotional approach";
            updatedProfile.moduleScores.E3 += 3;
          }
        }
        break;

      case "Barriers":
        // More flexible barrier identification
        if (answer.includes("knowing") || answer.includes("want") || answer.includes("direction")) {
          updatedProfile.barrier = "Lack of goals";
          updatedProfile.barrierImpact = "Moderate";
          updatedProfile.moduleScores.SP1 += 3;
          updatedProfile.moduleScores.SP2 += 3;
          updatedProfile.moduleScores.E1 += 2;
        } else if (answer.includes("fear") || answer.includes("fail") || answer.includes("mistakes")) {
          updatedProfile.barrier = "Fear of failure";
          updatedProfile.barrierImpact = "High";
          updatedProfile.moduleScores.S2 += 3;
          updatedProfile.moduleScores.S1 += 2;
        } else if (answer.includes("overwhelm") || answer.includes("too many") || answer.includes("choices")) {
          updatedProfile.barrier = "Overwhelm";
          updatedProfile.barrierImpact = "High";
          updatedProfile.moduleScores.S1 += 3;
          updatedProfile.moduleScores.S3 += 2;
          updatedProfile.moduleScores.E3 += 2;
        } else if (answer.includes("time") || answer.includes("resources")) {
          updatedProfile.barrier = "Time constraints";
          updatedProfile.barrierImpact = "Moderate";
          updatedProfile.moduleScores.S3 += 3;
          updatedProfile.moduleScores.P3 += 2;
        } else if (answer.includes("motivation") || answer.includes("consistency")) {
          updatedProfile.barrier = "Lack of consistency";
          updatedProfile.barrierImpact = "Moderate";
          updatedProfile.moduleScores.S3 += 3;
          updatedProfile.moduleScores.SP2 += 2;
          updatedProfile.moduleScores.P2 += 1;
        }
        break;

      case "Readiness":
        // Improved readiness detection
        if (answer.includes("ready") || answer.includes("active") || answer.includes("making") ||
            answer.includes("Excited") || answer.includes("love improving")) {
          updatedProfile.readiness = "Action";
          updatedProfile.moduleScores.SP2 += 2;
          updatedProfile.moduleScores.P2 += 1;
        } else if (answer.includes("planning") || answer.includes("Cautious") || answer.includes("step by step")) {
          updatedProfile.readiness = "Preparation";
          updatedProfile.moduleScores.SP2 += 1;
          updatedProfile.moduleScores.S3 += 1;
        } else if (answer.includes("want to") || answer.includes("change") || answer.includes("hesitant") ||
                 answer.includes("Nervous") || answer.includes("worry")) {
          updatedProfile.readiness = "Contemplation";
          updatedProfile.moduleScores.S2 += 2;
          updatedProfile.moduleScores.E1 += 1;
        } else if (answer.includes("don't think") || answer.includes("need") || answer.includes("Not sure")) {
          updatedProfile.readiness = "Pre-contemplation";
          updatedProfile.moduleScores.SP1 += 2;
          updatedProfile.moduleScores.E1 += 1;
        }

        // Learning style determination with broader pattern matching
        if (question.id === 10) {
          if (answer.includes("steps") || answer.includes("Breaking") || answer.includes("structuring")) {
            updatedProfile.learningStyle = "Structured";
            updatedProfile.moduleScores.S3 += 1;
          } else if (answer.includes("hands-on") || answer.includes("Jumping") || answer.includes("learning")) {
            updatedProfile.learningStyle = "Experiential";
            updatedProfile.moduleScores.P2 += 1;
          } else if (answer.includes("Watch") || answer.includes("listen") || answer.includes("observing")) {
            updatedProfile.learningStyle = "Visual";
          } else if (answer.includes("Read") || answer.includes("research")) {
            updatedProfile.learningStyle = "Theoretical";
            updatedProfile.moduleScores.SP1 += 1;
          } else if (answer.includes("Discuss") || answer.includes("experienced")) {
            updatedProfile.learningStyle = "Social";
            updatedProfile.moduleScores.E2 += 1;
          }
        }
        break;

      case "Coaching":
        // Improved growth priorities detection
        if (question.id === 21) { // Question about feeling stuck
          if (answer.includes("personal") || answer.includes("mindset") || answer.includes("growth")) {
            updatedProfile.growthPriorities.personalDev = "Mindset development";
            updatedProfile.moduleScores.S2 += 2;
            updatedProfile.moduleScores.SP1 += 2;
          } else if (answer.includes("career") || answer.includes("work")) {
            updatedProfile.growthPriorities.career = "Work-life balance";
            updatedProfile.moduleScores.S3 += 2;
            updatedProfile.moduleScores.P3 += 1;
          } else if (answer.includes("relationship") || answer.includes("social")) {
            updatedProfile.growthPriorities.relationships = "Social connections";
            updatedProfile.moduleScores.E2 += 3;
            updatedProfile.moduleScores.E3 += 2;
          } else if (answer.includes("health") || answer.includes("well")) {
            updatedProfile.growthPriorities.health = "Well-being";
            updatedProfile.moduleScores.P1 += 3;
            updatedProfile.moduleScores.P2 += 2;
            updatedProfile.moduleScores.P3 += 2;
          } else if (answer.includes("finance") || answer.includes("security")) {
            updatedProfile.growthPriorities.finances = "Financial security";
            updatedProfile.moduleScores.S3 += 1;
          }
        }
        break;

      case "Learning Style":
        // Learning style determination with broader pattern matching
        if (question.id === 10) {
          if (answer.includes("steps") || answer.includes("Breaking") || answer.includes("structuring")) {
            updatedProfile.learningStyle = "Structured";
            updatedProfile.moduleScores.S3 += 1;
          } else if (answer.includes("hands-on") || answer.includes("Jumping") || answer.includes("learning")) {
            updatedProfile.learningStyle = "Experiential";
            updatedProfile.moduleScores.P2 += 1;
          } else if (answer.includes("Watch") || answer.includes("listen") || answer.includes("observing")) {
            updatedProfile.learningStyle = "Visual";
          } else if (answer.includes("Read") || answer.includes("research")) {
            updatedProfile.learningStyle = "Theoretical";
            updatedProfile.moduleScores.SP1 += 1;
          } else if (answer.includes("Discuss") || answer.includes("experienced")) {
            updatedProfile.learningStyle = "Social";
            updatedProfile.moduleScores.E2 += 1;
          }
        }

        // New Learning Style Questions (ID 33 & 34)
        if (question.id === 33) {
          if (answer.includes("Following step-by-step")) {
            updatedProfile.learningStyle = "Structured";
            updatedProfile.moduleScores.S3 += 2;
          } else if (answer.includes("Figuring it out through trial")) {
            updatedProfile.learningStyle = "Experiential";
            updatedProfile.moduleScores.P2 += 2;
          } else if (answer.includes("Reading comprehensive")) {
            updatedProfile.learningStyle = "Theoretical";
            updatedProfile.moduleScores.SP1 += 2;
          } else if (answer.includes("Watching someone")) {
            updatedProfile.learningStyle = "Visual";
            updatedProfile.moduleScores.E1 += 1;
          } else if (answer.includes("Discussing the concept")) {
            updatedProfile.learningStyle = "Social";
            updatedProfile.moduleScores.E2 += 2;
          }
        }

        if (question.id === 34) {
          if (answer.includes("Create visual diagrams")) {
            updatedProfile.learningStyle = updatedProfile.learningStyle || "Visual";
            updatedProfile.moduleScores.E1 += 1;
          } else if (answer.includes("Write detailed notes")) {
            updatedProfile.learningStyle = updatedProfile.learningStyle || "Structured";
            updatedProfile.moduleScores.S3 += 1;
          } else if (answer.includes("Teach the information")) {
            updatedProfile.learningStyle = updatedProfile.learningStyle || "Social";
            updatedProfile.moduleScores.E2 += 2;
          } else if (answer.includes("Apply the information")) {
            updatedProfile.learningStyle = updatedProfile.learningStyle || "Experiential";
            updatedProfile.moduleScores.P2 += 1;
          } else if (answer.includes("Create acronyms")) {
            updatedProfile.learningStyle = updatedProfile.learningStyle || "Conceptual";
            updatedProfile.moduleScores.SP1 += 1;
          }
        }
        break;

      case "Barriers":
        // More flexible barrier identification
        if (answer.includes("knowing") || answer.includes("want") || answer.includes("direction")) {
          updatedProfile.barrier = "Lack of goals";
          updatedProfile.barrierImpact = "Moderate";
          updatedProfile.moduleScores.SP1 += 3;
          updatedProfile.moduleScores.SP2 += 3;
          updatedProfile.moduleScores.E1 += 2;
        } else if (answer.includes("fear") || answer.includes("fail") || answer.includes("mistakes")) {
          updatedProfile.barrier = "Fear of failure";
          updatedProfile.barrierImpact = "High";
          updatedProfile.moduleScores.S2 += 3;
          updatedProfile.moduleScores.S1 += 2;
        } else if (answer.includes("overwhelm") || answer.includes("too many") || answer.includes("choices")) {
          updatedProfile.barrier = "Overwhelm";
          updatedProfile.barrierImpact = "High";
          updatedProfile.moduleScores.S1 += 3;
          updatedProfile.moduleScores.S3 += 2;
          updatedProfile.moduleScores.E3 += 2;
        } else if (answer.includes("time") || answer.includes("resources")) {
          updatedProfile.barrier = "Time constraints";
          updatedProfile.barrierImpact = "Moderate";
          updatedProfile.moduleScores.S3 += 3;
          updatedProfile.moduleScores.P3 += 2;
        } else if (answer.includes("motivation") || answer.includes("consistency")) {
          updatedProfile.barrier = "Lack of consistency";
          updatedProfile.barrierImpact = "Moderate";
          updatedProfile.moduleScores.S3 += 3;
          updatedProfile.moduleScores.SP2 += 2;
          updatedProfile.moduleScores.P2 += 1;
        }
        break;

      case "Readiness":
        // Improved readiness detection
        if (answer.includes("ready") || answer.includes("active") || answer.includes("making") ||
            answer.includes("Excited") || answer.includes("love improving")) {
          updatedProfile.readiness = "Action";
          updatedProfile.moduleScores.SP2 += 2;
          updatedProfile.moduleScores.P2 += 1;
        } else if (answer.includes("planning") || answer.includes("Cautious") || answer.includes("step by step")) {
          updatedProfile.readiness = "Preparation";
          updatedProfile.moduleScores.SP2 += 1;
          updatedProfile.moduleScores.S3 += 1;
        } else if (answer.includes("want to") || answer.includes("change") || answer.includes("hesitant") ||
                 answer.includes("Nervous") || answer.includes("worry")) {
          updatedProfile.readiness = "Contemplation";
          updatedProfile.moduleScores.S2 += 2;
          updatedProfile.moduleScores.E1 += 1;
        } else if (answer.includes("don't think") || answer.includes("need") || answer.includes("Not sure")) {
          updatedProfile.readiness = "Pre-contemplation";
          updatedProfile.moduleScores.SP1 += 2;
          updatedProfile.moduleScores.E1 += 1;
        }

        // Learning style determination with broader pattern matching
        if (question.id === 10) {
          if (answer.includes("steps") || answer.includes("Breaking") || answer.includes("structuring")) {
            updatedProfile.learningStyle = "Structured";
            updatedProfile.moduleScores.S3 += 1;
          } else if (answer.includes("hands-on") || answer.includes("Jumping") || answer.includes("learning")) {
            updatedProfile.learningStyle = "Experiential";
            updatedProfile.moduleScores.P2 += 1;
          } else if (answer.includes("Watch") || answer.includes("listen") || answer.includes("observing")) {
            updatedProfile.learningStyle = "Visual";
          } else if (answer.includes("Read") || answer.includes("research")) {
            updatedProfile.learningStyle = "Theoretical";
            updatedProfile.moduleScores.SP1 += 1;
          } else if (answer.includes("Discuss") || answer.includes("experienced")) {
            updatedProfile.learningStyle = "Social";
            updatedProfile.moduleScores.E2 += 1;
          }
        }
        break;

      case "Coaching":
        // Improved growth priorities detection
        if (question.id === 21) { // Question about feeling stuck
          if (answer.includes("personal") || answer.includes("mindset") || answer.includes("growth")) {
            updatedProfile.growthPriorities.personalDev = "Mindset development";
            updatedProfile.moduleScores.S2 += 2;
            updatedProfile.moduleScores.SP1 += 2;
          } else if (answer.includes("career") || answer.includes("work")) {
            updatedProfile.growthPriorities.career = "Work-life balance";
            updatedProfile.moduleScores.S3 += 2;
            updatedProfile.moduleScores.P3 += 1;
          } else if (answer.includes("relationship") || answer.includes("social")) {
            updatedProfile.growthPriorities.relationships = "Social connections";
            updatedProfile.moduleScores.E2 += 3;
            updatedProfile.moduleScores.E3 += 2;
          } else if (answer.includes("health") || answer.includes("well")) {
            updatedProfile.growthPriorities.health = "Well-being";
            updatedProfile.moduleScores.P1 += 3;
            updatedProfile.moduleScores.P2 += 2;
            updatedProfile.moduleScores.P3 += 2;
          } else if (answer.includes("finance") || answer.includes("security")) {
            updatedProfile.growthPriorities.finances = "Financial security";
            updatedProfile.moduleScores.S3 += 1;
          }
        }
        break;
    }

    setProfile(updatedProfile);
  };

  // Calculate module recommendations based on the completed profile
  const calculateModuleRecommendations = () => {
    const updatedProfile = { ...profile };

    // Determine emotional state score - if we have enough data
    let emotionalStateScore = 0;
    let emotionalStateCount = 0;

    if (updatedProfile.emotional1) {
      if (updatedProfile.emotional1 === "Values harmony" || updatedProfile.emotional1 === "Reflective") {
        emotionalStateScore += 6;
      } else if (updatedProfile.emotional1 === "Direct communicator") {
        emotionalStateScore += 7;
      } else if (updatedProfile.emotional1 === "Independent") {
        emotionalStateScore += 4;
      }
      emotionalStateCount++;
    }

    if (updatedProfile.emotional2) {
      if (updatedProfile.emotional2 === "Prioritizes emotional depth") {
        emotionalStateScore += 7;
      } else if (updatedProfile.emotional2 === "Self-expression focused") {
        emotionalStateScore += 6;
      }
      emotionalStateCount++;
    }

    const avgEmotionalState = emotionalStateCount > 0 ? emotionalStateScore / emotionalStateCount : null;

    // Add points based on emotional state
    if (avgEmotionalState !== null) {
      if (avgEmotionalState < 5) {
        updatedProfile.moduleScores.S1 += 3;
        updatedProfile.moduleScores.S2 += 2;
        updatedProfile.moduleScores.E1 += 2;
      } else if (avgEmotionalState < 7) {
        updatedProfile.moduleScores.S1 += 1;
        updatedProfile.moduleScores.E1 += 1;
      }
    }

    // Add points based on barriers
    if (updatedProfile.barrier) {
      const impactMultiplier = updatedProfile.barrierImpact === "High" ? 3 :
                             updatedProfile.barrierImpact === "Moderate" ? 2 : 1;

      if (updatedProfile.barrier === "Fear of failure") {
        updatedProfile.moduleScores.S2 += impactMultiplier;
      } else if (updatedProfile.barrier === "Overwhelm") {
        updatedProfile.moduleScores.S1 += impactMultiplier;
        updatedProfile.moduleScores.S3 += impactMultiplier;
      } else if (updatedProfile.barrier === "Time constraints") {
        updatedProfile.moduleScores.S3 += impactMultiplier;
      } else if (updatedProfile.barrier === "Lack of consistency") {
        updatedProfile.moduleScores.S3 += impactMultiplier;
      } else if (updatedProfile.barrier === "Lack of goals") {
        updatedProfile.moduleScores.SP1 += impactMultiplier;
        updatedProfile.moduleScores.SP2 += impactMultiplier;
      }
    }

    // Add points based on growth priorities
    const priorities = updatedProfile.growthPriorities;
    Object.entries(priorities).forEach(([domain, value]) => {
      if (!value) return;

      if (domain === "health") {
        updatedProfile.moduleScores.P1 += 3;
        updatedProfile.moduleScores.P2 += 3;
        updatedProfile.moduleScores.P3 += 2;
      } else if (domain === "career") {
        updatedProfile.moduleScores.SP2 += 2;
        updatedProfile.moduleScores.E2 += 1;
      } else if (domain === "relationships") {
        updatedProfile.moduleScores.E2 += 3;
        updatedProfile.moduleScores.E3 += 2;
      } else if (domain === "personalDev") {
        updatedProfile.moduleScores.SP1 += 2;
        updatedProfile.moduleScores.E1 += 2;
        updatedProfile.moduleScores.SP3 += 1;
      } else if (domain === "finances") {
        updatedProfile.moduleScores.S3 += 1;
      }
    });

    // Find top 5 recommended modules
    const sortedModules = Object.entries(updatedProfile.moduleScores)
      .sort((a, b) => b[1] - a[1])
      .filter(([_, score]) => score > 0)
      .slice(0, 5)
      .map(([module, _]) => module);

    updatedProfile.recommendedModules = sortedModules;

    // Check for predefined groups
    if (updatedProfile.moduleScores.S1 >= 3 && updatedProfile.moduleScores.S2 >= 3) {
      updatedProfile.recommendedGroups.push("Stress Starter Pack");
    }

    if (updatedProfile.moduleScores.P1 >= 3 && updatedProfile.moduleScores.P2 >= 2 && updatedProfile.moduleScores.P3 >= 2) {
      updatedProfile.recommendedGroups.push("Physical Vitality Track");
    }

    if (updatedProfile.moduleScores.E2 >= 3 && updatedProfile.moduleScores.E3 >= 2) {
      updatedProfile.recommendedGroups.push("Relationship Booster");
    }

    if (updatedProfile.moduleScores.SP1 >= 3 && updatedProfile.moduleScores.SP2 >= 2) {
      updatedProfile.recommendedGroups.push("Finding Your Path");
    }

    if (updatedProfile.moduleScores.S1 >= 2 && updatedProfile.moduleScores.SP3 >= 2) {
      updatedProfile.recommendedGroups.push("Deep Mindfulness Path");
    }

    setProfile(updatedProfile);
  };

  // Enhanced isProfileComplete function to end quiz early when possible
  const isProfileComplete = () => {
    // Core profile attributes needed for accurate recommendations
    const hasEnneagramType = profile.enneagramType !== null && profile.enneagramType !== undefined;
    const hasMindset = profile.mindset1 !== null && profile.mindset1 !== undefined;
    const hasDecisionStyle = profile.decisionStyle !== null && profile.decisionStyle !== undefined;
    const hasBarrier = profile.barrier !== null && profile.barrier !== undefined;

    // Check for at least one growth priority
    const hasGrowthPriority = Object.values(profile.growthPriorities).some(value => value !== null && value !== undefined);

    // Calculate how many key attributes we have
    const attributeCount = [
      hasEnneagramType,
      hasMindset,
      hasDecisionStyle,
      hasBarrier,
      profile.communicationStyle,
      profile.readiness,
      profile.learningStyle
    ].filter(Boolean).length;

    // We need at least 4 key attributes and a growth priority to make good recommendations
    const hasEnoughData = attributeCount >= 4 && hasGrowthPriority;

    // Check how many questions have been answered
    const questionsAnswered = Object.keys(answers).length;

    // Alternative completion criteria: enough questions answered for minimal profile
    const hasMinimumQuestions = questionsAnswered >= 7;

    // End quiz if we have enough data OR enough questions
    return hasEnoughData || hasMinimumQuestions;
  };

  // Improved question selection logic for more efficient profiling
  const determineNextQuestion = () => {
    // If we have enough information for a determination, we can skip to the end
    if (isProfileComplete()) {
      return questions.length; // This will trigger the submitted state
    }

    const answeredQuestionIds = Object.keys(answers).map(id => parseInt(id));
    const unansweredQuestions = questions.filter(q => !answeredQuestionIds.includes(q.id));

    // Track what categories we've covered
    const answeredCategories = new Set();
    answeredQuestionIds.forEach(id => {
      const question = questions.find(q => q.id === id);
      if (question) {
        answeredCategories.add(question.category);
      }
    });

    // PRIORITY 1: Essential type-determining questions first

    // If we haven't asked any Enneagram questions yet, start there (question 1)
    if (!answeredQuestionIds.includes(1)) {
      return 0; // First question in the array (index 0)
    }

    // If we asked Q1 but not Q2, and still need Enneagram refinement, ask Q2
    if (answeredQuestionIds.includes(1) && !answeredQuestionIds.includes(2) &&
        (!profile.enneagramType || profile.enneagramType === "Unknown")) {
      return questions.findIndex(q => q.id === 2);
    }

    // If we still don't have an Enneagram type after Q1 and Q2, ask Q4
    if (answeredQuestionIds.includes(1) && answeredQuestionIds.includes(2) &&
        !answeredQuestionIds.includes(4) && (!profile.enneagramType || profile.enneagramType === "Unknown")) {
      return questions.findIndex(q => q.id === 4);
    }

    // PRIORITY 2: Get essential mindset information

    // If no mindset information yet, ask a mindset question (Q8)
    if (!profile.mindset1 && !answeredQuestionIds.includes(8)) {
      return questions.findIndex(q => q.id === 8);
    }

    // If we have Q8 but mindset is still unclear, ask Q9
    if (answeredQuestionIds.includes(8) && !profile.mindset2 && !answeredQuestionIds.includes(9)) {
      return questions.findIndex(q => q.id === 9);
    }

    // PRIORITY 3: Get barrier information if not available

    // If we don't know their barrier, prioritize barrier questions
    if (!profile.barrier) {
      const barrierQuestion = unansweredQuestions.find(q => q.category === "Barriers");
      if (barrierQuestion) {
        return questions.findIndex(q => q.id === barrierQuestion.id);
      }
    }

    // PRIORITY 4: Get decision style if not available

    // If we don't know their decision style, ask a decision-making question
    if (!profile.decisionStyle) {
      const decisionQuestion = unansweredQuestions.find(q => q.category === "Decision-Making");
      if (decisionQuestion) {
        return questions.findIndex(q => q.id === decisionQuestion.id);
      }
    }

    // PRIORITY 5: Get communication style if not available

    // If we don't know their communication style, prioritize communication questions
    if (!profile.communicationStyle) {
      // First try our new, more specific communication style question (Q30)
      if (!answeredQuestionIds.includes(30)) {
        return questions.findIndex(q => q.id === 30);
      }

      // Then try other communication questions
      const commQuestion = unansweredQuestions.find(q => q.category === "Communication");
      if (commQuestion) {
        return questions.findIndex(q => q.id === commQuestion.id);
      }
    }

    // PRIORITY 5B: Get emotional approach if not available
    if (!profile.emotional2) {
      // First try our new emotional approach questions (Q31 or Q32)
      if (!answeredQuestionIds.includes(31)) {
        return questions.findIndex(q => q.id === 31);
      }
      if (!answeredQuestionIds.includes(32)) {
        return questions.findIndex(q => q.id === 32);
      }
    }

    // PRIORITY 6: Get readiness information if not available

    // If we don't know their readiness, ask a readiness question
    if (!profile.readiness) {
      const readinessQuestion = unansweredQuestions.find(q => q.category === "Readiness");
      if (readinessQuestion) {
        return questions.findIndex(q => q.id === readinessQuestion.id);
      }
    }

    // PRIORITY 7: Get learning style if not available

    // If we don't know their learning style, prioritize learning style questions
    if (!profile.learningStyle) {
      // First try our new, more specific learning style questions (Q33 or Q34)
      if (!answeredQuestionIds.includes(33)) {
        return questions.findIndex(q => q.id === 33);
      }
      if (!answeredQuestionIds.includes(34)) {
        return questions.findIndex(q => q.id === 34);
      }

      // Then try the original learning style question (Q10)
      if (!answeredQuestionIds.includes(10)) {
        return questions.findIndex(q => q.id === 10);
      }
    }

    // PRIORITY 8: Get at least one growth priority area

    // If we don't have growth priorities, ask Q21
    const hasAnyPriority = Object.values(profile.growthPriorities).some(value => value !== null);
    if (!hasAnyPriority && !answeredQuestionIds.includes(21)) {
      return questions.findIndex(q => q.id === 21);
    }

    // FALLBACK: If we still need more information, go to next unanswered question
    if (unansweredQuestions.length > 0) {
      return questions.findIndex(q => q.id === unansweredQuestions[0].id);
    }

    // If we've asked all questions, we're done
    return currentIndex + 1;
  };

  const handleAnswer = (answer) => {
    const currentQuestionId = questions[currentIndex].id;

    // Update answers state
    setAnswers((prev) => ({ ...prev, [currentQuestionId]: answer }));

    // Update profile based on the answer
    updateProfile(currentQuestionId, answer);

    // Determine next question
    const nextIndex = determineNextQuestion();

    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      // Calculate module recommendations before submitting
      calculateModuleRecommendations();
      setSubmitted(true);
      setStep(2); // Move to completion step
    }
  };

  const handleStartAssessment = () => {
    setStep(1); // Move from intro to assessment
  };

  const handleSubmit = () => {
    // Final calculation of module recommendations
    calculateModuleRecommendations();

    // Prepare complete results object
    const moduleInfo = {
      S1: { name: "Introduction to Mindful Breathing & Relaxation",
            description: "Basic breathing techniques and quick relaxation strategies to reduce acute stress." },
      S2: { name: "Emotional Resilience & Thought Reframing",
            description: "Cognitive-behavioral techniques to identify and replace negative self-talk." },
      S3: { name: "Building Daily Self-Care & Routine",
            description: "Creating simple daily habits to consistently manage stress and maintain mental health." },
      P1: { name: "Balanced Nutrition Foundations",
            description: "Whole-food nutrition, hydration, and mindful eating practices." },
      P2: { name: "Movement & Exercise Routines",
            description: "Finding enjoyable physical activities and creating sustainable exercise habits." },
      P3: { name: "Better Sleep & Recovery",
            description: "Sleep hygiene tips, relaxation before bed, and establishing bedtime routines." },
      E1: { name: "Self-Awareness & Journaling",
            description: "Techniques for introspection, emotion labeling, and tracking personal patterns." },
      E2: { name: "Communication & Relationship Skills",
            description: "Active listening, constructive expression, and conflict resolution basics." },
      E3: { name: "Boundaries & Social Connection",
            description: "Setting healthy boundaries and building support networks." },
      SP1: { name: "Core Values & Personal Alignment",
             description: "Exercises to identify personal core values and reflect on meaningful experiences." },
      SP2: { name: "Life Vision & Goal Setting",
             description: "Defining a vision, setting SMART goals, and creating a personal roadmap." },
      SP3: { name: "Mindfulness & Gratitude",
             description: "Spiritual or philosophical practices for deeper peace and meaning." }
    };

    const groupInfo = {
      "Stress Starter Pack": {
        modules: ["S1", "S2"],
        description: "Essential techniques for managing stress and building resilience."
      },
      "Physical Vitality Track": {
        modules: ["P1", "P2", "P3"],
        description: "Comprehensive approach to improving physical health and energy."
      },
      "Relationship Booster": {
        modules: ["E2", "E3"],
        description: "Skills to improve communication and build healthier relationships."
      },
      "Finding Your Path": {
        modules: ["SP1", "SP2"],
        description: "Discover your values and create a meaningful life vision."
      },
      "Deep Mindfulness Path": {
        modules: ["S1", "SP3"],
        description: "Combine stress reduction with deeper spiritual practices."
      }
    };

    // Create final results object
    const assessmentResults = {
      profile: profile,
      moduleInfo: moduleInfo,
      groupInfo: groupInfo,
      recommendedModules: profile.recommendedModules.map(code => ({
        code,
        ...moduleInfo[code]
      })),
      recommendedGroups: profile.recommendedGroups.map(name => ({
        name,
        ...groupInfo[name]
      }))
    };

    // Save to localStorage for the results page
    localStorage.setItem("selfAssessmentResponses", JSON.stringify(assessmentResults));

    // Navigate to results page
    router.push("/divisions/summit/learninghub/self-assessment/results");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-6 text-white">
      <div className="w-full max-w-4xl">

        {/* Introduction Screen */}
        {step === 0 && (
          <div className={`max-w-3xl mx-auto bg-gray-800 rounded-xl p-8 shadow-2xl transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">
              Welcome to Your Personal Growth Assessment
            </h1>

            <div className="space-y-6 text-gray-200">
              <p className="text-lg">
                This assessment is designed to help you discover personalized insights about your:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Personality type and natural tendencies</li>
                <li>Mindset and approach to challenges</li>
                <li>Communication and learning preferences</li>
                <li>Growth opportunities that align with your priorities</li>
              </ul>

              <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700/50">
                <h3 className="font-semibold text-blue-300 mb-2">How to get the most from this assessment:</h3>
                <ul className="list-disc pl-6 space-y-1 text-blue-100">
                  <li>Take your time to read each question carefully</li>
                  <li>Choose the options that reflect your natural tendencies, not what you aspire to be</li>
                  <li>Answer honestly - there are no right or wrong responses</li>
                  <li>Find a quiet space where you can reflect without distractions</li>
                </ul>
              </div>

              <p>
                This assessment typically takes 5-7 minutes to complete. Your personalized results will help guide your growth journey and identify resources that align with your unique needs.
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleStartAssessment}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Begin Assessment
              </button>
            </div>
          </div>
        )}

        {/* Assessment Questions Screen */}
        {step === 1 && (
          <div className={`max-w-3xl mx-auto bg-gray-800 rounded-xl p-8 shadow-2xl transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-1">
                <span>Assessment Progress</span>
                <span>{progress}% Complete</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-6 text-center text-blue-300">
              {questions[currentIndex].text}
            </h2>

            <div className="grid gap-4">
              {questions[currentIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg text-left border border-gray-600 shadow-md transform hover:scale-[1.02] hover:bg-gray-600/80 active:scale-[0.98] transition-all duration-150"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="mt-8 text-center text-sm text-gray-400">
              <p>Take your time to consider each option carefully.</p>
              <p>Your thoughtful answers will lead to more personalized results.</p>
            </div>
          </div>
        )}

        {/* Completion Screen */}
        {step === 2 && (
          <div className={`max-w-3xl mx-auto bg-gray-800 rounded-xl p-8 shadow-2xl text-center transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-[ping_1s_ease-in-out_1]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-green-400">
              Thank You for Completing Your Assessment!
            </h2>

            <p className="text-lg mb-8 text-gray-200">
              We've gathered enough information to create your personalized growth plan. Click below to see your results and discover tailored strategies for your journey.
            </p>

            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              View My Results
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
