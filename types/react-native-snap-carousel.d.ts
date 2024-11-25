declare module "react-native-snap-carousel" {
  import { Component } from "react";
  import { FlatListProps, StyleProp, ViewStyle } from "react-native";

  interface CarouselProps<T> extends FlatListProps<T> {
    data: T[];
    renderItem: ({ item, index }: { item: T; index: number }) => JSX.Element;
    sliderWidth: number;
    itemWidth: number;
    itemHeight?: number;
    sliderHeight?: number;
    activeSlideAlignment?: "start" | "center" | "end";
    inactiveSlideScale?: number;
    inactiveSlideOpacity?: number;
    containerCustomStyle?: StyleProp<ViewStyle>;
    contentContainerCustomStyle?: StyleProp<ViewStyle>;
    layout?: "default" | "stack" | "tinder";
    layoutCardOffset?: number;
    enableSnap?: boolean;
    loop?: boolean;
    autoplay?: boolean;
    autoplayDelay?: number;
    autoplayInterval?: number;
  }

  export default class Carousel<T = any> extends Component<CarouselProps<T>> {}
}
