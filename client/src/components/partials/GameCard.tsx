import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { Game } from "../../models/entities"

type GameCardProps = {
    game: Game
}

export const GameCard = ({ game }: GameCardProps) => {
    return (
        <Card>
            <CardHeader title={'Doodle Jump'} subheader="click to play" />
            <CardMedia
                component="img"
                height="240px"
                width="320px"
                image={`../../../public/games/${game.id}/preview.jpg`}
                alt="preview"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {game.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    component={Link}
                    to={"/games/" + game.id}
                    variant="contained"
                >
                    Go game
                </Button>
            </CardActions>
        </Card>
    )
}
