import { Fragment } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

export const LoadingScreen = () => {
  return (
    <Box
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#121212',
        color: 'white'
      }}
    >
      <Box
        style={{
          position: 'absolute',
          left: '50%',
          top: '40%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <Fragment>
          <Typography variant='h4'>
            PAKY
          </Typography>
          <Box>
            Made by Petro Avramenko and Kolesnichenko Yehor
          </Box>
        </Fragment>
        <LinearProgress
          style={{ marginTop: '24px' }}
        />
      </Box>
    </Box>
  )
}
