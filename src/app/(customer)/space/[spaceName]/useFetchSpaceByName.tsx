import { SpaceSchema, SpaceType } from "@/lib/schemas/schema";
import axios from "axios";
import React from "react";
import { useCallback, useEffect, useState } from "react";

interface useFetchSpaceByNameProps{
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  spaceName: string;
}

const useFetchSpaceByName = ({setLoading, spaceName}: useFetchSpaceByNameProps) => {
  const [space, setSpace] = useState<SpaceType | null>(null);

  const fetchSpaceByName = useCallback(
    async (spaceName: string) => {
      try {
        const response = await axios.get(
          `/api/space/fetchByName?spaceName=${spaceName}`
        );

        const { space } = await response.data;

        if (space) setSpace((prevSpace: any) => SpaceSchema.parse(space));
      } catch (error) {
        alert("Some error occured");
        // console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [spaceName]
  );

  useEffect(() => {
    fetchSpaceByName(spaceName);
  }, [spaceName]);

  return {space, setSpace};
};

export default useFetchSpaceByName;
