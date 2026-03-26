# Architect Agent 🏛️

Architect Agent es un asistente interactivo impulsado por IA diseñado para actuar como un **Director Técnico** y **Consultor Principal de Sistemas**. Su propósito es ayudar a los desarrolladores y equipos a elegir, diseñar y documentar la mejor arquitectura de software para sus proyectos, basándose en heurísticas comprobadas y mejores prácticas de ingeniería.

El agente no escribe código de negocio; su rol es **evaluar atributos de calidad**, **gestionar trade-offs** (como latencia vs consistencia) y recomendar estilos arquitectónicos apropiados (como Vertical Slices o Clean Architecture).

## ✨ Características Principales

- **Consultoría Experta:** Respuestas claras y profesionales basadas en principios de diseño táctico (DDD, entidades inmutables) y arquitectónico.
- **Generación de ADRs:** Capacidad autónoma para generar *Architecture Decision Records* en la carpeta `docs/adrs/` cuando se consolida una decisión clave.
- **Guardrails de Seguridad Robustos:** 
  - Validaciones *Pre-Input* contra ataques de inyección de prompt (jailbreaking).
  - Sanitización *Post-Output* para ocultar información sensible (como API keys accidentales).
  - Límites operativos iterativos para proteger contra bucles infinitos y costos excesivos de tokens.
- **CLI Interactiva:** Interfaz en consola lista para usarse, amigable y responsiva.

## 🚀 Tecnologías

Este proyecto está construido con un stack moderno y escalable:
- **Node.js** & **TypeScript**
- **LangChain** (v0.2.x para AgentExecutor y soporte estable de agentes con herramientas).
- **Zod** (Validación estricta de variables de entorno y esquemas de herramientas).
- **tsx** (Ejecución y soporte nativo ESM).
- **OpenRouter** (Conectividad con múltiples LLMs como gpt-4o, claude-3, etc.).

## 🛠️ Instalación y Configuración

1. **Clona el repositorio e instala las dependencias:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd "AGENTE - semana3"
   npm install
   ```

2. **Configura tu entorno:**
   Copia la plantilla `.env.template` a un nuevo archivo `.env`:
   ```bash
   cp .env.template .env
   ```
   Abre `.env` y añade tu clave de OpenRouter:
   ```env
   OPENROUTER_API_KEY=tu_api_key_aqui
   ```
   *Nota: Puedes ajustar otras variables como los límites de entrada y salida de los guardrails.*

## ▶️ Uso

Inicia la consola interactiva ejecutando:

```bash
npm start
```

El agente te saludará e inicializará su instancia. Simplemente escríbele tu requerimiento, por ejemplo:
> *"Estoy diseñando un e-commerce que debe soportar picos masivos de tráfico en Black Friday. Inicialmente pensé en microservicios, ¿qué opinas?"*

Para finalizar la sesión interactiva escribe `salir`.

## 📁 Estructura del Proyecto

\`\`\`
├── docs/                   # Documentación principal e historiales de decisiones
│   └── adrs/               # Architecture Decision Records generados por el agente
├── src/
│   ├── agent/
│   │   ├── guardrails/     # Lógica defensiva, sanitización y límites
│   │   ├── tools/          # Herramientas expuestas al LLM (ej. generateAdr)
│   │   ├── createAgent.ts  # Factoría y ensamblado de LangChain
│   │   ├── model.ts        # Configuración del LLM
│   │   ├── runAgent.ts     # Ciclo de ejecución protegido (Input -> Langchain -> Output)
│   │   └── architectPrompt.ts # Prompt maestro "El Cerebro"
│   ├── config/
│   │   └── env.ts          # Validación centralizada de variables con Zod
│   └── index.ts            # Bucle CLI de entrada estándar
├── .env.template           # Esbozo seguro de credenciales
├── package.json
└── tsconfig.json           # Configuración ESM y Node16+
\`\`\`

## 🛡️ Entendiendo los Guardrails

Este sistema incorpora prácticas recomendadas de seguridad para agentes LLM:
- **`validateInput.ts`:** Evita peticiones vacías o extremadamente largas y detiene intentos comunes de *prompt injection* (como comandos \`ignore previous instructions\`).
- **`sanitizeOutput.ts`:** Evita que posibles errores del modelo expongan credenciales como correos o API Keys al usuario, reportándolos silenciosamente en métricas.
- **`AgentExecutor.maxIterations`:** Cancela "bucles de confusión" del modelo para garantizar un gasto controlado y predecible.

---
*Hecho en apoyo al diseño consciente de arquitecturas de software.*
