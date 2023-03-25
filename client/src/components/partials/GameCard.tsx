import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import { Link } from "react-router-dom"

type GameCardProps = {
    gameId: string
}

export const GameCard = ({ gameId }: GameCardProps) => {
    return (
        <Card>
            <CardHeader title={'Doodle Jump'} subheader="click to play" />
            <CardMedia
                component="img"
                height="240px"
                width="320px"
                image={`../../../public/games/${gameId}/preview.jpg`}
                alt="preview"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Description
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    component={Link}
                    to={"/games/" + gameId}
                    variant="contained"
                >
                    Go game
                </Button>
            </CardActions>
        </Card>
    )
}
