export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  const message = body?.message?.toLowerCase() || "";

  const responses = {
    greeting: [
      "Telemetry online. Race Engineer active. How can I assist from the pit wall?",
      "Sector clear. Systems encrypted and ready. State your query.",
      "All systems green. Awaiting instructions from driver.",
    ],
    projects: [
      "Telemetry confirms major builds: Cadence, AdditiveCurriculum, Zenith. All deployed sector-clear.",
      "Encrypted stack includes Cadence security suite and Zenith platform architecture.",
      "Project diagnostics show multiple full-stack deployments. Stable and optimized.",
    ],
    cadence: [
      "Cadence is a security-focused system engineered with encrypted architecture.",
      "Cadence telemetry indicates hardened authentication modules and clean API routing.",
      "Cadence build optimized for resilience and modular expansion.",
    ],
    research: [
      "Research log: AI Game Tree Optimization presented at ICASS-2026. Evaluation function enhanced.",
      "Pac-Man AI pruning efficiency improved. Alpha-Beta telemetry optimized.",
      "IEEE conference deployment complete. Sector dominance confirmed.",
    ],
    skills: [
      "Full-Stack. Security Engineering. AI optimization. Systems encrypted and stable.",
      "Stack includes modern frontend frameworks, backend APIs, and cryptographic workflows.",
      "Telemetry shows strong command over system architecture and applied AI.",
    ],
    fallback: [
      "Signal received. Processing complete. Can you refine the telemetry input?",
      "Query acknowledged. Please provide additional parameters.",
      "Instruction unclear. Awaiting optimized command.",
    ],
  };

  function random(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  let reply = "";

  if (message.includes("hi") || message.includes("hello")) {
    reply = random(responses.greeting);
  } else if (message.includes("project")) {
    reply = random(responses.projects);
  } else if (message.includes("cadence")) {
    reply = random(responses.cadence);
  } else if (message.includes("research") || message.includes("paper")) {
    reply = random(responses.research);
  } else if (message.includes("skill")) {
    reply = random(responses.skills);
  } else {
    reply = random(responses.fallback);
  }

  return res.status(200).json({ text: reply });
}
