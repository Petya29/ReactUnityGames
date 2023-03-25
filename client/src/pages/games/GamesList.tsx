import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { GameCard } from "../../components/partials/GameCard";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getGames } from "../../store/slices/gameSlice";
import { setSnackbar } from "../../store/slices/utilsSlice";

export const GamesList = () => {

  const dispatch = useAppDispatch();

  const { games } = useAppSelector(state => state.game);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!games || !games.length) {
      setIsLoading(true);
      dispatch(getGames())
        .unwrap()
        .catch(() => {
          dispatch(setSnackbar({
            open: true,
            severity: 'error',
            text: 'Unexpected error'
          }));
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "40px",
        marginTop: "40px"
      }}
    >
      {isLoading
        ?
        <Box sx={{
          height: "40vh",
          display: "flex",
          alignItems: "flex-end"
        }}>
          <CircularProgress />
        </Box>
        :
        games.map(game => (
          <GameCard game={game} key={game.id} />
        ))
      }
    </Box>
  )
}
