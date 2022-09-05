import { Grid, Typography } from "@mui/material";

export const OrderSummary = () => {
  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography>No. de productos</Typography>
        </Grid>
        <Grid
            item
            xs={6}
            display='flex'
            justifyContent='end'
        >
            <Typography>3</Typography>
        </Grid>

        {/* SubTotal */}
        <Grid item xs={6}>
            <Typography>SubTotal</Typography>
        </Grid>
        <Grid
            item
            xs={6}
            display='flex'
            justifyContent='end'
        >
            <Typography>{`$${155.36}`}</Typography>
        </Grid>

        {/* Impuestos */}
        <Grid item xs={6}>
            <Typography>Impuestos (15%)</Typography>
        </Grid>
        <Grid
            item
            xs={6}
            display='flex'
            justifyContent='end'
        >
            <Typography>{`$${35}`}</Typography>
        </Grid>

        {/* Total */}
        <Grid item xs={6} sx={{ mt: 2 }}>
            <Typography variant='subtitle1'>Total:</Typography>
        </Grid>
        <Grid
            item
            xs={6}
            display='flex'
            justifyContent='end'
        >
            <Typography variant='subtitle1' sx={{ mt: 2 }}>{`$${187.36}`}</Typography>
        </Grid>
    </Grid>
  )
};
