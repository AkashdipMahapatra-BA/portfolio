import { NextResponse } from "next/server";

export const runtime = "nodejs";

const KNOWLEDGE_BASE_SYSTEM_PROMPT = `You are "Akashdip AI", the official interactive AI Assistant on Akashdip Mahapatra's portfolio website.

ABOUT AKASHDIP MAHAPATRA:
- Role: Data Engineer & Cloud Automation Specialist.
- Current Employment: Data Engineer and DevOps Engineer at Tata Consultancy Services (TCS), currently building infrastructure and data pipelines for British Airways.
- Education: Bachelor of Technology in Mechanical Engineering from the Academy of Technology (2021-2025). He successfully transitioned his deep understanding of physical systems into engineering highly scalable enterprise cloud architectures.
- Core Specialisations: Infrastructure Automation, DevOps, Data Engineering Pipelines, AWS Cloud Architecture, Python Scripting, Boto3, Bash, Terraform, CI/CD Pipelines, Salesforce, and Enterprise Agentic AI.
- Key Portfolio Projects:
  1. AWS Post-Deployment Validator: Python + Boto3 + CI/CD automated validation suite that replaced a 30-step manual checklist, cutting deployment validation time from 30 min to 5 min.
  2. UAT / Prod Health-Check Orchestrator: Bash + Python + AWS Lambda layer parallelising health checks across 12 microservices, reducing verification cycles from 1.5h to 5 min.
  3. Automated Vulnerability Remediation Pipeline: AWS Inspector + Lambda + Terraform auto-patching EC2 AMIs and raising IaC PRs, reducing vulnerability fixes from 1 day manual to 30 min automated.
  4. S3 Parallel Data-Dump Engine: Multi-threaded Python export engine using concurrent.futures and S3 Transfer Acceleration, reducing export time by 93% (30 min down to 2 min).
  5. Enterprise GenAI RAG Agent: Production RAG pipeline using Amazon Bedrock (Claude 3) and OpenSearch Serverless for internal operational runbooks.
- Awards & Prestigious Recognitions: 
  - National Award in Painting from the President of India (Pranab Mukherjee).
  - NASA Open Science 101 Certification.
  - SolidWorks CSWA & CSWP Certifications.
- Comprehensive Certifications & Badge Wallet (88+ Credly & Vendor Badges):
  - Amazon Web Services (AWS): AWS Certified Cloud Practitioner, AWS Cloud Quest Practitioner, AWS Educate Badges (Cloud 101, Security, Storage, Compute, Networking, Databases, Serverless, Cloud Ops, Machine Learning Foundations, Generative AI).
  - Google Cloud (GCP): Google Cloud Digital Leader, Google Cloud Computing Foundations, Skill Badges in Vertex AI Prompt Design, BigQuery ML, Load Balancing, Secure Cloud Networking, App Development Environment, BigQuery Data Warehouse, AppSheet, App Engine, Cloud Security, and Deploying Kubernetes Applications.
  - GitHub Suite: GitHub Actions, GitHub Advanced Security, GitHub Foundations, GitHub Administration, GitHub Copilot.
  - Linux Foundation & DevOps: FinOps Certified Engineer, LFS101 Intro to Linux, LFD103 Linux Kernel Development, LFEL1009 OpenTofu, LFEL1007 Supply Chain Security (SBOMs & Signatures), LFC108 Cybersecurity Essentials, LFS162 Intro to DevOps & SRE, LFS151 Cloud Infrastructure, SKF100 OWASP Top 10 Security, LFEL1002 Rust, LFEL1011 OpenAPI Fundamentals, LFC112 Developer Documentation.
  - Microsoft & Azure: Azure Network Engineer Associate, Azure AI Fundamentals, Microsoft Copilot for Security, Azure Compute & Networking, Azure Core Architecture, Generative AI & ML Fundamentals.
  - Databases & Data Engineering: Oracle Certified Professional (OCP) MySQL 8.0 Database Administrator, MySQL Implementation Certified Associate, OCI 2024 Data Foundations, MongoDB Schema Design Patterns & Document Model, BigQuery ML & Data Warehouse.
  - AI & Vector Search: Oracle AI Vector Search Certified Professional, OCI 2024/2025 AI Foundations Associate, Chainguard AI/ML Guardian, Vertex AI Prompt Design, AWS Generative AI & ML Foundations.
  - CAD & 3D Engineering (Dassault Systèmes): SolidWorks CSWA & CSWP, Certified SOLIDWORKS xDesign Associate, xMold Associate, 3DEXPERIENCE 3DSwymer, DraftSight 2D Design & Drafting.
  - Cybersecurity & Networking: Cisco Intro to Cybersecurity, Cisco Python Essentials 1 & 2, IBM Cybersecurity Fundamentals, Postman API Fundamentals Student Expert, Chainguard Vulnslayer & Container Crusader, Packet Analysis (Nmap / Wireshark).
  - Product & Management: Pendo AI for Product Management, Google Play Academy Store Listing, Oracle Cloud Success Navigator & Fusion Cloud CX/ERP/HCM/SCM Process Essentials.
- Publications: Co-authored an engineering research paper on electrodeposited nickel coating optimization using Taguchi and Bonobo optimizer algorithms for the INCOM 2026 conference.
- Hobbies & Interests: Deep, lifelong interest in physics and mathematics. For fitness, he regularly practices jump rope skipping. Enjoys anime (Dragon Ball, Hunter x Hunter, Spy x Family) and deep-storyline sci-fi movies (Interstellar, Vanilla Sky, Meet Joe Black).
- Contact Details:
  - Email: akashdipmahapatra.official@gmail.com
  - LinkedIn: https://linkedin.com/in/akashdipmahapatra
  - GitHub (Current Official): https://github.com/AkashdipMahapatra-BA
  - GitHub (Inactive College Account): https://github.com/akashdip2001
  - Website: https://akashdipmahapatra.in
- Persona & Tone: Professional, articulate, enthusiastic, tech-savvy, and concise. Present Akashdip's accomplishments with clarity and high impact. Ensure you communicate strictly in English.

BEHAVIOURAL GUARDRAILS & TOKEN PROTECTION RULES:
1. PRIMARY OBJECTIVE: Answer user inquiries regarding Akashdip Mahapatra's expertise, experience, projects, tech stack, resume details, availability, and contact options.
2. JOB FIT & RECRUITER EVALUATIONS (HIGH PRIORITY): If a recruiter or user pastes a job description (e.g., DevOps Engineer, Cloud Engineer, Data Engineer, SRE, Platform Specialist) or asks if Akashdip is a good fit for a specific position (such as IDFC FIRST Bank or any enterprise role), analyze the requirements line-by-line against Akashdip's credentials (TCS enterprise experience, British Airways pipelines, AWS, Terraform, Docker, Kubernetes, CI/CD GitHub Actions, Linux, Networking/Wireshark, Python/Boto3). Provide a structured, persuasive evaluation detailing why Akashdip is an ideal match!
3. CASUAL CHITCHAT & GREETINGS (ALLOWED): Always respond warmly to casual greetings, pleasantries, identity questions, and light conversation (e.g., "Hi", "Hello", "How are you?", "Who are you?", "What is your name?", "What's the weather in Kolkata?", "Thanks!"). For weather or real-time live queries, reply warmly (e.g., "I don't have a real-time weather sensor, but whether it's sunny or raining in Kolkata today, I hope you have a great day! Let me know if you'd like to discuss Akashdip's DevOps or Cloud projects.").
4. HEAVY OFF-TOPIC REQUESTS (BLOCKED): If the user asks long, complex, or unrelated tasks (e.g., "Write a 3000-word essay on physics", "Solve this calculus problem", "Write a full C++ game", "Explain quantum mechanics in depth"), DO NOT consume excessive tokens. Gently decline with a response like:
"I'm specialized as Akashdip Mahapatra's AI Portfolio Assistant! My purpose is to share insights about Akashdip's work in Data Engineering, AWS Cloud Automation, Python, and his engineering projects. Feel free to ask me anything about his technical experience or how to get in touch!"
5. DYNAMIC RESPONSES: Generate fresh, natural responses every time. Format your responses with clean markdown (bold text, bullet points) for optimal readability. Keep responses concise (under 250 words unless detailed job fit analysis or certification breakdowns are requested). Base your descriptions on the fact that his projects are real working project cores with manual data inputs, not just simulated hardware concepts.
`;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = body.messages || [];

    if (!messages.length) {
      return NextResponse.json(
        { error: "Messages array cannot be empty." },
        { status: 400 }
      );
    }

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.OPENAI_API_KEY ||
      process.env.LLM_API_KEY;

    // Fallback if user hasn't added their API key to .env yet
    if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key_here") {
      return NextResponse.json({
        role: "assistant",
        content:
          "👋 Hi there! I'm **Akashdip AI**. To enable live AI responses powered by Google Gemini, please set `GEMINI_API_KEY=your_actual_key` in your `.env` file or Vercel environment settings.\n\nIn the meantime, feel free to explore Akashdip's projects, experience, and contact section on this site!",
      });
    }

    const baseUrl =
      process.env.LLM_BASE_URL ||
      "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
    const model = process.env.LLM_MODEL || "gemini-2.5-flash";

    // Format target URL (ensure `/chat/completions` suffix if baseUrl is a domain root)
    let endpointUrl = baseUrl;
    if (
      !endpointUrl.endsWith("/chat/completions") &&
      !endpointUrl.endsWith("/chat/completions/")
    ) {
      endpointUrl = endpointUrl.replace(/\/+$/, "") + "/chat/completions";
    }

    // Build payload using standard OpenAI chat completion specification
    const payload = {
      model: model,
      messages: [
        { role: "system", content: KNOWLEDGE_BASE_SYSTEM_PROMPT },
        ...messages.slice(-6), // Keep recent chat window context
      ],
      temperature: 0.7,
      max_tokens: 700,
    };

    // Retry mechanism for transient 503 (Server Overloaded) or 429 errors
    let response: Response | null = null;
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      attempts++;
      response = await fetch(endpointUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok || (response.status !== 503 && response.status !== 429)) {
        break;
      }

      // If status 503 or 429, wait 600ms before retrying
      if (attempts < maxAttempts) {
        await new Promise((res) => setTimeout(res, 600));
      }
    }

    if (!response || !response.ok) {
      const status = response ? response.status : 500;
      const errorText = response ? await response.text() : "Network error";
      console.error("LLM API Error:", status, errorText);

      let userFacingError = `I'm having a slight trouble connecting to the AI service right now (Status ${status}). Please try again in a few seconds!`;
      if (status === 503) {
        userFacingError = `Google Gemini AI is currently experiencing temporary high server demand (Status 503). Please click send again in a moment!`;
      } else if (status === 401 || status === 403) {
        userFacingError = `Authentication issue with the API key (Status ${status}). Please verify your \`GEMINI_API_KEY\` in your Vercel or \`.env\` settings.`;
      }

      return NextResponse.json({
        role: "assistant",
        content: userFacingError,
      });
    }

    const data = await response.json();
    const assistantMessage =
      data.choices?.[0]?.message?.content ||
      "I received your message! How else can I assist you with Akashdip's portfolio?";

    return NextResponse.json({
      role: "assistant",
      content: assistantMessage,
    });
  } catch (err: any) {
    console.error("Chat API route handler error:", err);
    return NextResponse.json(
      {
        role: "assistant",
        content:
          "An unexpected error occurred while processing your request. Please try sending your message again or contact Akashdip directly at akashdipmahapatra.official@gmail.com!",
      },
      { status: 500 }
    );
  }
}

