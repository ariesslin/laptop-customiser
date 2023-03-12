import React from "react";

const Variant = ({name, processorList, setSelectedVariant, selectedVariantSerialNo} )=> {
    return (
        <>
        <div className="component">
        <h3 className="component__name">{name}</h3>
        <ul>
          {processorList.map((v) => (
            <li
              key={`Processor_${v.serialNo}`}
              className={`variant ${selectedVariantSerialNo === v.serialNo ? "variant--selected" : ""}`}
              data-testid={`Processor_${v.serialNo}`}
              onClick={() => setSelectedVariant(v.serialNo)}>
              <p className="variant__name">
                <strong>{v.variant}</strong>
              </p>
              {v.addOnPrice > 0 && <p>+ ₹{v.addOnPrice}</p>}
            </li>
          ))}
        </ul>
      </div>
      </>

    )

}

export default Variant;
