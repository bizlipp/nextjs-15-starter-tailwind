"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SelfAssessmentResults() {
  const router = useRouter();
  const [results, setResults] = useState(null);
  const [actionPlan, setActionPlan] = useState(null);

  useEffect(() => {
    try {
      const storedResponses = JSON.parse(localStorage.getItem("selfAssessmentResponses"));
      if (!storedResponses) {
        router.push("/divisions/summit/learninghub/self-assessment");
      } else {
        // Generate personalized action plan for the quiz taker
        const personalizedPlan = generatePersonalizedPlan(storedResponses);
        setResults(storedResponses);
        setActionPlan(personalizedPlan);
      }
    } catch (error) {
      console.error("Error processing assessment results:", error);
      router.push("/divisions/summit/learninghub/self-assessment");
    }
  }, [router]);

  // Generate a simplified, personalized action plan for the quiz taker
  const generatePersonalizedPlan = (responses) => {
    // Extract key insights from the assessment
    const profile = responses.profile;
    const recommendedModules = responses.recommendedModules || [];

    // Determine the focus areas based on growth priorities
    const focusAreas = [];
    const priorities = profile.growthPriorities || {};

    Object.entries(priorities).forEach(([area, value]) => {
      if (value) {
        switch(area) {
          case "health":
            focusAreas.push({
              area: "Physical Well-being",
              description: "Focus on developing sustainable health habits that boost your energy and resilience."
            });
            break;
          case "career":
            focusAreas.push({
              area: "Professional Growth",
              description: "Develop skills and strategies to enhance your work satisfaction and effectiveness."
            });
            break;
          case "relationships":
            focusAreas.push({
              area: "Social Connection",
              description: "Strengthen your ability to build and maintain meaningful relationships."
            });
            break;
          case "personalDev":
            focusAreas.push({
              area: "Personal Development",
              description: "Invest in your growth mindset and self-understanding for greater fulfillment."
            });
            break;
          case "finances":
            focusAreas.push({
              area: "Financial Wellness",
              description: "Create healthier approaches to managing resources and planning for the future."
            });
            break;
        }
      }
    });

    // If no clear priorities were identified, add a general development area
    if (focusAreas.length === 0) {
      focusAreas.push({
        area: "Holistic Well-being",
        description: "Develop a balanced approach to personal growth across multiple life dimensions."
      });
    }

    // Create personalized next steps based on the person's readiness and barriers
    let allNextSteps = [];

    // Add steps based on readiness level
    if (profile.readiness === "Pre-contemplation") {
      allNextSteps.push({
        title: "Begin with reflection",
        description: "Take time to consider what personal growth means to you without pressure to make immediate changes. Notice your thoughts about change with curiosity rather than judgment."
      });
      allNextSteps.push({
        title: "Explore possibilities",
        description: "Experiment with imagining how small changes might feel in your life. Consider talking with someone who has made similar changes to understand their experience."
      });
    } else if (profile.readiness === "Contemplation") {
      allNextSteps.push({
        title: "Start a growth journal",
        description: "Create a dedicated space to explore your thoughts about personal growth. Spend 5-10 minutes daily writing about your hopes, fears, and questions about making changes."
      });
      allNextSteps.push({
        title: "Experiment with a micro-habit",
        description: "Choose one small habit aligned with your priorities that takes less than 5 minutes daily. Try it for a week with permission to adjust or discontinue it after honest evaluation."
      });
    } else if (profile.readiness === "Preparation") {
      allNextSteps.push({
        title: "Create a specific action plan",
        description: "Outline one concrete change you're ready to implement, including when, where, and how you'll do it. Anticipate potential obstacles and plan how you'll respond to them."
      });
      allNextSteps.push({
        title: "Set up your environment",
        description: "Redesign your physical space to support your new habit. Remove friction points that make the change harder and add cues that will remind you of your intention."
      });
    } else if (profile.readiness === "Action") {
      allNextSteps.push({
        title: "Build consistent momentum",
        description: "Establish a regular check-in process to track your progress and refine your approach. Create a simple way to measure success that focuses on consistency rather than perfection."
      });
      allNextSteps.push({
        title: "Celebrate and adjust",
        description: "Acknowledge your progress with meaningful rewards that reinforce your new behaviors. Pay attention to what's working well and what needs adjustment in your approach."
      });
    } else {
      // Default steps if readiness isn't determined
      allNextSteps.push({
        title: "Start with a daily micro-practice",
        description: "Choose one small practice that takes less than 5 minutes but aligns with your growth priorities. Commit to doing it at the same time each day for one week as an experiment."
      });
      allNextSteps.push({
        title: "Create reflection moments",
        description: "Schedule brief weekly check-ins with yourself to notice what's working and what isn't. Use these insights to adjust your approach rather than abandoning your efforts."
      });
    }

    // Add steps based on barriers
    if (profile.barrier === "Fear of failure") {
      allNextSteps.push({
        title: "Reframe setbacks as learning",
        description: "When you encounter difficulties, practice asking 'What can I learn from this?' instead of seeing it as failure. Keep a small journal of these lessons to track your growth mindset development."
      });
      allNextSteps.push({
        title: "Take small, low-risk steps",
        description: "Break your growth goals into such small pieces that success feels almost guaranteed. Each small win will gradually build your confidence for slightly bigger challenges."
      });
    } else if (profile.barrier === "Overwhelm") {
      allNextSteps.push({
        title: "Break goals into micro-steps",
        description: "Take any goal that feels overwhelming and divide it into steps so small they seem almost trivial. Focus on just one micro-step at a time, celebrating each completion."
      });
      allNextSteps.push({
        title: "Practice single-tasking",
        description: "Choose one change to focus on completely before adding anything else. Set clear boundaries around this priority and practice saying 'not right now' to other opportunities."
      });
    } else if (profile.barrier === "Time constraints") {
      allNextSteps.push({
        title: "Find time pockets in your day",
        description: "Identify 3-5 existing transition moments in your day (like waiting for coffee to brew or right after brushing teeth) to anchor small new habits that take 1-3 minutes."
      });
      allNextSteps.push({
        title: "Combine habits with existing routines",
        description: "Attach new practices to things you already do daily. For example, practice gratitude while showering or do brief stretches while waiting for your computer to start up."
      });
    } else if (profile.barrier === "Lack of consistency") {
      allNextSteps.push({
        title: "Create simple habit triggers",
        description: "Set up visual reminders or digital notifications at specific times to prompt your new behaviors. Place these triggers in spots you can't miss during your regular day."
      });
      allNextSteps.push({
        title: "Use a visual habit tracker",
        description: "Create a simple calendar or app-based tracking system where you can mark each day you complete your habit. The growing chain of successes will help motivate continued action."
      });
    } else if (profile.barrier === "Lack of goals") {
      allNextSteps.push({
        title: "Explore your core values",
        description: "Spend time reflecting on when you've felt most alive and fulfilled. Look for patterns in these experiences to identify what truly matters to you beyond external expectations."
      });
      allNextSteps.push({
        title: "Experiment with different activities",
        description: "Try a variety of small experiments in different areas of potential growth. Pay close attention to which ones naturally draw your interest and energy versus feeling forced."
      });
    }

    // Select top 2 next steps - prioritize readiness-based steps first, then barrier-based
    const nextSteps = allNextSteps.slice(0, 2);

    // Add personalized strategies based on module recommendations
    const allPersonalizedStrategies = [];

    // Convert module codes to actionable strategies without using technical terms
    recommendedModules.forEach(module => {
      const code = module.code || module;

      if (code === 'S1') {
        allPersonalizedStrategies.push({
          title: "Mindful breathing practice",
          description: "When you notice stress or tension, pause and take 3-5 deep breaths, focusing completely on the sensation of breathing. Practice extending your exhale slightly longer than your inhale to activate your relaxation response."
        });
        allPersonalizedStrategies.push({
          title: "Mindfulness moments",
          description: "Set 3 random alarms during your day as reminders to pause for 30 seconds. During these brief pauses, simply notice your surroundings, body sensations, and thoughts without judgment."
        });
      } else if (code === 'S2') {
        allPersonalizedStrategies.push({
          title: "Thought reframing practice",
          description: "When you notice negative thoughts, pause and ask: 'Is this absolutely true? What's another way to see this situation? What would I tell a friend thinking this?' Write down alternative perspectives."
        });
        allPersonalizedStrategies.push({
          title: "Emotion-thought tracking",
          description: "Keep a small notebook handy to jot down difficult emotions and the thoughts that accompany them. Look for patterns in your thinking that might be contributing to stress or anxiety."
        });
      } else if (code === 'S3') {
        allPersonalizedStrategies.push({
          title: "Intentional morning routine",
          description: "Design the first 15-30 minutes of your day to set a positive tone. Include elements that nourish you mentally and physically, like a moment of gratitude, water, movement, or reflection."
        });
        allPersonalizedStrategies.push({
          title: "Energy boundaries",
          description: "Identify activities and interactions that consistently drain your energy. Create specific boundaries around these, such as time limits, frequency reduction, or delegating when possible."
        });
      } else if (code === 'P1') {
        allPersonalizedStrategies.push({
          title: "Nutritional upgrading",
          description: "Focus on adding nourishing foods rather than restricting. Each day, add one additional serving of vegetables or fruits to your existing meals in ways you find genuinely enjoyable."
        });
        allPersonalizedStrategies.push({
          title: "Mindful eating practice",
          description: "Choose one meal or snack daily to eat without distractions. Notice the flavors, textures, and your body's hunger and fullness signals. This simple practice improves digestion and satisfaction."
        });
      } else if (code === 'P2') {
        allPersonalizedStrategies.push({
          title: "Joyful movement integration",
          description: "Identify movement that feels good to your body and brings you joy rather than dread. Schedule 10-15 minute sessions 2-3 times weekly, gradually increasing as it becomes a natural part of your routine."
        });
        allPersonalizedStrategies.push({
          title: "Movement microbreaks",
          description: "Set a reminder to stand and move for 1-2 minutes every hour of sitting. Simple stretches, walking, or gentle movement patterns can reduce stiffness and boost energy and focus."
        });
      } else if (code === 'P3') {
        allPersonalizedStrategies.push({
          title: "Sleep sanctuary creation",
          description: "Transform your bedroom into a sleep-promoting environment by addressing temperature, light, and noise. Remove electronic devices or set them to night mode, and create a calming pre-sleep ritual."
        });
        allPersonalizedStrategies.push({
          title: "Sleep rhythm regulation",
          description: "Work toward consistent sleep and wake times that align with your natural body rhythms. Start by setting a regular wake time, even on weekends, to help regulate your body's sleep cycle."
        });
      } else if (code === 'E1') {
        allPersonalizedStrategies.push({
          title: "Daily reflection practice",
          description: "Set aside 5-10 minutes at the same time each day for reflection or journaling. Focus on questions like 'What energized me today? What drained me? What am I learning about myself?'"
        });
        allPersonalizedStrategies.push({
          title: "Emotion naming practice",
          description: "When you notice strong emotions arising, pause to identify and name the specific feeling. This simple act of labeling reduces emotional reactivity and builds self-awareness over time."
        });
      } else if (code === 'E2') {
        allPersonalizedStrategies.push({
          title: "Active listening development",
          description: "Choose one conversation each day to practice focused listening. Put away devices, maintain eye contact, and resist planning your response while the other person is speaking."
        });
        allPersonalizedStrategies.push({
          title: "Authentic expression practice",
          description: "Practice using 'I' statements to express needs or concerns without blame. For example, 'I feel... when... because... What I need is...' This builds clear communication while preserving connection."
        });
      } else if (code === 'E3') {
        allPersonalizedStrategies.push({
          title: "Boundary strengthening",
          description: "Identify one relationship boundary you'd like to strengthen (time, emotional energy, physical space, etc.). Practice articulating this boundary clearly and compassionately, starting with lower-stakes situations."
        });
        allPersonalizedStrategies.push({
          title: "Connection cultivation",
          description: "Schedule regular, uninterrupted time with people who energize and support you. Even brief, quality interactions can significantly impact your wellbeing and resilience during challenging times."
        });
      } else if (code === 'SP1') {
        allPersonalizedStrategies.push({
          title: "Values clarification",
          description: "Reflect on what truly matters to you beyond external expectations. List 3-5 core values and consider how your daily choices either align with or diverge from these guiding principles."
        });
        allPersonalizedStrategies.push({
          title: "Values-action alignment",
          description: "Choose one core value and identify a small, concrete way to express it more fully this week. Notice how it feels when your actions and values are in harmony."
        });
      } else if (code === 'SP2') {
        allPersonalizedStrategies.push({
          title: "Vision development",
          description: "Take 15-20 minutes to imagine your ideal life one year from now. Write or draw this vision in detail, focusing on how you want to feel and what daily life looks like when aligned with your values."
        });
        allPersonalizedStrategies.push({
          title: "Monthly milestone creation",
          description: "Break down your larger vision into small, specific monthly milestones. Focus on progress indicators that are within your control rather than dependent on external validation."
        });
      } else if (code === 'SP3') {
        allPersonalizedStrategies.push({
          title: "Daily gratitude practice",
          description: "Begin or end your day by noting 1-3 things you're genuinely grateful for. Be specific about what exactly you appreciate and how it affects you, rotating through different life areas over time."
        });
        allPersonalizedStrategies.push({
          title: "Natural connection",
          description: "Spend 10-15 minutes in nature or quiet reflection several times weekly. Simply notice your surroundings using all your senses, allowing yourself to be present without needing to accomplish anything."
        });
      }
    });

    // Select the top 2 personalized strategies
    const personalizedStrategies = allPersonalizedStrategies.slice(0, 2);

    // Return the complete personalized plan
    return {
      focusAreas,
      nextSteps,
      personalizedStrategies
    };
  };

  // Generate comprehensive coach report for download
  const downloadCoachReport = () => {
    if (!results) return;

    // Create detailed technical report with all assessment data
    const profile = results.profile;
    const moduleScores = profile.moduleScores || {};

    // Sort module scores from highest to lowest for better insights
    const sortedModuleScores = Object.entries(moduleScores)
      .sort((a, b) => b[1] - a[1])
      .filter(([_, score]) => score > 0);

    // Get prioritized growth areas
    const growthPriorities = Object.entries(profile.growthPriorities || {})
      .filter(([_, value]) => value)
      .map(([area, value]) => {
        const areaLabel =
          area === "health" ? "Health & Well-Being" :
          area === "career" ? "Career & Work" :
          area === "relationships" ? "Relationships" :
          area === "personalDev" ? "Personal Development" :
          area === "finances" ? "Finances & Security" :
          area;
        return { area: areaLabel, value };
      });

    const content = `
=================================================================
            COMPREHENSIVE ASSESSMENT REPORT (COACH VERSION)
=================================================================

-----------------------------------------------------------------
PART 1: PERSONAL PROFILE SUMMARY
-----------------------------------------------------------------

PRIMARY ATTRIBUTES:
• Enneagram Type: ${profile.enneagramType || "Not determined"}
• Mindset: ${profile.mindset1 || "Not determined"}
• Decision-Making Style: ${profile.decisionStyle || "Not determined"}
• Readiness for Change: ${profile.readiness || "Not determined"}

SECONDARY ATTRIBUTES:
• Approach to Challenges: ${profile.mindset2 || "Not determined"}
• Communication Style: ${profile.communicationStyle || profile.emotional1 || "Not determined"}
• Emotional Approach: ${profile.emotional2 || "Not determined"}
• Learning Style: ${profile.learningStyle || "Not determined"}

PRIMARY BARRIER:
• Barrier: ${profile.barrier || "Not determined"}
• Impact Level: ${profile.barrierImpact || "Not determined"}

GROWTH PRIORITIES:
${growthPriorities.length > 0
  ? growthPriorities.map(p => `• ${p.area}: ${p.value}`).join('\n')
  : '• None identified'}

-----------------------------------------------------------------
PART 2: RANKED MODULE RECOMMENDATIONS
-----------------------------------------------------------------

${sortedModuleScores.map(([code, score], index) => {
  const module = results.recommendedModules.find(m => m.code === code || m === code);
  const moduleName = module?.name || code;
  const moduleDesc = module?.description || '';
  return `${index + 1}. ${code}: ${moduleName} (Score: ${score})
   - ${moduleDesc}`;
}).join('\n\n')}

-----------------------------------------------------------------
PART 3: RECOMMENDED MODULE GROUPS
-----------------------------------------------------------------

${results.recommendedGroups.map(group =>
  `• ${group.name}
   - ${group.description}
   - Includes: ${group.modules.join(', ')}`
).join('\n\n')}

-----------------------------------------------------------------
PART 4: COMPLETE MODULE SCORES (HIGHEST TO LOWEST)
-----------------------------------------------------------------

${sortedModuleScores.map(([code, score]) => {
  let category = '';
  let fullName = '';

  if (code.startsWith('S')) {
    category = 'Stress Management & Mindset';
    if (code === 'S1') fullName = 'Mindful Breathing & Relaxation';
    else if (code === 'S2') fullName = 'Emotional Resilience & Reframing';
    else if (code === 'S3') fullName = 'Self-Care & Routine';
  } else if (code.startsWith('P')) {
    category = 'Physical Health & Vitality';
    if (code === 'P1') fullName = 'Nutrition Foundations';
    else if (code === 'P2') fullName = 'Movement & Exercise';
    else if (code === 'P3') fullName = 'Sleep & Recovery';
  } else if (code.startsWith('E')) {
    category = 'Social & Emotional Growth';
    if (code === 'E1') fullName = 'Self-Awareness & Journaling';
    else if (code === 'E2') fullName = 'Communication Skills';
    else if (code === 'E3') fullName = 'Boundaries & Connection';
  } else if (code.startsWith('SP')) {
    category = 'Life Purpose & Spiritual Well-Being';
    if (code === 'SP1') fullName = 'Core Values & Alignment';
    else if (code === 'SP2') fullName = 'Life Vision & Goals';
    else if (code === 'SP3') fullName = 'Mindfulness & Gratitude';
  }

  return `• ${code} (${fullName}): ${score} - ${category}`;
}).join('\n')}

-----------------------------------------------------------------
PART 5: COACHING RECOMMENDATIONS
-----------------------------------------------------------------

Based on this assessment, consider focusing coaching sessions on:

1. ${profile.barrier ? `Addressing their barrier of "${profile.barrier}" through targeted exercises` : 'Exploring potential barriers to growth'}
2. ${profile.readiness ? `Meeting them at their current readiness stage: "${profile.readiness}"` : 'Assessing their readiness for change'}
3. Starting with their highest-scoring module: ${sortedModuleScores[0]?.[0] || 'N/A'}
4. Using their preferred learning style: ${profile.learningStyle || "Varied approaches"}
5. Acknowledging their ${profile.decisionStyle || "unique"} decision-making style in your approach

ADDITIONAL COACHING NOTES:
${profile.enneagramType ? `• As an ${profile.enneagramType} type, they may respond well to ${
  profile.enneagramType === 'Reformer' ? 'structure and improvement-focused approaches' :
  profile.enneagramType === 'Helper' ? 'relationship-centered coaching that acknowledges their contributions' :
  profile.enneagramType === 'Achiever' ? 'achievement-oriented goals with measurable outcomes' :
  profile.enneagramType === 'Individualist' ? 'creative approaches that honor their unique perspective' :
  profile.enneagramType === 'Investigator' ? 'intellectual depth and research-based methods' :
  'approaches that honor their specific motivations'
}.` : '• Consider exploring their core motivations further.'}

${profile.mindset1 ? `• Their ${profile.mindset1} suggests ${profile.mindset1.includes('Fixed') ? 'they may benefit from growth mindset exercises' : 'they already have a foundation for continuous improvement'}.` : ''}

${profile.learningStyle ? `• With their ${profile.learningStyle} learning style, consider ${
  profile.learningStyle === 'Structured' ? 'providing clear frameworks and step-by-step processes' :
  profile.learningStyle === 'Experiential' ? 'incorporating hands-on activities and practical applications' :
  profile.learningStyle === 'Visual' ? 'using diagrams, videos, and visual demonstrations' :
  profile.learningStyle === 'Theoretical' ? 'sharing research and written materials for self-study' :
  profile.learningStyle === 'Social' ? 'incorporating discussion and collaborative learning' :
  'varying your teaching approaches'
}.` : ''}

${profile.communicationStyle ? `• Their ${profile.communicationStyle} communication style suggests ${
  profile.communicationStyle === 'Direct' ? 'you can be straightforward in feedback' :
  profile.communicationStyle === 'Reflective' ? 'they may need time to process before responding' :
  profile.communicationStyle === 'Accommodating' ? 'they may not express disagreement directly' :
  profile.communicationStyle === 'Avoidant' ? 'they may disengage when uncomfortable' :
  'being attentive to their communication patterns'
}.` : ''}

• Consider building a coaching plan that combines elements from their top 2-3 recommended modules.
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Comprehensive-Assessment-Report.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!results || !actionPlan) return <div className="text-center text-white p-6">Loading your personalized results...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-green-400 text-center">Your Personal Growth Plan</h1>

      {/* Focus Areas Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-300">Your Focus Areas</h2>
        <div className="space-y-4">
          {actionPlan.focusAreas.map((focus, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded">
              <h3 className="text-lg font-medium text-yellow-300 mb-2">{focus.area}</h3>
              <p>{focus.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-300">Your Next Steps</h2>
        <div className="space-y-5">
          {actionPlan.nextSteps.map((step, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded">
              <h3 className="flex items-center text-lg font-medium text-yellow-300 mb-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                  {index + 1}
                </span>
                {step.title}
              </h3>
              <p className="ml-9">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Strategies Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-300">Your Personal Growth Strategies</h2>
        <div className="space-y-5">
          {actionPlan.personalizedStrategies.map((strategy, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded">
              <h3 className="flex items-center text-lg font-medium text-yellow-300 mb-2">
                <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                  {index + 1}
                </span>
                {strategy.title}
              </h3>
              <p className="ml-9">{strategy.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
        <button
          onClick={downloadCoachReport}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors shadow-md"
        >
          Download Complete Report
        </button>
        <button
          onClick={() => router.push("/divisions/summit/learninghub/self-assessment")}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors shadow-md"
        >
          Retake Assessment
        </button>
      </div>

      <p className="text-center text-gray-400 mt-6 text-sm">
        Connect with a coach to discuss your results in depth and create a customized growth plan.
      </p>
    </div>
  );
}
