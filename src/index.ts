import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { runAgent } from "./agent/runAgent";

async function main() {
  console.log("=========================================================================");
  console.log("🏛️  Architect Agent Iniciado.");
  console.log("   Director Técnico y Consultor en Diseño Arquitectónico a tu servicio.");
  console.log("   Escribe 'salir' para cerrar.");
  console.log("=========================================================================\n");

  const rl = readline.createInterface({ input, output });

  while (true) {
    const rawInput = await rl.question("👤 Usuario: ");
    
    if (rawInput.trim().toLowerCase() === "salir") {
      console.log("🏛️ Architect Agent: Hasta pronto. ¡Que tus sistemas escalen con éxito!");
      rl.close();
      break;
    }

    // Ejecuta Agente
    console.log("\n🏛️ Architect Agent procesando...");
    const response = await runAgent(rawInput);
    console.log(`\n🏛️ Architect Agent:\n${response}\n`);
    console.log("─────────────────────────────────────────────────────────────────────────");
  }
}

main().catch((err) => {
  console.error("Error crítico:", err);
  process.exit(1);
});
