// AI Service for SkillGuard
// Integrated with Google AI Studio and Gemini API

import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const USE_MOCK_AI = import.meta.env.VITE_USE_MOCK_AI === 'true' || !GEMINI_API_KEY;
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-pro';

// Initialize Gemini AI client
let genAI = null;
if (GEMINI_API_KEY && !USE_MOCK_AI) {
  try {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  } catch (error) {
    console.error('Failed to initialize Gemini AI:', error);
  }
}

// Mock AI responses for development/demo
const mockAIResponses = {
  analyzeSkills: (role, skills, experience) => {
    const skillCount = skills.length;
    const hasModernSkills = skills.some(s => 
      s.toLowerCase().includes('smart') || 
      s.toLowerCase().includes('ev') || 
      s.toLowerCase().includes('automation')
    );
    
    return {
      insights: [
        `Based on your ${role} role and ${skillCount} selected skills, I've analyzed your professional profile.`,
        hasModernSkills 
          ? "You have some modern skills that are in high demand. This is great for your career longevity."
          : "Consider adding more technology-focused skills to future-proof your career.",
        experience === "6+" 
          ? "Your extensive experience is valuable, but staying current with new technologies is crucial."
          : "Your experience level suggests you're still building your foundation. Focus on both traditional and emerging skills."
      ],
      riskFactors: [
        "Automation is increasing in routine tasks",
        "Technology adoption is accelerating in your field",
        "Customer expectations are evolving"
      ],
      opportunities: [
        "Upskilling in emerging technologies",
        "Specializing in high-demand areas",
        "Building a diverse skill portfolio"
      ]
    };
  },
  
  generateRecommendations: (role, skills, riskLevel) => {
    const recommendations = [];
    
    if (role === 'Electrician') {
      if (riskLevel >= 70) {
        recommendations.push({
          title: "Solar Panel Installation",
          reasoning: "Critical skill as renewable energy adoption accelerates. High demand, good ROI.",
          urgency: "High"
        });
      }
      recommendations.push({
        title: "Smart Home Integration",
        reasoning: "Growing market with increasing homeowner adoption. Complements your electrical expertise.",
        urgency: riskLevel >= 70 ? "High" : "Medium"
      });
    } else if (role === 'Mechanic') {
      recommendations.push({
        title: "EV Maintenance & Repair",
        reasoning: "Electric vehicles are the future. Early adoption of this skill will be highly valuable.",
        urgency: "High"
      });
    } else if (role === 'Technician') {
      recommendations.push({
        title: "AI-Assisted Diagnostics",
        reasoning: "Understanding AI tools will enhance your troubleshooting capabilities significantly.",
        urgency: "High"
      });
    }
    
    return recommendations;
  },
  
  chatResponse: (message, context, conversationHistory = []) => {
    const lowerMessage = message.toLowerCase().trim();
    const role = context.role || '';
    const skills = context.skills || [];
    const skillList = skills.length > 0 ? skills.join(', ') : 'not specified';
    
    // Analyze the message more intelligently
    const isQuestion = lowerMessage.includes('?') || 
                      lowerMessage.startsWith('what') || 
                      lowerMessage.startsWith('how') || 
                      lowerMessage.startsWith('why') || 
                      lowerMessage.startsWith('when') || 
                      lowerMessage.startsWith('where') ||
                      lowerMessage.startsWith('can') ||
                      lowerMessage.startsWith('should') ||
                      lowerMessage.startsWith('will');
    
    // Check for specific topics
    const hasRisk = lowerMessage.includes('risk') || lowerMessage.includes('automation') || lowerMessage.includes('automated');
    const hasLearn = lowerMessage.includes('learn') || lowerMessage.includes('study') || lowerMessage.includes('training') || lowerMessage.includes('course');
    const hasSkill = lowerMessage.includes('skill') && !hasLearn;
    const hasCareer = lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('future') || lowerMessage.includes('outlook');
    const hasSalary = lowerMessage.includes('salary') || lowerMessage.includes('pay') || lowerMessage.includes('income') || lowerMessage.includes('earn');
    const hasTime = lowerMessage.includes('time') || lowerMessage.includes('long') || lowerMessage.includes('duration') || lowerMessage.includes('months') || lowerMessage.includes('years');
    const hasRecommend = lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('advice') || lowerMessage.includes('should i');
    
    // Generate contextual responses
    if (hasRisk) {
      const riskResponse = role 
        ? `As a ${role}, automation risk depends on your specific skills. ${skillList !== 'not specified' ? `With your skills in ${skillList}, ` : ''}you're in a field where some tasks are being automated, but there's still strong demand for skilled professionals who can work with new technologies.`
        : "Automation risk varies significantly by role and skills. Skills involving creativity, problem-solving, and human interaction are less likely to be automated. Focus on learning skills that require human judgment and adaptability.";
      
      return {
        text: riskResponse + " Would you like to know more about specific skills that reduce automation risk?",
        suggestions: ["What skills are safest?", "How can I reduce my risk?", "What should I learn next?"]
      };
    }
    
    if (hasLearn || hasRecommend) {
      let learnResponse = "I recommend focusing on skills that combine your existing expertise with emerging technologies.";
      
      if (role === 'Electrician') {
        learnResponse = "For electricians, I'd suggest learning smart home systems, solar panel installation, or EV charging station setup. These skills leverage your electrical knowledge while adding modern, in-demand capabilities.";
      } else if (role === 'Mechanic') {
        learnResponse = "For mechanics, EV maintenance and repair, hybrid vehicle systems, and advanced diagnostic tools are excellent choices. These skills are in high demand as the automotive industry evolves.";
      } else if (role === 'Technician') {
        learnResponse = "For technicians, consider AI-assisted diagnostics, IoT integration, or industrial automation. These skills will keep you at the forefront of technology.";
      }
      
      return {
        text: learnResponse + (hasTime ? " Most of these skills can be learned in 3-6 months with dedicated study." : ""),
        suggestions: ["Show me learning paths", "What's the best way to learn?", "How long will it take?"]
      };
    }
    
    if (hasSkill) {
      const skillResponse = skillList !== 'not specified'
        ? `Your current skills include ${skillList}. These are a good foundation. To stay competitive, consider adding complementary skills that are in high demand.`
        : "Skills are the foundation of your career. Focus on building a diverse skill set that combines traditional expertise with emerging technologies.";
      
      return {
        text: skillResponse,
        suggestions: ["What skills should I add?", "Which skills are in demand?", "How do I improve my skills?"]
      };
    }
    
    if (hasCareer || hasSalary) {
      const careerResponse = role
        ? `As a ${role}, the career outlook is generally positive, especially if you stay current with new technologies. ${hasSalary ? 'Salaries vary by location and experience, but skilled professionals with modern skills typically earn more.' : 'The key is continuous learning and adaptation.'}`
        : "Career success depends on staying relevant. Focus on skills that are in demand and less likely to be automated.";
      
      return {
        text: careerResponse,
        suggestions: ["What industries are growing?", "How do I stay relevant?", "What's the job market like?"]
      };
    }
    
    if (hasTime) {
      return {
        text: "Learning timelines vary by skill complexity and your background. Basic skills might take 2-3 months, while more advanced skills could take 6-12 months. The key is consistent practice and hands-on experience.",
        suggestions: ["What's the fastest way to learn?", "How do I stay motivated?", "What resources should I use?"]
      };
    }
    
    // Handle greetings and general questions
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return {
        text: `Hello! I'm here to help you with your career development. ${role ? `I see you're a ${role}.` : ''} What would you like to know about your skills, career, or learning opportunities?`,
        suggestions: ["Tell me about my risk level", "What should I learn?", "How does automation affect me?"]
      };
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('what can')) {
      return {
        text: "I can help you with: understanding automation risk, finding learning paths, career advice, skill recommendations, and answering questions about your profession. What would you like to explore?",
        suggestions: ["What skills should I learn?", "How does automation affect me?", "What's my career outlook?"]
      };
    }
    
    // Default response - try to be helpful based on context
    if (isQuestion) {
      return {
        text: `That's a great question! ${role ? `As a ${role}, ` : ''}I'd be happy to help. Could you provide a bit more detail about what specifically you'd like to know? This will help me give you a more targeted answer.`,
        suggestions: ["What skills should I learn?", "How does automation affect me?", "Tell me about my career"]
      };
    }
    
    // Generic helpful response
    return {
      text: `I understand you're asking about "${message}". ${role ? `As a ${role}, ` : ''}I can help you with career development, skill recommendations, and understanding automation risk. What specific aspect would you like to explore?`,
      suggestions: ["Tell me about my risk level", "What should I learn?", "How does automation affect me?"]
    };
  }
};

