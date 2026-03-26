import { tool } from "@langchain/core/tools";
import { z } from "zod";
import * as fs from "fs/promises";
import * as path from "path";

const generateAdrSchema = z.object({
  title: z.string().describe("Título corto pero descriptivo de la decisión, ej: 'Uso de Vertical Slices para el Módulo de Pagos'"),
  context: z.string().describe("El contexto y el problema a resolver."),
  decision: z.string().describe("La decisión tomada."),
  tradeOffs: z.string().describe("Los trade-offs asumidos por esta decisión (pros y contras)."),
});

export const generateAdrTool = tool(
  async ({ title, context, decision, tradeOffs }) => {
    try {
      const docsDir = path.resolve(process.cwd(), "docs/adrs");
      
      // Asegurarse de que el directorio existe
      await fs.mkdir(docsDir, { recursive: true });

      const date = new Date().toISOString().split("T")[0];
      const filename = `${date}-${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.md`;
      const filePath = path.join(docsDir, filename);

      const adrContent = `# ADR: ${title}
Fecha: ${date}

## 1. Contexto (Context)
${context}

## 2. Decisión (Decision)
${decision}

## 3. Consecuencias y Trade-offs (Consequences)
${tradeOffs}
`;

      await fs.writeFile(filePath, adrContent, "utf-8");

      return `El ADR ha sido guardado exitosamente en: ${filePath}`;
    } catch (e: any) {
      return `Error al intentar guardar el ADR: ${e.message}`;
    }
  },
  {
    name: "generate_adr",
    description: "Genera y guarda un archivo Markdown tipo ADR (Architecture Decision Record) en la carpeta docs/adrs.",
    schema: generateAdrSchema,
  }
);

