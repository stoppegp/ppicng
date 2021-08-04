import React, { useRef } from "react";
import { WidgetProps } from "@rjsf/core";

const BootstrapFileWidget: React.FC<WidgetProps> = ({ onChange, value }) => {
  const labelRef = useRef<HTMLLabelElement>(null);
  const label = "test";

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target && e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        //onChange('name:' + file.name + ';' + ev.target?.result)
        onChange(ev.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="custom-file">
      <label ref={labelRef} className="custom-file-label">
        {value?.split(";")[0].split(":")[1] || "Durchsuchen..."}
      </label>
      <input
        onChange={onInputChange}
        type="file"
        className="custom-file-input"
        id="customFile"
      />
    </div>
  );
};
export default BootstrapFileWidget;
