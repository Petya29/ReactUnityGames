import { Box } from "@mui/material";
import { GameCard } from "../../components/partials/GameCard";
import { gamesIds } from "../../utils/gamesConfig";

export const GamesList = () => {
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
      {gamesIds.map(gameId => (
        <GameCard gameId={gameId} key={gameId} />
      ))}
    </Box>
  )
}
