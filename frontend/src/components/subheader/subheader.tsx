import { USALProvider } from "@usal/react";
import style from "./subheader.module.scss";

interface SubheaderProps {
  data: { title: string; color?: string; backgroundColor?: string };
}

function Subheader({
  data: { title, color, backgroundColor },
}: SubheaderProps) {
  return (
    <USALProvider>
      <div
      data-usal="fade-r delay-200"
        className={style.title}
        style={
          {
            color,
            backgroundColor,
            border: `2px solid ${color}`,
          } as React.CSSProperties
        }
      >
        <div
          className={style.circle}
          style={
            {
              backgroundColor: color,
              border: `7px solid ${color}`,
            } as React.CSSProperties
          }
        ></div>
        {title}
      </div>
    </USALProvider>
  );
}

export default Subheader;
