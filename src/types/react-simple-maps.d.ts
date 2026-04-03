declare module "react-simple-maps" {
  import { ComponentType, ReactNode, SVGAttributes, MouseEvent } from "react";

  export interface ProjectionConfig {
    scale?: number;
    center?: [number, number];
    rotate?: [number, number, number];
    parallels?: [number, number];
  }

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: ProjectionConfig;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    className?: string;
    children?: ReactNode;
  }

  export interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    children?: ReactNode;
    onMoveStart?: (position: any) => void;
    onMoveEnd?: (position: any) => void;
  }

  export interface GeographiesProps {
    geography: string | object;
    children: (result: { geographies: any[] }) => ReactNode;
  }

  export interface GeographyProps extends SVGAttributes<SVGPathElement> {
    geography: any;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: object;
      hover?: object;
      pressed?: object;
    };
    onMouseEnter?: (event: MouseEvent<SVGPathElement>, geography: any) => void;
    onMouseLeave?: (event: MouseEvent<SVGPathElement>, geography: any) => void;
    onClick?: (event: MouseEvent<SVGPathElement>, geography: any) => void;
  }

  export interface SphereProps extends SVGAttributes<SVGPathElement> {
    id?: string;
  }

  export interface GraticuleProps extends SVGAttributes<SVGPathElement> {
    step?: [number, number];
  }

  export interface LineProps {
    from?: [number, number];
    to?: [number, number];
    coordinates?: Array<[number, number]>;
    stroke?: string;
    strokeWidth?: number;
    fill?: string;
    style?: object;
  }

  export interface MarkerProps {
    coordinates: [number, number];
    children?: ReactNode;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
  export const Sphere: ComponentType<SphereProps>;
  export const Graticule: ComponentType<GraticuleProps>;
  export const Line: ComponentType<LineProps>;
  export const Marker: ComponentType<MarkerProps>;
}
