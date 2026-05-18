import { cn } from "@/lib/utils";
import { Cake, Croissant, CakeSlice, Dessert, Cookie } from "lucide-react";

interface PastryVectorProps {
  type: "cake" | "empanada" | "cupcake" | "macaron" | "slice";
  className?: string;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}

function PastryVector({
  type,
  className,
  width = 200,
  height = 200,
  rotate = 0,
  gradient = "from-rose",
}: PastryVectorProps) {
  // Estilos de cristal esmerilado de nivel profesional y alta costura
  const getGlassStyles = () => {
    switch (gradient) {
      case "from-rose":
        return {
          fill: "rgba(253, 244, 243, 0.28)",
          stroke: "rgba(212, 115, 109, 0.65)",
          glowColor: "rgba(212, 115, 109, 0.25)",
        };
      case "from-rose-soft":
        return {
          fill: "rgba(253, 244, 243, 0.18)",
          stroke: "rgba(212, 115, 109, 0.45)",
          glowColor: "rgba(212, 115, 109, 0.15)",
        };
      case "from-navy-metallic":
        return {
          fill: "rgba(235, 243, 255, 0.18)",
          stroke: "rgba(27, 42, 74, 0.58)",
          glowColor: "rgba(27, 42, 74, 0.2)",
        };
      case "from-gold-champagne":
        return {
          fill: "rgba(254, 251, 242, 0.22)",
          stroke: "rgba(197, 165, 90, 0.65)",
          glowColor: "rgba(197, 165, 90, 0.25)",
        };
      case "from-navy-soft":
      default:
        return {
          fill: "rgba(235, 243, 255, 0.14)",
          stroke: "rgba(27, 42, 74, 0.42)",
          glowColor: "rgba(27, 42, 74, 0.12)",
        };
    }
  };

  const styles = getGlassStyles();

  // Renderiza iconos matemáticamente perfectos y estandarizados de Lucide
  const renderLucideIcon = () => {
    const iconProps = {
      width: "100%", // Obliga al SVG interno a escalar al 100% de su contenedor (Soluciona el tamaño de 24px)
      height: "100%",
      style: {
        filter: `drop-shadow(0 8px 16px ${styles.glowColor})`,
        color: styles.stroke,
        fill: styles.fill,
        display: "block",
      },
      strokeWidth: 1.25, // Trazo fino de nivel profesional
    };

    switch (type) {
      case "cake":
        return <Cake {...iconProps} />;
      case "empanada":
        return <Croissant {...iconProps} />;
      case "cupcake":
        return <Dessert {...iconProps} />;
      case "macaron":
        return <Cookie {...iconProps} />;
      case "slice":
        return <CakeSlice {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={cn("elegant-shape", className)}
      style={{
        position: "absolute",
        width,
        height,
      }}
    >
      {/* 
        Contenedor medio que recibirá el parallax del mouse de forma aislada.
      */}
      <div
        className="elegant-shape__mouse"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {/* 
          Contenedor interno que recibirá la animación de balance/drift orgánico.
        */}
        <div
          className="elegant-shape__inner"
          style={{
            width: "100%",
            height: "100%",
            transform: `rotate(${rotate}deg)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {renderLucideIcon()}
        </div>
      </div>
    </div>
  );
}

export { PastryVector };
export type { PastryVectorProps };
