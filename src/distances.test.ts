import * as Location from 'expo-location';
import { closestBranchesTo } from './distances';
import { Branch } from './Branch';

describe('closestBranchesTo', () => {
  const location: Location.LocationGeocodedLocation = {
    latitude: 51.52578,
    longitude: -0.14051,
  };

  const branch1: Branch = {
    Identification: 'Branch1',
    SequenceNumber: '1',
    Type: 'Physical',
    CustomerSegment: ['Personal'],
    PostalAddress: {
      PostCode: 'MK5 6LA',
      GeoLocation: {
        GeographicCoordinates: {
          Latitude: '52.018181',
          Longitude: '-0.79136',
        },
      },
    },
  };

  const branch2: Branch = {
    Identification: 'Branch2',
    SequenceNumber: '2',
    Type: 'Physical',
    CustomerSegment: ['Corporate'],
    PostalAddress: {
      PostCode: '28660 Boadilla del Monte',
      GeoLocation: {
        GeographicCoordinates: {
          Latitude: '40.393318',
          Longitude: '-3.859050',
        },
      },
    },
  };

  const branch3: Branch = {
    ...branch1,
    Identification: 'Branch3',
    SequenceNumber: '3',
    PostalAddress: {
      PostCode: 'MK5 6LA',
      GeoLocation: {
        GeographicCoordinates: {
          Latitude: '52.118181',
          Longitude: '-0.89136',
        },
      },
    },
  };

  const branch4: Branch = {
    ...branch1,
    Identification: 'Branch4',
    SequenceNumber: '4',
    PostalAddress: {
      PostCode: 'MK5 6LA',
      GeoLocation: {
        GeographicCoordinates: {
          Latitude: '52.218181',
          Longitude: '-0.99136',
        },
      },
    },
  };

  const branch5: Branch = {
    ...branch1,
    Identification: 'Branch5',
    SequenceNumber: '5',
    PostalAddress: {
      PostCode: 'MK5 6LA',
      GeoLocation: {
        GeographicCoordinates: {
          Latitude: '52.318181',
          Longitude: '-1.09136',
        },
      },
    },
  };

  const branch6: Branch = {
    ...branch1,
    Identification: 'Branch6',
    SequenceNumber: '6',
    PostalAddress: {
      PostCode: 'MK5 6LA',
      GeoLocation: {
        GeographicCoordinates: {
          Latitude: '52.418181',
          Longitude: '-1.19136',
        },
      },
    },
  };

  it('should return an empty array for no branches', () => {
    expect(closestBranchesTo(5, location, [])).toEqual([]);
  });

  it('should return a single branch', () => {
    expect(closestBranchesTo(5, location, [branch1])).toEqual([branch1]);
  });

  it('should return the branches in closeness order', () => {
    expect(closestBranchesTo(5, location, [branch2, branch1])).toEqual([
      branch1,
      branch2,
    ]);
  });

  it('should return 5 branches in closeness order', () => {
    expect(
      closestBranchesTo(5, location, [
        branch5,
        branch2,
        branch3,
        branch1,
        branch6,
        branch4,
      ]),
    ).toEqual([branch1, branch3, branch4, branch5, branch6]);
  });
});
