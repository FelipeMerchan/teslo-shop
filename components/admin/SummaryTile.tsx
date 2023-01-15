import { FC } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

interface Props {
  icon: JSX.Element;
  subTitle: string;
  title: string | number;
}

export const SummaryTile:FC<Props> = ({ title, subTitle, icon }) => {
  return (
    <Grid
      item
      xs={12}
      sm={4}
      md={3}
    >
      <Card sx={{ display: 'flex' }} elevation={4}>
        <CardContent
          sx={{
            width: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {icon}
        </CardContent>
        <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h3'>
            {title}
          </Typography>
          <Typography variant='caption'>
            {subTitle}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
};
