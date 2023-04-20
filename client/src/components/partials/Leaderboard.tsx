import { Fragment } from "react";
import { Box, Card, CardActions, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks/redux";

type LeadershipProps = {
    gameId: string
}

export const Leaderboard = ({ gameId }: LeadershipProps) => {

    const { t } = useTranslation();

    const { user, isAuth } = useAppSelector(state => state.auth);
    const { scores, userScores } = useAppSelector(state => state.game);

    return (
        <Card sx={{ height: 'fit-content', width: '260px' }}>
            <CardHeader title={t("Leaderboard")} subheader={t("region: ") + (user.region || 'Europe')} />
            <Divider />
            <CardContent>
                {scores.filter(score => score.gameId === gameId).map(score => (
                    <Fragment key={score.id}>
                        <Box
                            sx={{
                                height: '34px',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography>{score.user?.nickname + ": "}</Typography>
                            <Typography>{score.score}</Typography>
                        </Box>
                        <Divider sx={{ my: '2px' }} />
                    </Fragment>
                ))}
                {!scores.filter(score => score.gameId === gameId).length
                    ?
                    <Typography>
                        {t('No one from your region has set a record yet')}
                        <SentimentVeryDissatisfiedIcon />
                    </Typography>
                    :
                    ""
                }
            </CardContent>
            {isAuth && (
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>{t("Your score: ")}</Typography>
                    <Typography>{userScores.find(score => score.gameId === gameId)?.score || 0}</Typography>
                </CardActions>
            )}
        </Card>
    )
}
