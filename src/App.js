import React, {useCallback, useEffect, useState} from "react";
import Variant from "./Variant";
import {getDefaultPrice} from "./service";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [processorList, setProcessorList] = useState([]);
  const [error, setError] = useState(null);
  const [priceLoading, setPriceLoading] = useState(false);
  const [price, setPrice] = useState(0);
  const [priceError, setPriceError] = useState(null);
  const [selectedVariantSerialNo, setSelectedVariantSerialNo] = useState(
      {
    proe: ''
  })

  useEffect(() => {
    const getMacComponents = () => {
      return fetch(`http://localhost:3004/components`)
        .then((response) => response.json())
        .then((data) => {
          const processorComponents = data.filter(component => component.type === "proe");
          setSelectedVariantSerialNo({
            proe: processorComponents.find(component => component.default).serialNo
          });
          setProcessorList(processorComponents);
          setLoading(false);
        })
        .catch(() => {
          setError(new Error("could not fetch the customisable components"));
          setLoading(false);
        });
    };
    setLoading(true);
    getMacComponents();
    setPriceLoading(true);
    getDefaultPrice()
      .then((data) => {
        setPrice(data.value);
      })
      .catch((error) => {
        setPriceError(error);
      })
      .finally(() => {
        setPriceLoading(false);
      });
  }, []);

  const setSelectedVariant = useCallback( (variantSerialNo) => {
    setSelectedVariantSerialNo({
      proe: variantSerialNo
    })
  }, []);

  const getSelectedVariant = () => {
    return processorList.find(processor => processor.serialNo === selectedVariantSerialNo.proe);
  }

  const getAddOnPrice = () => {
    return getSelectedVariant()?.addOnPrice ?? 0;
  };

  return (
    <>
      <header>
        <div className="header__content">
          <a
            className="header__link"
            href="https://www.apple.com/in/macbook-pro"
          >
            <strong>MacBook Pro</strong>
          </a>
        </div>
      </header>
      <main>
        <div className="main__container">
          <div className="main__content">
            <section>
              <img
                className="macbook-img"
                alt="macbook pro"
                src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp16touch-space-select-201911?wid=1808&hei=1686&fmt=jpeg&qlt=80&.v=1572825197207"
              />
            </section>
            <section className="configuration">
              {loading ? (
                <h1>loading...</h1>
              ) : error ? (
                <h1>Something went wrong. Please try again later</h1>
              ) : (
                <>
                  <h1 className="mt-0">
                    Customise your 16‑inch MacBook Pro - Space Grey
                  </h1>
                  <ul className="summary-list">
                    <li data-testid="processor_desc">{getSelectedVariant()?.variant}</li>
                    <li>16-inch Retina display with True Tone</li>
                    <li>Four Thunderbolt 3 ports</li>
                    <li>Touch Bar and Touch ID</li>
                    <li>Backlit Magic Keyboard - US English</li>
                  </ul>
                  {!!processorList.length && (
                    <Variant
                        name="Processor"
                        processorList={processorList}
                        setSelectedVariant={setSelectedVariant}
                        selectedVariantSerialNo={selectedVariantSerialNo.proe}
                    />
                  )}
                </>
              )}
            </section>
          </div>
        </div>
        <div className="price container">
          <div className="price__content">
            <h1 className="price__value">
              Total:
              {priceLoading ? (
                <>{` loading...`}</>
              ) : priceError ? (
                "Something went wrong. Please try again later"
              ) : (
                <span data-testid="total-price">{` ₹${
                  price + getAddOnPrice()
                }`}</span>
              )}
            </h1>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
