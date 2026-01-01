export type USState =
  | "Alabama"
  | "Arizona"
  | "Arkansas"
  | "California"
  | "Colorado"
  | "Delaware"
  | "Florida"
  | "Georgia"
  | "Idaho"
  | "Illinois"
  | "Indiana"
  | "Iowa"
  | "Kansas"
  | "Kentucky"
  | "Louisiana"
  | "Maine"
  | "Maryland"
  | "Massachusetts"
  | "Michigan"
  | "Minnesota"
  | "Mississippi"
  | "Missouri"
  | "Montana"
  | "Nebraska"
  | "Nevada"
  | "New Hampshire"
  | "New Jersey"
  | "New Mexico"
  | "New York"
  | "North Carolina"
  | "Ohio"
  | "Oklahoma"
  | "Oregon"
  | "Pennsylvania"
  | "Rhode Island"
  | "South Carolina"
  | "Tennessee"
  | "Texas"
  | "Utah"
  | "Vermont"
  | "Virginia"
  | "Washington"
  | "Wisconsin"
  | "Wyoming";

export interface CoffeeRoaster {
  name: string;
  state: USState;
  address: string;
  website: string;
}

declare const roasters: CoffeeRoaster[];

export default roasters;
