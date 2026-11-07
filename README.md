# 🛠️ Herramientas de Campo de Cableado Estructurado | Catálogo Técnico y Práctico

Proyecto web interactivo y multimedia enfocado en las **Herramientas de Campo de Cableado Estructurado** para la asignatura de **Telecomunicaciones y Redes**.

---

## 🌟 Características y Soluciones de Diseño

- **Fotografías Reales de Cada Herramienta:** Se integraron imágenes reales locales en alta definición dentro de la carpeta `assets/`, asegurando que cada herramienta se visualice de forma auténtica, clara y sin depender de servicios externos aleatorios:
  - `assets/hero_kit.jpg`: Kit completo de campo en banco de trabajo.
  - `assets/pelacables.jpg`: Pelador rotatorio de par trenzado UTP con selector de profundidad.
  - `assets/ponchadora.jpg`: Ponchadora de impacto con cuchillas reversibles 110 y Krone.
  - `assets/crimpeadora.jpg`: Crimpeadora modular profesional para conectores RJ45 (8P8C).
  - `assets/tester.jpg`: Tester de continuidad con unidad maestra y remota para RJ45.
  - `assets/tijeras_kevlar.jpg`: Tijeras de electricista para corte de aramida (Kevlar) y cobre al ras.
  - `assets/generador_tonos.jpg`: Generador de tonos y sonda rastreadora inductiva ("El Pollo").
  - `assets/spudger.jpg`: Varilla spudger y ganchos extractores de hilo para bloques IDC.
- **Videos Embebidos Verificados de YouTube:**
  - **Video 1 (Crimpeadora):** `https://www.youtube.com/embed/iWoXN94RHIU` - Tutorial práctico de crimpeado de conectores RJ45 a cable UTP.
  - **Video 2 (Tester de Red):** `https://www.youtube.com/embed/y3DmOPrmBio` - Guía completa de uso de tester de cable ethernet RJ45 y detección de fallos.
- **Simulador Interactivo de Wiremap:** Pantalla digital LCD con indicadores LED dinámicos (Pines 1 a 8) para simular en tiempo real:
  - *Cable Correcto (PASS - T568B)*
  - *Pares Cruzados (FAIL)*
  - *Circuito Abierto / Pin Desconectado (WARN)*
- **Diseño Visual "Dark Theme":** Contornos redondeados (`border-radius: 1.5rem` / `rounded-2xl`) y sombras suaves (`box-shadow`), con animaciones de scroll sutiles (`IntersectionObserver`).

---

## 📂 Estructura de Archivos

```
1_aCableado_estructurado/
├── assets/
│   ├── hero_kit.jpg          # Kit de herramientas en banco de trabajo
│   ├── pelacables.jpg        # Pelador rotatorio de par trenzado UTP
│   ├── ponchadora.jpg        # Ponchadora de impacto con cuchillas 110 y Krone
│   ├── crimpeadora.jpg       # Crimpeadora modular RJ45 profesional
│   ├── tester.jpg            # Tester de red RJ45 (maestro y remoto)
│   ├── tijeras_kevlar.jpg    # Tijeras de electricista / cortadora de precisión
│   ├── generador_tonos.jpg   # Generador de tonos y sonda inductiva ("el pollo")
│   └── spudger.jpg           # Varilla spudger y gancho extractor IDC
├── index.html                # Estructura semántica, fotos reales y videos embebidos
├── styles.css                # Sistema de diseño Dark Theme, split-cards y rounded-2xl
├── script.js                 # IntersectionObserver, simulador de wiremap y selectores
└── README.md                 # Documentación técnica completa
```

---

## 🚀 Cómo Ejecutar en Local

1. Abre el explorador de archivos en la carpeta `1_aCableado_estructurado`.
2. Haz doble clic en el archivo `index.html` para abrirlo en cualquier navegador (Chrome, Edge, Firefox, Brave, Safari).
3. Todas las fotografías y scripts cargan localmente al 100%, sin enlaces rotos ni dependencias externas.
