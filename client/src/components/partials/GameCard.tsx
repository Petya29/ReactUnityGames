import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Game } from "../../models/entities"
import { useHover } from "../../hooks/user-hover"

type GameCardProps = {
    game: Game
}

export const GameCard = ({ game }: GameCardProps) => {

    const { t } = useTranslation();

    const { hovered, ref: hoverRef } = useHover();

    return (
        <Card>
            <CardHeader title={game.name} subheader={t("Hover to preview")} />
            <Box ref={hoverRef} sx={{ display: "flex", justifyContent: "center" }}>
                {hovered
                    ?
                    <CardMedia
                        sx={{
                            height: "240px",
                            width: "340px"
                        }}
                        component="video"
                        image={`/games/${game.id}/preview.mp4`}
                        autoPlay
                        muted
                        loop
                    />
                    :
                    <CardMedia
                        sx={{
                            height: "240px",
                            width: "340px"
                        }}
                        component="img"
                        image={`/games/${game.id}/preview.jpg`}
                        alt="preview"
                    />
                }
            </Box>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {game.description}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button
                    component={Link}
                    to={"/games/" + game.id}
                    variant="contained"
                >
                    {t("Go game")}
                </Button>
            </CardActions>
        </Card>
    )
}
