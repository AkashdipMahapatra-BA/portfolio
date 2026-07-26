import React from "react";

/**
 * 💡 HOW TO ADD / REPLACE BRAND LOGOS DIRECTLY VIA SVG FILES:
 * 
 * 1. Save your .svg file into `apps/web/public/logos/`
 * 2. Export a component below pointing to `/logos/<filename>.svg`
 */

export function SolidWorksLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/solidworks.svg" alt="SolidWorks" width={size} height={size} style={{ objectFit: "contain" }} />;
}

export function JenkinsLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/jenkins.svg" alt="Jenkins" width={size} height={size} style={{ objectFit: "contain" }} />;
}

export function GithubLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/github.svg" alt="GitHub" width={size} height={size} style={{ objectFit: "contain" }} />;
}

export function DatadogLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/datadog.svg" alt="Datadog" width={size} height={size} style={{ objectFit: "contain" }} />;
}

export function WiresharkLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/wireshark.svg" alt="Wireshark" width={size} height={size} style={{ objectFit: "contain" }} />;
}

export function TerraformLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/terraform.svg" alt="Terraform" width={size} height={size} style={{ objectFit: "contain" }} />;
}

export function DockerLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/docker.svg" alt="Docker" width={size} height={size} style={{ objectFit: "contain" }} />;
}

export function LinuxLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/linux.svg" alt="Linux" width={size} height={size} style={{ objectFit: "contain" }} />;
}

export function KaliLinuxLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/kalilinux.svg" alt="Kali Linux" width={size} height={size} style={{ objectFit: "contain" }} />;
}

export function AwsLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/aws.svg.webp" alt="AWS" width={size} height={size} style={{ objectFit: "contain" }} />;
}

export function AwsLambdaLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/awslambda.svg" alt="AWS Lambda" width={size} height={size} style={{ objectFit: "contain" }} />;
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

export function PythonLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/python.svg" alt="Python" width={size} height={size} style={{ objectFit: "contain" }} />;
}

export function FastApiLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/fastapi.svg" alt="FastAPI" width={size} height={size} style={{ objectFit: "contain" }} />;
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

export function SalesforceLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/salesforce.svg" alt="Salesforce" width={size} height={size} style={{ objectFit: "contain" }} />;
}

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

export function SqLiteLogo({ size = 24 }: { size?: number }) {
  return <img src="/logos/sqlite.svg" alt="SQLite" width={size} height={size} style={{ objectFit: "contain" }} />;
}
