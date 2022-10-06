import * as Location from 'expo-location';
import { Branch } from './Branch';

type Coordinate = {
  latitude: number;
  longitude: number;
};

const MAXIMUM_DISTANCE = 90 * 90 + 180 * 180;

// https://stackoverflow.com/a/65799152/5225716
function distanceBetween(coord1: Coordinate, coord2?: Coordinate) {
  if (!coord2) {
    return MAXIMUM_DISTANCE;
  }
  if (
    coord1.latitude == coord2.latitude &&
    coord1.longitude == coord2.longitude
  ) {
    return 0;
  }

  const radlat1 = (Math.PI * coord1.latitude) / 180;
  const radlat2 = (Math.PI * coord2.latitude) / 180;
  const theta = coord1.longitude - coord2.longitude;
  const radtheta = (Math.PI * theta) / 180;

  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344; //convert miles to km

  return dist;
}

export function branchLocation(branch: Branch) {
  if (!branch.PostalAddress.GeoLocation) return undefined;
  return {
    latitude: parseFloat(
      branch.PostalAddress.GeoLocation.GeographicCoordinates.Latitude,
    ),
    longitude: parseFloat(
      branch.PostalAddress.GeoLocation.GeographicCoordinates.Longitude,
    ),
  };
}

type BranchWithDistance = {
  branch: Branch;
  distance: number;
};

const branchWithDistanceFrom =
  (location: Location.LocationGeocodedLocation) =>
  (branch: Branch): BranchWithDistance => ({
    branch,
    distance: distanceBetween(location, branchLocation(branch)),
  });

const sortBranchesByDistance = (a: BranchWithDistance, b: BranchWithDistance) =>
  a.distance < b.distance ? -1 : 1;

const branchWithoutDistance = (branch: BranchWithDistance) => branch.branch;

export function closestBranchesTo(
  numberOfBranches: number,
  location: Location.LocationGeocodedLocation,
  branches: Branch[],
) {
  return branches
    .map(branchWithDistanceFrom(location))
    .sort(sortBranchesByDistance)
    .map(branchWithoutDistance)
    .slice(0, numberOfBranches);
}
