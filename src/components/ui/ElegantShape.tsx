import { cn } from "@/lib/utils";

interface ElegantShapeProps {
  className?: string;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}

function ElegantShape({
  className,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-rose",
}: ElegantShapeProps) {
  return (
    <div
      className={cn("elegant-shape", className)}
      style={{
        position: "absolute",
        // Ya no ponemos transform inline en el contenedor padre para evitar sobreescribir la escala del SCSS
      }}
    >
      <div
        style={{
          width,
          height,
          position: "relative",
          // Aplicamos la rotación en el contenedor intermedio para liberar el transform del contenedor padre
          transform: `rotate(${rotate}deg)`,
        }}
      >
        <div
          className={cn("elegant-shape__inner", gradient)}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "9999px",
          }}
        />
      </div>
    </div>
  );
}

export { ElegantShape };
export type { ElegantShapeProps };
