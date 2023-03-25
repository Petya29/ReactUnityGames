import { useEffect } from "react";
import { Box } from "@mui/material";
import { Unity, useUnityContext } from "react-unity-webgl";

export const Game = () => {

    const { unityProvider, UNSAFE__detachAndUnloadImmediate } = useUnityContext({
        loaderUrl: "../../../public/games/DoodleJump/Dip.loader.js",
        dataUrl: "../../../public/games/DoodleJump/Dip.data",
        frameworkUrl: "../../../public/games/DoodleJump/Dip.framework.js",
        codeUrl: "../../../public/games/DoodleJump/Dip.wasm",
    });

    useEffect(() => {
        return () => {
            UNSAFE__detachAndUnloadImmediate();
        }
    }, [UNSAFE__detachAndUnloadImmediate]);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Unity unityProvider={unityProvider} style={{ width: 800, height: 600 }} />
        </Box>
    )
}
