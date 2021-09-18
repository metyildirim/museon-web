import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

type DropDownItem = {
  title: string;
  action: () => void;
};

type DropDownProps = {
  title: string;
  items: Array<DropDownItem>;
};

const DropDown = ({ title, items }: DropDownProps) => {
  return (
    <div className="dropdown-common">
      <Menu as="div" className="dropdown-menu">
        <div>
          <Menu.Button className="dropdown-menu-btn">
            {title}
            <FontAwesomeIcon icon={faChevronDown} />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="dropdown-menu-items">
            {items.map(({ title, action }) => (
              <div key={title} className="px-1 py-1">
                <Menu.Item>
                  <button
                    onClick={action}
                    className="common-btn dropdown-menu-item-btn"
                  >
                    {title}
                  </button>
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropDown;
