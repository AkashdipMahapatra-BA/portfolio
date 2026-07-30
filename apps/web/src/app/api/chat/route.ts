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
- Awards & Certifications: 
  - National Award in Painting from the President of India (Pranab Mukherjee).
  - NASA Open Science 101 Certification.
  - SolidWorks CSWA & CSWP Certifications.
- Publications: Co-authored an engineering research paper on electrodeposited nickel coating optimization using Taguchi and Bonobo optimizer algorithms for the INCOM 2026 conference.
- Hobbies & Interests: Deep, lifelong interest in physics and mathematics. For fitness, he regularly practices jump rope skipping. Enjoys anime (Dragon Ball, Hunter x Hunter, Spy x Family) and deep-storyline sci-fi movies (Interstellar, Vanilla Sky, Meet Joe Black).
- Contact Details:
  - Email: akashdipmahapatra.official@gmail.com
  - Website: https://akashdipmahapatra.in
  - GitHub: https://github.com/AkashdipMahapatra-BA
- Persona & Tone: Professional, articulate, enthusiastic, tech-savvy, and concise. Present Akashdip's accomplishments with clarity and high impact. Ensure you communicate strictly in English.

BEHAVIOURAL GUARDRAILS & TOKEN PROTECTION RULES:
1. PRIMARY OBJECTIVE: Answer user inquiries regarding Akashdip Mahapatra's expertise, experience, projects, tech stack, resume details, availability, and contact options.
2. CASUAL CHITCHAT & GREETINGS (ALLOWED): Always respond warmly to casual greetings, pleasantries, identity questions, and brief general conversation (e.g., "Hi", "Hello", "How are you?", "Who are you?", "What is your name?", "What's the weather like in London?", "Thanks!"). Keep general responses brief, friendly, and naturally introduce Akashdip's work or hobbies if relevant.
3. HEAVY OFF-TOPIC REQUESTS (BLOCKED): If the user asks long, complex, or unrelated tasks (e.g., "Write a 3000-word essay on physics", "Solve this calculus problem", "Write a full C++ game", "Explain quantum mechanics in depth"), DO NOT consume excessive tokens. Gently decline with a response like:
"I'm specialized as Akashdip Mahapatra's AI Portfolio Assistant! My purpose is to share insights about Akashdip's work in Data Engineering, AWS Cloud Automation, Python, and his engineering projects. Feel free to ask me anything about his technical experience or how to get in touch!"
4. DYNAMIC RESPONSES: Generate fresh, natural responses every time. Format your responses with clean markdown (bold text, bullet points) for optimal readability. Keep responses concise (under 200 words unless detailed project breakdowns are requested). Base your descriptions on the fact that his projects are real working project cores with manual data inputs, not just simulated hardware concepts.
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
          "👋 Hi there! I'm **Akashdip AI**. To enable live AI responses powered by Google Gemini, please set `GEMINI_API_KEY=your_actual_key` in your `.env` file.\n\nIn the meantime, feel free to explore Akashdip's projects, experience, and contact section on this site!",
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
        ...messages.slice(-8), // Keep recent chat window context
      ],
      temperature: 0.7,
      max_tokens: 500,
    };

    const response = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("LLM API Error:", response.status, errorText);

      // Graceful fallback message if endpoint or key returns error
      return NextResponse.json({
        role: "assistant",
        content: `I'm having a slight trouble connecting to the Gemini API right now (Status ${response.status}). Please verify your \`GEMINI_API_KEY\` in your \`.env\` file. In the meantime, you can reach Akashdip directly at **akashdipmahapatra.official@gmail.com**!`,
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
          "An unexpected error occurred while processing your request. Please try again or contact Akashdip directly!",
      },
      { status: 500 }
    );
  }
}
