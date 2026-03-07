export const BRANCHES = [
  {
    id: "kota-damansara",
    name: "Kota Damansara",
    address: "Kota Damansara, Petaling Jaya, Selangor",
    googleMapLink: "https://www.google.com/maps/search/?api=1&query=3.1579,101.7121",
  },
  {
    id: "maluri-cheras",
    name: "Maluri Cheras",
    address: "Maluri, Cheras, Kuala Lumpur",
    googleMapLink: "https://www.google.com/maps/search/?api=1&query=3.1167,101.6839",
  },
  {
    id: "setia-alam",
    name: "Setia Alam",
    address: "Setia Alam, Shah Alam, Selangor",
    googleMapLink: "https://www.google.com/maps/search/?api=1&query=3.1320,101.6775",
  },
  {
    id: "puchong",
    name: "Puchong",
    address: "Puchong, Selangor",
    googleMapLink: "https://www.google.com/maps/search/?api=1&query=3.0738,101.5183",
  },
];

export function getBranchByName(name) {
  return BRANCHES.find((branch) => branch.name === name);
}
