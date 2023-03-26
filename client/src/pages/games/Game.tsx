import { useEffect } from "react";
import { Box } from "@mui/material";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useParams } from "react-router-dom";

export const Game = () => {

    const params = useParams();

    const { unityProvider, UNSAFE__detachAndUnloadImmediate } = useUnityContext({
        loaderUrl: `../../../public/games/${params.gameId}/Dip.loader.js`,
        dataUrl: `../../../public/games/${params.gameId}/Dip.data`,
        frameworkUrl: `../../../public/games/${params.gameId}/Dip.framework.js`,
        codeUrl: `../../../public/games/${params.gameId}/Dip.wasm`,
    });

    const test = (e: any) => {
        console.log(e.detail);
    }

    useEffect(() => {
        return () => {
            UNSAFE__detachAndUnloadImmediate();
        }
    }, [UNSAFE__detachAndUnloadImmediate]);

    useEffect(() => {
        window.addEventListener('setScore', test);
        return () => {
            window.removeEventListener('setScore', test);
        }
    }, []);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Unity unityProvider={unityProvider} style={{ width: 800, height: 600 }} />
        </Box>
    )
}
