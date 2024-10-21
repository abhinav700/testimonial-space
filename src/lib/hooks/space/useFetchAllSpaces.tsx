import { Space } from "@/lib/schemas/schema";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { z } from "zod";

export const EmailSchema = z.string().email("Invalid email");

const useFetchAllSpaces = (email: string | undefined) => {
  const [spaces, setSpaces] = useState<Space[] | null>([]);

  const fetchAllSpace = useCallback(async () => {
    try {
      const response = await axios.get(
        `api/space/fetchAll?email=${EmailSchema.parse(email)}`
      );
      const { spaces } = await response.data;

      setSpaces(spaces);
    } catch (error) {
      console.log(error);
    }
    return;
  }, [email]);

  useEffect(() => {
    if (!email) return;
    fetchAllSpace();
  }, [email]);

  return spaces;
};

export default useFetchAllSpaces;
