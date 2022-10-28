import { useState, useEffect } from 'react';
import { closestBranchesTo } from '../src/distances';
import { SearchLocation } from '../src/SearchLocation';
import { Branch } from '../src/Branch';

export default function useClosestBranch(branches: undefined | Branch[] , search: SearchLocation) {
  const [closestBranch, setClosestBranch] = useState<any>();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (branches && typeof search === 'object' && !dataLoaded) {
      const branchList = closestBranchesTo(5, search, branches);
      setClosestBranch(branchList);
      setDataLoaded(true);
    }
  }, [search, branches, closestBranch]);
  return closestBranch as [typeof branches];
}
