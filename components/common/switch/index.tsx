import React from "react";
import { Switch } from "@headlessui/react";

type SwitchProps = {
  checked: boolean;
  onChange:
    | ((checked: boolean) => void)
    | (((event: React.FormEvent<HTMLButtonElement>) => void) &
        ((checked: boolean) => void));
  className: string;
};

const AppSwitch = ({ checked, onChange, className }: SwitchProps) => {
  return (
    <Switch
      type="button"
      checked={checked}
      onChange={onChange}
      className={`${
        checked ? "bg-green-600" : "bg-gray-400"
      } switch-custom ${className}`}
    >
      <span
        aria-hidden="true"
        className={`${checked ? "translate-x-7" : "translate-x-0"}
    switch-custom-circle`}
      />
    </Switch>
  );
};

export default AppSwitch;
