'use client'

import {CircularProgress, Stack, styled} from "@mui/material";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";
import AppStorage from "utils/storage";

const LoadingWrapper = styled(Stack)(() => ({
    width: '100vw',
    height: '100vh'
}));

export default function Dashboard() {
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {
        if (params.get('token')) {
            AppStorage.setItem('x-token', params.get('token'));
            router.push('/app');
        }
    }, [params, router]);

    return (
        <LoadingWrapper justifyContent="center" alignItems="center">
            <CircularProgress/>
        </LoadingWrapper>
    )
}