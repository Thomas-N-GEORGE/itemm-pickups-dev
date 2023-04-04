import React, { createContext, useEffect, useState } from "react";
import compute from "../functions/compute";
import { arrayToObj } from "../utils/arrays";
import { controlSettings } from "../settings";

const defaultControlValues = arrayToObj(controlSettings, "key", "defaultValue");

const AppCtx = createContext(undefined);
const AppStateProvider = ({children}) => {

  const [pickup, setPickup] = useState({
    rangeValue: 170,
    position: 170 * ((880 - 54 - 54) / 170 ),
    double: false
  });

  const [strings, setStrings] = useState({
    selected: null,
    excitementPosition: 0,
    crosshairPosition: 0,
    vibrating: null
  });

  const [computedData, setComputedData] = useState([]);

  const [notes, setNotes] = useState([-1, -1, -1, -1, -1]);

  const [controlValues, setControlValues] = useState(defaultControlValues)

  const update = (key, data) => {
    switch (key) {
      case "pickup":
        setPickup(data);
        break;
      case "notes":
        setNotes(data);
        break;
      case "strings":
        setStrings(data);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if(strings.vibrating) {
      setControlValues({
        pickupPosition: (pickup.rangeValue * - 1) + 170,
        pickupDouble: pickup.double,
        selectedNotes: notes.map(n => n+1).reverse(),
        crosshairPosition: strings.crosshairPosition,
        excitementPosition: strings.excitementPosition,
        selectedString: strings.selected
      })
      setComputedData(compute(controlValues));
    }
  }, [strings])

  const values = {
    pickup,
    strings,
    notes,
    controlValues,
    computedData,
    update,
  }

  return (
    <AppCtx.Provider value={values}>
      {children}
    </AppCtx.Provider>
  );
}

export { AppCtx, AppStateProvider };
