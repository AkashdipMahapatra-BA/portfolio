import { NextResponse } from "next/server";
import { queryGraph } from "@/lib/neo4j";

export const maxDuration = 30; // 30 seconds max duration for cron
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    // Vercel Cron Authentication (optional but recommended for security)
    // You can set CRON_SECRET in Vercel env vars. If not set, it bypasses auth.
    const authHeader = request.headers.get("authorization");
    if (
      process.env.CRON_SECRET &&
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // A lightweight query that simply counts the nodes to keep the connection alive
    const cypher = `MATCH (n) RETURN count(n) AS nodeCount`;
    const result = await queryGraph(cypher);

    return NextResponse.json({
      status: "success",
      message: "Neo4j keep-alive ping successful.",
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Neo4j keep-alive ping failed:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Neo4j keep-alive ping failed.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
