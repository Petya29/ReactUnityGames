import { Box } from "@mui/material"
import { Link } from "react-router-dom"
import { gamesIds } from "../../utils/gamesConfig"

export const GamesList = () => {
  return (
    <Box>
        {gamesIds.map(gameId => (
            <Link to={'/games/' + gameId} key={gameId}>{gameId}</Link>
        ))}
    </Box>
  )
}
