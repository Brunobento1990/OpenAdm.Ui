import { useRouter } from "next/router";
import { useRouter as useRouterQuery } from 'next/router'

export function useNavigateApp() {
    const router = useRouter();
    const { query } = useRouterQuery();

    function navigate(url?: string) {
        if (url) {
            router.replace(url);
        }
    }

    return {
        navigate,
        id: query.id as string ?? '',
        query
    }
}