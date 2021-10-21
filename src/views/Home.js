import React, { useState } from "react";
import { TextField, Box } from "@mui/material";

const Division = ({ divisor, dividendo, color = "black" }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        color: color,
      }}
    >
      {dividendo}
      <hr style={{ height: "1px", background: color, width: "100%" }} />
      {divisor}
    </div>
  );
};

const Operation = ({ first, second }) => {
  return (
    <div>
      <Division
        dividendo={
          <div style={{ display: "inline-flex", alignItems: "center" }}>
            ({second} - {first}){" "}
          </div>
        }
        divisor={
          <Division
            color="brown"
            dividendo={
              <span>
                ({second} + {first})
              </span>
            }
            divisor={<span>2</span>}
          />
        }
      />
      <span> x 100</span>
    </div>
  );
};

const OperationResult = ({ first, second, firstLabel, secondLabel }) => {
  const Second = () => (
    <TextField
      style={{ padding: "0.25em" }}
      value={second}
      onChange={(e) => Number(e.target.value)}
      type="number"
      label={secondLabel}
      readOnly={true}
      variant="outlined"
      focused={true}
    />
  );
  const First = () => (
    <TextField
      value={first}
      onChange={(e) => Number(e.target.value)}
      type="number"
      label={firstLabel}
      readOnly={true}
      variant="outlined"
      focused={true}
    />
  );
  return (
    <div>
      <Division
        dividendo={
          <div style={{ display: "inline-flex", alignItems: "center" }}>
            (<Second />- <First />)
          </div>
        }
        divisor={
          <Division
            color="brown"
            dividendo={
              <div style={{ display: "inline-flex", alignItems: "center" }}>
                (<Second /> + <First />)
              </div>
            }
            divisor={<span>2</span>}
          />
        }
      />
      <span> x 100</span>
    </div>
  );
};

const Formula = () => {
  return (
    <div>
      <h4>Formula:</h4>
      <div>
        <Division
          dividendo={<Operation first="QX1" second="QX2" />}
          divisor={<Operation first="PY1" second="PY2" />}
        />
      </div>
    </div>
  );
};
const Ejecucion = ({ qx1, qx2, py1, py2 }) => {
  return (
    <div>
      <h4>Ejecución:</h4>
      <div>
        <Division
          dividendo={
            <OperationResult
              first={qx1}
              firstLabel="QX1"
              second={qx2}
              secondLabel="QX2"
            />
          }
          divisor={
            <OperationResult
              first={py1}
              firstLabel="PY1"
              second={py2}
              secondLabel="PY2"
            />
          }
        />
      </div>
    </div>
  );
};
const Resolution = ({ qx1, qx2, py1, py2, result }) => {
  return (
    <div id="resolucion">
      <h4>Resolution:</h4>
      <style>{`
      #resolucion strong {
        margin-left: 1em;
      }
      `}</style>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gridGap: "1em",
        }}
      >
        <div style={{ padding: "1em", borderRight: "1px solid black" }}>
          <div>QX1 = {qx1}</div>
          <div>QX2 = {qx2}</div>
          <div>PY1 = {py1}</div>
          <div>PY2 = {py2}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Division
            dividendo={<Operation first={qx1} second={qx2} />}
            divisor={<Operation first={py1} second={py2} />}
          />
          <strong>=</strong>
          <strong>{result}</strong>
        </div>
      </div>
    </div>
  );
};
const useOperation = () => {
  const [qx1, setQx1] = useState();
  const [qx2, setQx2] = useState();
  const [py1, setPy1] = useState();
  const [py2, setPy2] = useState();

  const result =
    (((qx2 - qx1) / ((qx2 + qx1) / 2)) * 100) /
    (((py2 - py1) / ((py2 + py1) / 2)) * 100);

  return {
    qx1,
    qx2,
    py1,
    py2,
    setQx1,
    setQx2,
    setPy1,
    setPy2,
    result,
  };
};

export const Home = () => {
  const data = useOperation();
  const { qx1, qx2, py1, py2, setQx1, setQx2, setPy1, setPy2, result } = data;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div>
        <Formula />
        <TextField
          style={{ margin: "1em" }}
          value={qx1}
          onChange={(e) => setQx1(Number(e.target.value))}
          type="number"
          label="QX1"
          variant="outlined"
        />
        <br />

        <TextField
          style={{ margin: "1em" }}
          value={qx2}
          onChange={(e) => setQx2(Number(e.target.value))}
          type="number"
          label="QX2"
          variant="outlined"
        />
        <br />
        <TextField
          style={{ margin: "1em" }}
          value={py1}
          onChange={(e) => setPy1(Number(e.target.value))}
          type="number"
          label="PY1"
          variant="outlined"
        />
        <br />
        <TextField
          style={{ margin: "1em" }}
          value={py2}
          onChange={(e) => setPy2(Number(e.target.value))}
          type="number"
          label="PY2"
          variant="outlined"
        />
        <br />

        <TextField
          style={{ margin: "1em" }}
          value={result}
          onChange={(e) => Number(e.target.value)}
          readOnly={true}
          focused={true}
          type="number"
          label="Result"
          variant="outlined"
        />
      </div>
      <div>
        <Resolution {...data} />
        <Ejecucion {...data} />
      </div>
    </div>
  );
};
