import { CirclePicker } from "react-color";
import { WidgetProps } from "@rjsf/core";

const CircleColorWidget: React.FC<WidgetProps> = ({
  value,
  options,
  onChange,
  label,
}) => {
  const enumOptions = options?.enumOptions as Array<{ value: string }>;
  return (
    <>
      {label}
      <CirclePicker
        color={value}
        colors={enumOptions.map((option) => option.value)}
        onChange={(color) => onChange(color.hex)}
      />
    </>
  );
};

export default CircleColorWidget;
