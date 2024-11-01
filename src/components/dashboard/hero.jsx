import React from "react";

export default function hero({category, value }) {
  return (
    <>
      <div className="sub_grid_dashboard w-100 p-3 bg_secondaryligth rounded-2 gap-3 d-flex align-items-center rounded-lg">
          <div className="d-flex flex-column mx-4">
            <span className="inter_medium text-md text_darkprimary">{category}</span>
            <div className="d-flex align-items-end">
              <p className="inter_medium mb-0 text_darkprimary" style={{fontSize:"50px"}}>
                {value}
              </p>
            </div>
          </div>
        </div>
    </>
  );
}
