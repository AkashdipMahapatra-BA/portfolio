import neo4j, { Driver } from "neo4j-driver";

let driver: Driver | null = null;

export function isNeo4jConfigured(): boolean {
  const uri = process.env.NEO4J_URI;
  const user = process.env.NEO4J_USERNAME;
  const password = process.env.NEO4J_PASSWORD;

  return !!(
    uri &&
    user &&
    password &&
    uri !== "neo4j+s://<YOUR_AURA_DB_INSTANCE>.databases.neo4j.io" &&
    !uri.includes("<YOUR_")
  );
}

export function getNeo4jDriver(): Driver | null {
  if (!isNeo4jConfigured()) return null;

  if (!driver) {
    try {
      const uri = process.env.NEO4J_URI!;
      const user = process.env.NEO4J_USERNAME!;
      const password = process.env.NEO4J_PASSWORD!;

      driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
        maxConnectionLifetime: 3 * 60 * 1000,
        maxConnectionPoolSize: 50,
        connectionAcquisitionTimeout: 5000,
      });
    } catch (err) {
      console.error("Failed to initialize Neo4j driver:", err);
      return null;
    }
  }

  return driver;
}

export async function queryGraph(
  cypher: string,
  params: Record<string, any> = {}
): Promise<any[] | null> {
  const activeDriver = getNeo4jDriver();
  if (!activeDriver) return null;

  const session = activeDriver.session();
  try {
    const result = await session.run(cypher, params);
    return result.records.map((record) => record.toObject());
  } catch (err) {
    console.warn("Neo4j query execution failed (Falling back to static prompt):", err);
    return null;
  } finally {
    await session.close();
  }
}
