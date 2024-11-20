import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface Driver {
  id: number;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
}

declare interface MarkerData {
  latitude: number;
  longitude: number;
  id: number;
  title: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
  first_name: string;
  last_name: string;
  time?: number;
  price?: string;
}

declare interface MapProps {
  destinationLatitude?: number;
  destinationLongitude?: number;
  onDriverTimesCalculated?: (driversWithTimes: MarkerData[]) => void;
  selectedDriver?: number | null;
  onMapReady?: () => void;
}

declare interface Ride {
  origin_address: string;
  destination_address: string;
  origin_latitude: number;
  origin_longitude: number;
  destination_latitude: number;
  destination_longitude: number;
  ride_time: number;
  fare_price: number;
  payment_status: string;
  driver_id: number;
  user_id: string;
  created_at: string;
  driver: {
    first_name: string;
    last_name: string;
    car_seats: number;
  };
}

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?:
    | "primary"
    | "secondary"
    | "danger"
    | "outline"
    | "success"
    | "white"
    | "backButton"
    | "dark";
  textVariant?:
    | "primary"
    | "default"
    | "secondary"
    | "danger"
    | "success"
    | "editprofile"
    | "backButton"
    | "white";

  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface GoogleInputProps {
  icon?: string;
  initialLocation?: string;
  containerStyle?: string;
  textInputBackgroundColor?: string;
  handlePress: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface InputFieldProps extends TextInputProps {
  label?: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

declare interface FoodItem {
  foodName: string;
  brandName?: string; // Optional, since common foods may not have it
  calories?: number | string; // Optional, since not all foods may have calorie info
  servingQty?: number; // Optional, since not all foods may have serving quantity
  servingUnit?: string; // Optional, since not all foods may have serving unit
  photoUrl?: string | null; // Thumbnail URL
  nixItemID?: string | null;
}
declare interface ReceivedFoodItem {
  food_name: string;
  brand_name?: string; // Optional, since common foods may not have it
  nf_calories?: number | string; // Optional, since not all foods may have calorie info
  serving_qty?: number; // Optional, since not all foods may have serving quantity
  serving_unit?: string; // Optional, since not all foods may have serving unit
  photo?: { thumb: string | null }; // Thumbnail URL
  nix_item_id?: string | null;
}

interface NutritionData {
  food_name: string;
  brand_name?: string; // Optional
  serving_qty: number;
  serving_unit: string;
  serving_weight_grams?: number; // Optional
  nf_calories?: number; // Optional
  nf_total_fat?: number; // Optional
  nf_saturated_fat?: number; // Optional
  nf_total_carbohydrate?: number; // Optional
  nf_sugars?: number; // Optional
  nf_protein?: number; // Optional
  nf_sodium?: number; // Optional
  nf_dietary_fiber?: number; // Optional
  nf_cholesterol?: number; // Optional
  nf_ingredient_statement?: string; // Optional
  photo?: { thumb: string | null }; // Optional
}
