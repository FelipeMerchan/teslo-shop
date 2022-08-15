import useSWR, { SWRConfiguration } from 'swr';

import { IProduct } from '../interfaces';

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
    /* En el caso de los intervalos, useSWR tiene internamente un useEffect que
    cuando nosotros destruimos un componente donde esta siendo utilizado va
    a hacer la limpieza del mismo: */
    const { data, error } = useSWR<IProduct[]>(`/api${url}`, config);

    return {
        productList: data || [],
        isLoading: !error && !data,
        isError: error,
    }
}