// Real AI API call using Google Gemini API
async function callGeminiAPI(prompt, systemInstruction = null, conversationHistory = []) {
  if (!genAI) {
    throw new Error('Gemini AI not initialized');
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: GEMINI_MODEL,
      systemInstruction: systemInstruction || 'You are a helpful AI assistant.'
    });

    // Build conversation history for Gemini
    // Gemini uses a different format - we need to build the chat history
    const history = conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content || msg.text }]
    }));

    const chat = model.startChat({
      history: history,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

// Helper function to call Gemini with a simple prompt (no chat history)
async function callGeminiSimple(prompt, systemInstruction = null) {
  if (!genAI) {
    throw new Error('Gemini AI not initialized');
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: GEMINI_MODEL,
      systemInstruction: systemInstruction || 'You are a helpful AI assistant.'
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

// AI Service Functions
export const aiService = {
  // Analyze user's skills and provide AI insights
  async analyzeSkills(role, skills, experience) {
    if (USE_MOCK_AI) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockAIResponses.analyzeSkills(role, skills, experience);
    }
    
    const prompt = `Analyze the career profile of a ${role} with ${skills.length} skills: ${skills.join(', ')}. Experience level: ${experience} years. Provide insights about automation risk, career opportunities, and skill gaps. Return ONLY valid JSON with insights (array of strings), riskFactors (array of strings), and opportunities (array of strings). Do not include any markdown formatting or code blocks.`;
    
    try {
      const systemInstruction = 'You are a career advisor specializing in skill risk assessment and automation impact. Always respond with valid JSON only.';
      const response = await callGeminiSimple(prompt, systemInstruction);
      
      // Try to parse JSON, handling potential markdown code blocks
      let jsonResponse = response.trim();
      if (jsonResponse.startsWith('```')) {
        jsonResponse = jsonResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      }
      
      return JSON.parse(jsonResponse);
    } catch (error) {
      console.error('Error analyzing skills:', error);
      // Fallback to mock if API fails
      return mockAIResponses.analyzeSkills(role, skills, experience);
    }
  },
  
  // Generate AI-powered recommendations
  async generateRecommendations(role, skills, riskLevel) {
    if (USE_MOCK_AI) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockAIResponses.generateRecommendations(role, skills, riskLevel);
    }
    
    const prompt = `Generate 3-4 skill recommendations for a ${role} with risk level ${riskLevel}. Current skills: ${skills.join(', ')}. Focus on future-proof skills that reduce automation risk. Return ONLY a valid JSON array with objects containing title (string), reasoning (string), and urgency (string: "High", "Medium", or "Low"). Do not include any markdown formatting or code blocks.`;
    
    try {
      const systemInstruction = 'You are a career development expert providing skill recommendations. Always respond with valid JSON only.';
      const response = await callGeminiSimple(prompt, systemInstruction);
      
      // Try to parse JSON, handling potential markdown code blocks
      let jsonResponse = response.trim();
      if (jsonResponse.startsWith('```')) {
        jsonResponse = jsonResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      }
      
      return JSON.parse(jsonResponse);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return mockAIResponses.generateRecommendations(role, skills, riskLevel);
    }
  },
  
  // Chat with AI assistant
  async chat(message, context = {}, conversationHistory = []) {
    if (USE_MOCK_AI) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockAIResponses.chatResponse(message, context, conversationHistory);
    }
    
    const systemInstruction = `You are a helpful career advisor for SkillGuard, an app that helps workers understand their automation risk. The user is a ${context.role || 'professional'} with skills: ${context.skills?.join(', ') || 'not specified'}. Provide helpful, encouraging advice. Be conversational and respond directly to what the user is asking.`;
    
    // Build conversation history for Gemini (last 5 messages for context)
    const recentHistory = conversationHistory.slice(-5).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      content: msg.text || msg.content
    }));
    
    try {
      const response = await callGeminiAPI(message, systemInstruction, recentHistory);
      
      // Extract suggestions from response if any
      const suggestions = [];
      if (response.includes('?')) {
        // Try to extract questions as suggestions
        const questionMatches = response.match(/[^.!?]*\?/g);
        if (questionMatches && questionMatches.length > 0) {
          suggestions.push(...questionMatches.slice(0, 3).map(q => q.trim()));
        }
      }
      
      return {
        text: response,
        suggestions: suggestions.length > 0 ? suggestions : []
      };
    } catch (error) {
      console.error('Error in chat:', error);
      return mockAIResponses.chatResponse(message, context, conversationHistory);
    }
  },
  
  // Generate learning path details
  async generateLearningPath(skillTitle, role) {
    if (USE_MOCK_AI) {
      await new Promise(resolve => setTimeout(resolve, 600));
      return {
        steps: [
          "Research and understand the fundamentals",
          "Take online courses or certifications",
          "Practice with hands-on projects",
          "Join professional communities",
          "Build a portfolio of work"
        ],
        resources: [
          "Online courses (Coursera, Udemy)",
          "Industry certifications",
          "Professional forums and communities",
          "Mentorship opportunities"
        ],
        timeline: "3-6 months for basic proficiency"
      };
    }
    
    const prompt = `Create a detailed learning path for ${skillTitle} for a ${role}. Include steps, resources, and timeline. Return ONLY valid JSON with steps (array of strings), resources (array of strings), and timeline (string). Do not include any markdown formatting or code blocks.`;
    
    try {
      const systemInstruction = 'You are an educational expert creating learning paths. Always respond with valid JSON only.';
      const response = await callGeminiSimple(prompt, systemInstruction);
      
      // Try to parse JSON, handling potential markdown code blocks
      let jsonResponse = response.trim();
      if (jsonResponse.startsWith('```')) {
        jsonResponse = jsonResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      }
      
      return JSON.parse(jsonResponse);
    } catch (error) {
      console.error('Error generating learning path:', error);
      return {
        steps: ["Research fundamentals", "Take courses", "Practice", "Build portfolio"],
        resources: ["Online courses", "Certifications", "Communities"],
        timeline: "3-6 months"
      };
    }
  }
};

export default aiService;

