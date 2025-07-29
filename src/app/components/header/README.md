# Componente Header

Este componente representa el header principal de la aplicación de tatuajes, replicando exactamente el diseño proporcionado en la imagen.

## Características

- **Diseño fiel**: Replica exactamente el diseño de la imagen con colores negro, rojo y blanco
- **Navegación**: Incluye enlaces de navegación (HOME, SOBRE MI, GALERIA, FAQs, CONTACTO)
- **Formulario de suscripción**: Campo de email con botón de envío
- **Animaciones GSAP**: Efectos de entrada y hover suaves
- **Tracking Hotjar**: Integración para analytics de comportamiento
- **Responsive**: Diseño adaptativo para diferentes tamaños de pantalla

## Estructura

```
header/
├── header.component.ts      # Lógica del componente
├── header.component.html    # Template HTML
├── header.component.css     # Estilos CSS
└── README.md              # Documentación
```

## Tecnologías utilizadas

- **Angular 19**: Framework principal
- **PrimeNG**: Componentes UI (InputText, Button)
- **GSAP**: Animaciones y efectos
- **Hotjar**: Analytics y tracking de comportamiento

## Funcionalidades

### Navegación
- Enlaces de navegación con tracking de Hotjar
- Estados activos para la página actual
- Efectos hover con animaciones GSAP

### Formulario de suscripción
- Validación de email
- Tracking de formularios con Hotjar
- Animaciones de éxito al enviar
- Soporte para envío con Enter

### Animaciones
- Animación de entrada del header
- Efectos stagger para elementos de navegación
- Animaciones hover para elementos interactivos
- Efectos de escala para el formulario

## Uso

```html
<app-header></app-header>
```

## Configuración

### Hotjar
Para habilitar el tracking de Hotjar, actualiza el ID en `src/app/services/hotjar.service.ts`:

```typescript
private readonly hotjarId = 'TU_HOTJAR_ID';
```

### Rutas
Las rutas de navegación están configuradas en el componente. Asegúrate de que las rutas existan en tu aplicación:

- `/home`
- `/sobre-mi`
- `/galeria`
- `/faqs`
- `/contacto`

## Estilos

El componente utiliza variables CSS para mantener consistencia en los colores:

- `--primary-red`: #dc2626
- `--dark-red`: #991b1b
- `--white`: #ffffff
- `--black`: #000000

## Responsive

El componente es completamente responsive con breakpoints en:
- 768px: Tablets y dispositivos medianos
- 480px: Móviles y dispositivos pequeños 