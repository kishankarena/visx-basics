import { AxisScale,SharedAxisProps } from "@visx/axis";
import { ScaleInput } from "@visx/scale";
export type AxisProps = {
  width: number;
  height: number;
  showControls?: boolean;
};
 export  interface AxisDemoProps<Scale extends AxisScale> extends SharedAxisProps<Scale> {
    values: ScaleInput<Scale>[];
  }