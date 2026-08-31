import { useCallback, useEffect, useState } from "react";
import { supabase } from "../supabase/Client";

type Withid = {
  id: number;
};

export const useSupabaseCRUD = <T extends Withid>(tableName: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async (): Promise<T[]> => {
    const { data, error } = await supabase.from(tableName).select("*");

    if (error) {
      console.log(error);
      return [];
    }

    return (data || []) as T[];
  }, [tableName]);

  const refresh = useCallback(async () => {
    setLoading(true);
    const newData = await fetchAll();
    setData(newData);
    setLoading(false);
  }, [fetchAll]);

  useEffect(() => {
    let cancelld = false;
    (async () => {
      setLoading(true);
      const newData = await fetchAll();
      if (!cancelld) {
        setData(newData);
        setLoading(false);
      }
    })();
    return () => {
      cancelld = true;
    };
  }, [fetchAll]);

  const insert = async(payload: Partial<T>) =>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {error} = await supabase.from(tableName).insert(payload as any)
    if (error){
      console.log(error)
      setLoading(false)
      return {error}
    }
    await refresh()
    return {error: null}
  }

  const update = async(id: number, payload: Partial<T>) =>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {error} = await supabase.from(tableName).update(payload as any).eq("id", id)
    if (error){
      console.log(error)
      setLoading(false)
      return {error}
    }
    await refresh()
    return {error:null}
  }

  const remove = async(id:number) =>{
    const {error} = await supabase.from(tableName).delete().eq("id", id)
    if (error){
      console.log(error)
      setLoading(false)
      return {error}
    }
    await refresh()
    return {error:null}
  }

  return {data, loading, insert, update, remove};
};

