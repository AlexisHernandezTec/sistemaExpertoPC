import classNames from "classnames";
import React from "react";

/**
 * Button for any action
 * @param { JSX } children inner element
 * @param {FontAwesomeIcon} icon icon display
 * @param {String} children title display
 * @param {Function} handlerClick on_click event
 * @param {TailwindCSS color} color bg color display
 * @param {Boolean} disabled define if handler not run and color in true
 * @param {String} toolTipLabel if exists define label to disabled
 * @returns
 */

function ActionButton({
  children,
  icon,
  handlerClick,
  color,
  disabled,
  hidden,
}) {
  return (
    <button
      onClick={handlerClick}
      className={classNames(
        disabled ? "bg-gray-500" : color ? color : "bg-custom-load-blue",
        hidden && "hidden",
        "p-2 rounded-md hover:scale-110 duration-150 flex flex-row w-max h-max space-x-1"
      )}
      disabled={disabled}
    >
      {children && (
        <div className="justify-center font-semibold text-white m-1 w-max">
          {children}
        </div>
      )}
      {icon && <div className="p-1 w-7">{icon}</div>}
    </button>
  );
}

export default ActionButton;
