import React from "react";

/**
 * 💡 HOW TO ADD / REPLACE BRAND LOGOS DIRECTLY VIA SVG FILES:
 * Save your .svg file into `apps/web/public/logos/` and export below.
 */

// ⚙️ Design & CAD
export function SolidWorksLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/solidworks.svg" alt="SolidWorks" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function FigmaLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/Figma.svg" alt="Figma" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function GimpLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/GIMP.svg" alt="GIMP" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function SalesforceLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/salesforce.svg" alt="Salesforce" width={size} height={size} style={{ objectFit: "contain" }} />;
}

// 🛠️ CI/CD, Agile & Observability
export function JiraLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/Jira.svg" alt="Jira" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function ConfluenceLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/Confluence.svg" alt="Confluence" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function ServiceNowLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/ServiceNow.svg" alt="ServiceNow" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function GitLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/Git.svg" alt="Git" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function GithubLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/github.svg" alt="GitHub" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function JenkinsLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/jenkins.svg" alt="Jenkins" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function DatadogLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/datadog.svg" alt="Datadog" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function GrafanaLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/Grafana.svg" alt="Grafana" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function WiresharkLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/wireshark.svg" alt="Wireshark" width={size} height={size} style={{ objectFit: "contain" }} />;
}

// 🧱 IaC, Containers & OS
export function TerraformLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/terraform.svg" alt="Terraform" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function DockerLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/docker.svg" alt="Docker" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function KubernetesLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/Kubernetes.svg" alt="Kubernetes" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function LinuxLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/linux.svg" alt="Linux" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function UbuntuLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/Ubuntu.svg" alt="Ubuntu" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function FedoraLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/Fedora.svg" alt="Fedora" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function KaliLinuxLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/kalilinux.svg" alt="Kali Linux" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function MsDosLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/MS-DOS.svg" alt="MS-DOS" width={size} height={size} style={{ objectFit: "contain" }} />;
}

// ☁️ Cloud Platforms
export function AwsLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/aws.svg.webp" alt="AWS" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function AwsLambdaLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/awslambda.svg" alt="AWS Lambda" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function FirebaseLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/Firebase.svg" alt="Firebase" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function GcpLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/gcp.svg" alt="GCP" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function AzureLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/azure.svg" alt="Azure" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function VercelLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/vercel-icon.svg" alt="Vercel" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function NetlifyLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/netlify.svg" alt="Netlify" width={size} height={size} style={{ objectFit: "contain" }} />;
}

// 🐍 Backend, APIs & Streaming
export function PythonLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/python.svg" alt="Python" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function NodeJsLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/Node.js.svg" alt="Node.js" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function FastApiLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/fastapi.svg" alt="FastAPI" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function PostmanLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/Postman.svg" alt="Postman" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function NginxLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/nginx.svg" alt="Nginx" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function ApacheKafkaLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/apache_kafka.svg" alt="Apache Kafka" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function Auth0Logo({ size = 24 }: { size?: number }) {
  return <img src="/logos/auth0.svg" alt="Auth0" width={size} height={size} style={{ objectFit: "contain" }} />;
}

// 🤖 AI / LLMs & Databases
export function OllamaLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/ollama.svg" alt="Ollama" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function HuggingFaceLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/hugging-face.svg" alt="Hugging Face" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function QdrantLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/qdrant.svg" alt="Qdrant" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function Neo4jLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/neo4j.svg" alt="Neo4j" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function RedisLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/redis.svg" alt="Redis" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function PostgreSqlLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/PostgresSQL.svg" alt="PostgreSQL" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function MySqlLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/MySQL.svg" alt="MySQL" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function MongoDbLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/MongoDB.svg" alt="MongoDB" width={size} height={size} style={{ objectFit: "contain" }} />;
}
export function SqLiteLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/sqlite.svg" alt="SQLite" width={size} height={size} style={{ objectFit: "contain" }} />;
}
