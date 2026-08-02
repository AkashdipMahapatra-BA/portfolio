import neo4j from "neo4j-driver";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables from .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const uri = process.env.NEO4J_URI;
const user = process.env.NEO4J_USERNAME;
const password = process.env.NEO4J_PASSWORD;

if (!uri || !user || !password || uri.includes("<YOUR_")) {
  console.error("❌ Missing or placeholder Neo4j environment variables in .env");
  console.error("Please set valid NEO4J_URI, NEO4J_USERNAME, and NEO4J_PASSWORD before seeding.");
  process.exit(1);
}

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

const SEED_CYPHER = `
// 1. Create Candidate Node
MERGE (c:Candidate {email: 'akashdipmahapatra.official@gmail.com'})
SET c.name = 'Akashdip Mahapatra',
    c.role = 'Data Engineer & Cloud Automation Specialist',
    c.company = 'Tata Consultancy Services (TCS)',
    c.client = 'Global Aviation Giant',
    c.degree = 'Bachelor of Technology in Mechanical Engineering',
    c.college = 'Academy of Technology',
    c.graduation = '2021-2025',
    c.website = 'https://akashdipmahapatra.in',
    c.linkedin = 'https://linkedin.com/in/akashdipmahapatra',
    c.github_official = 'https://github.com/AkashdipMahapatra-BA',
    c.github_college = 'https://github.com/akashdip2001'

// 2. Create Portfolio Projects & Link to Candidate
MERGE (p1:Project {id: 'p1'})
SET p1.name = 'AWS Post-Deployment Validator',
    p1.tech = 'Python, Boto3, AWS, CI/CD',
    p1.summary = 'Automated validation suite replacing a 30-step manual checklist, cutting verification from 30 min to 5 min.'

MERGE (p2:Project {id: 'p2'})
SET p2.name = 'UAT / Prod Health-Check Orchestrator',
    p2.tech = 'Bash, Python, AWS Lambda, Observability',
    p2.summary = 'Parallelised health check orchestration layer across 12 microservices, reducing cycle time from 1.5h to 5 min.'

MERGE (p3:Project {id: 'p3'})
SET p3.name = 'Automated Vulnerability Remediation Pipeline',
    p3.tech = 'AWS Inspector, Lambda, Terraform, Security',
    p3.summary = 'Auto-patches EC2 AMIs and raises IaC PRs, reducing vulnerability fixes from 1 day manual to 30 min automated.'

MERGE (p4:Project {id: 'p4'})
SET p4.name = 'S3 Parallel Data-Dump Engine',
    p4.tech = 'Python, S3, Concurrency, Data Engineering',
    p4.summary = 'Multi-threaded S3 export engine using concurrent.futures and S3 Transfer Acceleration, reducing export time by 93%.'

MERGE (p5:Project {id: 'p5'})
SET p5.name = 'Enterprise GenAI RAG Agent',
    p5.tech = 'Amazon Bedrock, RAG, OpenSearch Serverless',
    p5.summary = 'Production Retrieval-Augmented Generation pipeline querying internal operational runbooks.'

MERGE (p6:Project {id: 'p6'})
SET p6.name = 'Interactive 3D V6 Engine Viewer',
    p6.tech = 'Three.js, WebGL, GLTFLoader, OrbitControls, Shaders',
    p6.summary = 'Interactive WebGL 3D engine viewer featured on portfolio, bridging Mechanical CAD with 3D web rendering.'

MERGE (c)-[:BUILT]->(p1)
MERGE (c)-[:BUILT]->(p2)
MERGE (c)-[:BUILT]->(p3)
MERGE (c)-[:BUILT]->(p4)
MERGE (c)-[:BUILT]->(p5)
MERGE (c)-[:BUILT]->(p6)

// 3. Create Core Skills & Categories
UNWIND [
  {name: 'AWS', category: 'Cloud'},
  {name: 'Python', category: 'Languages'},
  {name: 'Terraform', category: 'DevOps'},
  {name: 'Docker', category: 'DevOps'},
  {name: 'Kubernetes', category: 'DevOps'},
  {name: 'Linux', category: 'OS & SysAdmin'},
  {name: 'Networking', category: 'Security & Infra'},
  {name: 'Wireshark', category: 'Packet Analysis'},
  {name: 'Boto3', category: 'AWS Automation'},
  {name: 'Bash', category: 'Scripting'},
  {name: 'SolidWorks', category: 'CAD & 3D'},
  {name: 'Three.js', category: '3D WebGL'},
  {name: 'WebGL', category: '3D WebGL'},
  {name: 'MySQL', category: 'Database'},
  {name: 'BigQuery', category: 'Data Warehouse'},
  {name: 'OpenTofu', category: 'IaC'},
  {name: 'Salesforce', category: 'Enterprise Systems'},
  {name: 'CI/CD Pipelines', category: 'DevOps'},
  {name: 'Data Engineering Pipelines', category: 'Data Engineering'},
  {name: 'Infrastructure Automation', category: 'DevOps'},
  {name: 'Enterprise Agentic AI', category: 'AI & Automation'}
] AS sData
MERGE (s:Skill {name: sData.name})
SET s.category = sData.category
MERGE (c)-[:HAS_SKILL]->(s)

// Bridge Mechanical SolidWorks to WebGL Engine
WITH c
MATCH (s:Skill {name: 'SolidWorks'}), (p:Project {id: 'p6'})
MERGE (s)-[:BRIDGED_TO]->(p)

// 3b. Create Hobbies & Personal Interests Nodes
UNWIND [
  {name: 'Physics & Mathematics', category: 'Academics & Science', details: 'Deep, lifelong interest in theoretical physics and mathematical analysis'},
  {name: 'Jump Rope Skipping', category: 'Fitness', details: 'Regular daily physical fitness and jump rope routines'},
  {name: 'Anime', category: 'Entertainment & Culture', favorites: 'Dragon Ball, Hunter x Hunter, Spy x Family'},
  {name: 'Sci-Fi & Deep-Storyline Movies', category: 'Entertainment', favorites: 'Interstellar, Vanilla Sky, Meet Joe Black'}
] AS hData
MERGE (h:Hobby {name: hData.name})
SET h.category = hData.category,
    h.details = hData.details,
    h.favorites = hData.favorites
MERGE (c)-[:ENJOYS]->(h)

// 4. Create Granular Certification & Badge Nodes (88+ Credly & Vendor Badges)
UNWIND [
  // AWS Badges
  {name: 'AWS Certified Cloud Practitioner', vendor: 'Amazon Web Services (AWS)', category: 'Cloud'},
  {name: 'AWS Cloud Quest: Cloud Practitioner', vendor: 'Amazon Web Services (AWS)', category: 'Cloud'},
  {name: 'AWS Educate: Cloud 101', vendor: 'Amazon Web Services (AWS)', category: 'Cloud'},
  {name: 'AWS Educate: Cloud Security', vendor: 'Amazon Web Services (AWS)', category: 'Security'},
  {name: 'AWS Educate: Cloud Compute', vendor: 'Amazon Web Services (AWS)', category: 'Cloud'},
  {name: 'AWS Educate: Cloud Storage', vendor: 'Amazon Web Services (AWS)', category: 'Cloud'},
  {name: 'AWS Educate: Cloud Networking', vendor: 'Amazon Web Services (AWS)', category: 'Networking'},
  {name: 'AWS Educate: Serverless Architecture', vendor: 'Amazon Web Services (AWS)', category: 'Cloud'},
  {name: 'AWS Educate: Machine Learning Foundations', vendor: 'Amazon Web Services (AWS)', category: 'AI/ML'},
  {name: 'AWS Educate: Generative AI', vendor: 'Amazon Web Services (AWS)', category: 'AI/ML'},

  // GCP Badges
  {name: 'Google Cloud Digital Leader Certification', vendor: 'Google Cloud (GCP)', category: 'Cloud'},
  {name: 'Google Cloud Computing Foundations', vendor: 'Google Cloud (GCP)', category: 'Cloud'},
  {name: 'Vertex AI Prompt Design Skill Badge', vendor: 'Google Cloud (GCP)', category: 'AI/ML'},
  {name: 'BigQuery ML Skill Badge', vendor: 'Google Cloud (GCP)', category: 'Data & AI'},
  {name: 'BigQuery Data Warehouse Skill Badge', vendor: 'Google Cloud (GCP)', category: 'Data'},
  {name: 'Secure Cloud Networking Skill Badge', vendor: 'Google Cloud (GCP)', category: 'Networking'},
  {name: 'Load Balancing & Networking Skill Badge', vendor: 'Google Cloud (GCP)', category: 'Networking'},
  {name: 'App Development Environment Skill Badge', vendor: 'Google Cloud (GCP)', category: 'AppDev'},
  {name: 'AppSheet & App Engine Skill Badge', vendor: 'Google Cloud (GCP)', category: 'AppDev'},
  {name: 'Cloud Security Skill Badge', vendor: 'Google Cloud (GCP)', category: 'Security'},
  {name: 'Deploying Kubernetes Applications Skill Badge', vendor: 'Google Cloud (GCP)', category: 'DevOps'},
  {name: 'Akamai Cloud Computing Foundations Certification', vendor: 'Akamai', category: 'Cloud'},

  // GitHub Badges
  {name: 'GitHub Actions Certification', vendor: 'GitHub', category: 'DevOps & CI/CD'},
  {name: 'GitHub Advanced Security Certification', vendor: 'GitHub', category: 'Security'},
  {name: 'GitHub Foundations Certification', vendor: 'GitHub', category: 'DevOps'},
  {name: 'GitHub Administration Certification', vendor: 'GitHub', category: 'DevOps'},
  {name: 'GitHub Copilot Certification', vendor: 'GitHub', category: 'AI Tools'},

  // Linux & DevOps
  {name: 'LFS101: Introduction to Linux', vendor: 'The Linux Foundation', category: 'OS'},
  {name: 'FinOps Certified Engineer', vendor: 'The Linux Foundation', category: 'Cloud FinOps'},
  {name: 'LFD103: Linux Kernel Development', vendor: 'The Linux Foundation', category: 'OS Kernel'},
  {name: 'LFEL1009: OpenTofu Fundamentals', vendor: 'The Linux Foundation', category: 'IaC'},
  {name: 'LFEL1007: Supply Chain Security (SBOMs)', vendor: 'The Linux Foundation', category: 'Security'},
  {name: 'LFC108: Cybersecurity Essentials', vendor: 'The Linux Foundation', category: 'Security'},
  {name: 'LFS162: Intro to DevOps & SRE', vendor: 'The Linux Foundation', category: 'DevOps'},
  {name: 'LFS151: Cloud Infrastructure', vendor: 'The Linux Foundation', category: 'Cloud'},
  {name: 'LFEL1011: OpenAPI Fundamentals', vendor: 'The Linux Foundation', category: 'APIs'},
  {name: 'LFC112: Developer Documentation', vendor: 'The Linux Foundation', category: 'Docs'},
  {name: 'SKF100: OWASP Top 10 Security', vendor: 'The Linux Foundation', category: 'Security'},
  {name: 'LFEL1002: Rust Programming', vendor: 'The Linux Foundation', category: 'Languages'},

  // Azure & Microsoft
  {name: 'Azure Network Engineer Associate', vendor: 'Microsoft Azure', category: 'Networking'},
  {name: 'Azure AI Fundamentals', vendor: 'Microsoft Azure', category: 'AI/ML'},
  {name: 'Microsoft Copilot for Security', vendor: 'Microsoft Azure', category: 'Security'},
  {name: 'Azure Compute & Networking', vendor: 'Microsoft Azure', category: 'Networking'},
  {name: 'Azure Core Architecture', vendor: 'Microsoft Azure', category: 'Cloud'},
  {name: 'Generative AI & ML Fundamentals (Azure)', vendor: 'Microsoft Azure', category: 'AI/ML'},

  // Databases & Oracle
  {name: 'Oracle Certified Professional (OCP) MySQL 8.0 DBA', vendor: 'Oracle', category: 'Database'},
  {name: 'MySQL Implementation Certified Associate', vendor: 'Oracle', category: 'Database'},
  {name: 'Oracle AI Vector Search Certified Professional', vendor: 'Oracle', category: 'AI & Vectors'},
  {name: 'OCI 2024/2025 AI Foundations Associate', vendor: 'Oracle', category: 'AI/ML'},
  {name: 'MongoDB Schema Design Patterns & Document Model', vendor: 'MongoDB', category: 'Database'},

  // CAD & 3D Engineering
  {name: 'SolidWorks CSWA (Certified SOLIDWORKS Associate)', vendor: 'Dassault Systèmes', category: 'CAD'},
  {name: 'SolidWorks CSWP (Certified SOLIDWORKS Professional)', vendor: 'Dassault Systèmes', category: 'CAD'},
  {name: 'Certified SOLIDWORKS xDesign Associate', vendor: 'Dassault Systèmes', category: 'CAD'},
  {name: 'Certified SOLIDWORKS xMold Associate', vendor: 'Dassault Systèmes', category: 'CAD'},
  {name: '3DEXPERIENCE 3DSwymer', vendor: 'Dassault Systèmes', category: 'CAD'},
  {name: 'DraftSight 2D Design & Drafting', vendor: 'Dassault Systèmes', category: 'CAD'},

  // Security, IoT & Networking
  {name: 'Cisco Intro to Cybersecurity', vendor: 'Cisco', category: 'Security'},
  {name: 'Cisco Python Essentials 1 & 2', vendor: 'Cisco', category: 'Languages'},
  {name: 'IBM Cybersecurity Fundamentals', vendor: 'IBM', category: 'Security'},
  {name: 'Postman API Fundamentals Student Expert', vendor: 'Postman', category: 'APIs'},
  {name: 'Pendo AI for Product Management', vendor: 'Pendo', category: 'Product AI'},
  {name: 'Chainguard AI/ML Guardian', vendor: 'Chainguard', category: 'Security & AI'},
  {name: 'Chainguard Vulnslayer & Container Crusader', vendor: 'Chainguard', category: 'Security'},
  {name: 'Packet Analysis (Nmap / Wireshark Specialist)', vendor: 'Networking', category: 'Security'},
  {name: 'Google Play Academy Store Listing', vendor: 'Google Play Academy', category: 'Mobile & Product'},
  {name: 'Oracle Cloud Success Navigator', vendor: 'Oracle', category: 'Cloud Process'},
  {name: 'Oracle Fusion Cloud CX/ERP/HCM/SCM Process Essentials', vendor: 'Oracle', category: 'Enterprise Cloud'}
] AS certData
MERGE (cert:Certification {name: certData.name})
SET cert.vendor = certData.vendor,
    cert.category = certData.category
MERGE (c)-[:EARNED]->(cert)

// 5. Create Individual YouTube Playlists Nodes
UNWIND [
  {title: 'SOLIDWORKS Assembly & Motion Studies Playlist', category: 'CAD & 3D', url: 'https://www.youtube.com/playlist?list=PL_RecMEcs_p__J3GSHkKfLjC08q0NmWtR'},
  {title: 'Sheet-Metal Designs SOLIDWORKS Playlist', category: 'CAD & 3D', url: 'https://www.youtube.com/playlist?list=PL_RecMEcs_p-Ix6heCxLixbhMCrOd5A0D'},
  {title: 'SOLIDWORKS Weldments Tutorials Playlist', category: 'CAD & 3D', url: 'https://www.youtube.com/playlist?list=PL_RecMEcs_p90o-aY6pJXUS7FnzC2sVrk'},
  {title: 'Autodesk Fusion 360 Modeling Playlist', category: 'CAD & 3D', url: 'https://www.youtube.com/playlist?list=PL_RecMEcs_p_QqfrmJQxoYgOvChYfCtVP'},
  {title: 'AutoCAD 2D Drafting Playlist (56 Videos)', category: 'CAD & 2D', url: 'https://www.youtube.com/playlist?list=PL_RecMEcs_p9D9Mw3hr-uLOXioiFdPDGd'},
  {title: 'AutoCAD 3D Modeling Playlist (45 Videos)', category: 'CAD & 3D', url: 'https://www.youtube.com/playlist?list=PL_RecMEcs_p9NEuljRr7hNsFiPASnJYQt'},
  {title: 'Homemade Engineering & IoT Projects Playlist', category: 'IoT & Hardware', url: 'https://www.youtube.com/playlist?list=PL_RecMEcs_p-5UwLqFBFtat90L8IOc1bZ'},
  {title: 'AWS & Cloud Automation Playlist', category: 'Cloud & DevOps', url: 'https://www.youtube.com/playlist?list=PL_RecMEcs_p_TuIPqY1zVYeGoL5RriWhk'},
  {title: 'Linux vs Windows Setup & Admin Playlist (30 Videos)', category: 'OS & Admin', url: 'https://www.youtube.com/playlist?list=PL_RecMEcs_p8fyKuAxt8r-m-BCHGc9Wam'}
] AS plData
MERGE (pl:Playlist {url: plData.url})
SET pl.title = plData.title,
    pl.category = plData.category
MERGE (c)-[:PUBLISHED_PLAYLIST]->(pl)

// 6. Create Individual Video & Award Nodes
MERGE (v1:Video {url: 'https://youtu.be/ysBF9EfvWkk?t=424'})
SET v1.title = 'Official President of India Award Ceremony (Timestamp 7:04)',
    v1.presenter = 'President Pranab Mukherjee',
    v1.year = 2012,
    v1.type = 'National Award Video'

MERGE (v2:Video {url: 'https://youtu.be/IkcPfEoTvcs'})
SET v2.title = 'National Award Ceremony Highlight Cut Video',
    v2.presenter = 'President Pranab Mukherjee',
    v2.year = 2012,
    v2.type = 'National Award Highlight'

MERGE (v3:Video {url: 'https://www.youtube.com/watch?v=Ws0geTeoN2M'})
SET v3.title = 'My First Online Live Watercolor Painting Video',
    v3.artist = 'Akashdip Mahapatra',
    v3.type = 'Art & Painting'

MERGE (c)-[:PUBLISHED_VIDEO]->(v1)
MERGE (c)-[:PUBLISHED_VIDEO]->(v2)
MERGE (c)-[:PUBLISHED_VIDEO]->(v3)

// Link Videos to Award
MERGE (a1:Award {title: 'National Award in Painting'})
SET a1.presenter = 'President Pranab Mukherjee',
    a1.year = 2012,
    a1.event = 'National Energy Conservation Day'
MERGE (c)-[:WON]->(a1)
MERGE (a1)-[:HAS_VIDEO]->(v1)
MERGE (a1)-[:HAS_VIDEO]->(v2)

// 7. Create Special Website & Archive Nodes
MERGE (w1:WebsiteArchive {url: 'https://akashdip2001.github.io/website-2/my-Gallery.html'})
SET w1.title = 'Early School Art & Drawing Portfolio (Class 1 - Class 10 Gallery)',
    w1.type = 'Art Gallery Website'

MERGE (w2:WebsiteArchive {url: 'https://akashdipmahapatra.in/college-projects'})
SET w2.title = 'College IT & Software Projects Archive (2021-2025)',
    w2.type = 'IT & IoT Hardware Projects Archive'

MERGE (c)-[:HOSTS_ARCHIVE]->(w1)
MERGE (c)-[:HOSTS_ARCHIVE]->(w2)

// 8. NASA Open Science Award & Research Publication Nodes
MERGE (a2:Award {title: 'NASA Open Science 101 Certification'})
SET a2.issuer = 'NASA'
MERGE (c)-[:EARNED]->(a2)

MERGE (pub:Publication {title: 'Modeling and Optimization of Surface Roughness of Electrodeposited Nickel Coating Using Taguchi and Bonobo Optimizer'})
SET pub.conference = 'INCOM 2026',
    pub.algorithms = 'Taguchi & Bonobo Optimizer',
    pub.domain = 'Surface Engineering & Metallurgical Optimization'
MERGE (c)-[:PUBLISHED]->(pub)
`;

const INDEX_CYPHER = `
CREATE FULLTEXT INDEX portfolioFullText IF NOT EXISTS
FOR (n:Candidate|Project|Skill|Certification|Playlist|Video|WebsiteArchive|Hobby|Award|Publication)
ON EACH [n.name, n.title, n.vendor, n.summary, n.tech, n.category, n.details, n.favorites]
`;

async function seed() {
  console.log("🌱 Starting Granular Neo4j Knowledge Graph Seeding for Akashdip Mahapatra...");
  const session = driver.session();
  try {
    await session.run(SEED_CYPHER);
    console.log("✅ Granular Neo4j Knowledge Graph nodes seeded successfully!");

    console.log("⚡ Creating Neo4j Full-Text Search Index (portfolioFullText)...");
    await session.run(INDEX_CYPHER);
    console.log("✅ Neo4j Full-Text Search Index created successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await session.close();
    await driver.close();
  }
}

seed();
