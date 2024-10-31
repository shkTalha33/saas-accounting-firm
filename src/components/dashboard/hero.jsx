import React from "react";

export default function hero({category, value }) {
  return (
    <>
      <div className="sub_grid_dashboard w-100 p-3 bg_secondaryligth rounded-2 gap-3 d-flex align-items-center rounded-lg">
          <div className="d-flex flex-column">
            <span className="inter_medium text-md">{category}</span>
            <div className="d-flex align-items-end">
              <p className="inter_semibold mb-0" style={{fontSize:"60px"}}>
                {value}
              </p>
            </div>
          </div>
        </div>
    </>
  );
}
