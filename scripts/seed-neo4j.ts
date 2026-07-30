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
    c.client = 'British Airways',
    c.degree = 'Bachelor of Technology in Mechanical Engineering',
    c.college = 'Academy of Technology',
    c.graduation = '2021-2025',
    c.website = 'https://akashdipmahapatra.in',
    c.linkedin = 'https://linkedin.com/in/akashdipmahapatra',
    c.github_official = 'https://github.com/AkashdipMahapatra-BA',
    c.github_college = 'https://github.com/akashdip2001'

// 2. Create Projects & Link to Candidate
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

// 3. Create Skills
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
  {name: 'OpenTofu', category: 'IaC'}
] AS sData
MERGE (s:Skill {name: sData.name})
SET s.category = sData.category
MERGE (c)-[:HAS_SKILL]->(s)

// Bridge Mechanical SolidWorks to WebGL Engine
WITH c
MATCH (s:Skill {name: 'SolidWorks'}), (p:Project {id: 'p6'})
MERGE (s)-[:BRIDGED_TO]->(p)

// 4. Create Key Awards & Credentials
MERGE (a1:Award {title: 'National Award in Painting'})
SET a1.presenter = 'President Pranab Mukherjee',
    a1.year = 2012,
    a1.event = 'National Energy Conservation Day',
    a1.official_video = 'https://youtu.be/ysBF9EfvWkk?t=424',
    a1.highlight_video = 'https://youtu.be/IkcPfEoTvcs',
    a1.art_gallery = 'https://akashdip2001.github.io/website-2/my-Gallery.html'

MERGE (a2:Award {title: 'NASA Open Science 101 Certification'})
SET a2.issuer = 'NASA'

MERGE (c)-[:WON]->(a1)
MERGE (c)-[:EARNED]->(a2)

// 5. Certifications Summary Node
MERGE (cert:CertificationCollection {name: '88+ Credly & Vendor Badges'})
SET cert.aws = 'AWS Certified Cloud Practitioner, AWS Cloud Quest, AWS Educate (10 Badges)',
    cert.gcp = 'GCP Cloud Digital Leader, Vertex AI Prompt Design, BigQuery ML (11 Badges)',
    cert.azure = 'Azure Network Engineer Associate, Azure AI Fundamentals, Copilot for Security',
    cert.github = 'GitHub Actions, GitHub Advanced Security, GitHub Foundations, GitHub Administration, GitHub Copilot',
    cert.linux = 'FinOps Certified Engineer, LFS101 Intro to Linux, LFD103 Linux Kernel Dev, OpenTofu',
    cert.cad = 'SolidWorks CSWA, CSWP, xDesign, xMold, 3DSwymer, DraftSight'

MERGE (c)-[:EARNED_COLLECTION]->(cert)

// 6. Publications
MERGE (pub:Publication {title: 'Electrodeposited Nickel Coating Optimization'})
SET pub.conference = 'INCOM 2026',
    pub.algorithms = 'Taguchi & Bonobo Optimizer',
    pub.domain = 'Surface Engineering & Metallurgical Optimization'

MERGE (c)-[:PUBLISHED]->(pub)

// 7. Video Playlists
MERGE (pl1:Playlist {title: 'SOLIDWORKS Assembly & Motion Studies'})
SET pl1.url = 'https://www.youtube.com/playlist?list=PL_RecMEcs_p__J3GSHkKfLjC08q0NmWtR', pl1.category = 'CAD'

MERGE (pl2:Playlist {title: 'Sheet-Metal & Weldments Tutorials'})
SET pl2.url = 'https://www.youtube.com/playlist?list=PL_RecMEcs_p-Ix6heCxLixbhMCrOd5A0D', pl2.category = 'CAD'

MERGE (pl3:Playlist {title: 'College IT, Hardware & IoT Projects'})
SET pl3.url = 'https://www.youtube.com/playlist?list=PL_RecMEcs_p-5UwLqFBFtat90L8IOc1bZ', pl3.category = 'IoT & Code'

MERGE (c)-[:PUBLISHED_PLAYLIST]->(pl1)
MERGE (c)-[:PUBLISHED_PLAYLIST]->(pl2)
MERGE (c)-[:PUBLISHED_PLAYLIST]->(pl3)
`;

async function seed() {
  console.log("🌱 Starting Neo4j Knowledge Graph Seeding for Akashdip Mahapatra...");
  const session = driver.session();
  try {
    await session.run(SEED_CYPHER);
    console.log("✅ Neo4j Knowledge Graph seeded successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await session.close();
    await driver.close();
  }
}

seed();
