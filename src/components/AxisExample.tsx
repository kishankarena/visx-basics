import { Axis, AxisScale } from "@visx/axis";
import { LinearGradient } from "@visx/gradient";
import { coerceNumber, scaleBand, scaleLinear, scaleLog, scaleUtc } from "@visx/scale";
import { timeFormat } from "d3-time-format";
import { useMemo, useState } from "react";
import { transform } from "typescript";
import { AxisDemoProps, AxisProps } from "../AxisExample.type";

export const backgroundColor = "#da7cff";
const margin = {
  top: 40,
  right: 150,
  bottom: 20,
  left: 50,
};

const getMinMax = (vals: (number | { valueOf(): number })[]) => {
  const numericVals = vals.map(coerceNumber);
  return [Math.min(...numericVals), Math.max(...numericVals)];
};

const AxisExample = ({
  width: outerWidth = 800,
  height: outerHeight = 800,
  showControls = true,
}: AxisProps) => {
  const [dataToggle, setDataToggle] = useState(true);
  const width = outerWidth - margin.left - margin.right;
  const height = outerHeight - margin.top - margin.bottom;
   
  const GridRowsComponent: GridRowsComponent = useAnimatedComponents ? AnimatedAxis : Axis;
  const axes: AxisDemoProps<AxisScale<number>>[] = useMemo(() => {
    // toggle between two value ranges to demo animation
    const linearValues = dataToggle ? [0, 2, 4, 6, 8, 10] : [6, 8, 10, 12];
    const bandValues = dataToggle ? ["a", "b", "c", "d"] : ["d", "c", "b", "a"];
    const timeValues = dataToggle
      ? [new Date("2020-01-01"), new Date("2020-02-01")]
      : [new Date("2020-02-01"), new Date("2020-03-01")];
    const logValues = dataToggle
      ? [1, 10, 100, 1000, 10000]
      : [0.0001, 0.001, 0.1, 1, 10, 100];

    return [
      {
        scale: scaleLinear({
          domain: getMinMax(linearValues),
          range: [0, width],
        }),
        values: linearValues,
        tickFormat: (
          v: number,
          index: number,
          ticks: { value: number; index: number }[]
        ) =>
          index === 0
            ? "first"
            : index === ticks[ticks.length - 1].index
            ? "last"
            : `${v}`,
        label: "linear",
      },
      {
        scale: scaleBand({
          domain: bandValues,
          range: [0, width],
          paddingOuter: 0,
          paddingInner: 1,
        }),
        values: bandValues,
        tickFormat: (v: string) => v,
        label: "categories",
      },
      {
        scale: scaleUtc({
          domain: getMinMax(timeValues),
          range: [0, width],
        }),
        values: timeValues,
        tickFormat: (v: Date, i: number) =>
          i === 3
            ? "🎉"
            : width > 400 || i % 2 === 0
            ? timeFormat("%b %d")(v)
            : "",
        label: "time",
      },
      {
        scale: scaleLog({
          domain: getMinMax(logValues),
          range: [0, width],
        }),
        values: logValues,
        tickFormat: (v: number) => {
          const asString = `${v}`;
          // label only major ticks
          return asString.match(/^[.01?[\]]*$/) ? asString : "";
        },
        label: "log",
      },
    ];
  }, [dataToggle, width]);

  if (width < 10) return null;

  const scalePadding = 40;
  const scaleHeight = height / axes.length - scalePadding;
  return (
    <>
      <svg width={outerWidth} height={outerHeight}>
        <LinearGradient
          id="visx-axis-gradient"
          from={backgroundColor}
          to={backgroundColor}
          toOpacity={0.5}
        />
        <rect
          x={0}
          y={0}
          width={outerWidth}
          height={outerHeight}
          fill={"url(#visx-axis-gradient)"}
          rx={14}
        />
        <g transform={`translate(${margin.left},${margin.top})`}>
            {
                axes.map(({scale,values,label,tickFormat},i)=>(
                    <g key={`scale-${i}`} transform={`translate(0,${i*(scaleHeight + scalePadding)})`}>
                     
                    </g>
                ))
            }
        </g>
      </svg>
    </>
  );
};

export default AxisExample;
