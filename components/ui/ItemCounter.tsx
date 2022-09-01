import { FC, useMemo } from 'react';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

interface Props {
  currentValue: number;
  maxValue: number;

  //Methods
  updateQuantity: (newQuantity: number) => void;
}

export const ItemCounter: FC<Props> = ({ currentValue, maxValue, updateQuantity }) => {
  const addOrRemove = (value: number) => {
    if (value === -1) {
      if (currentValue === 1) return;

      return updateQuantity(currentValue - 1);
    }

    if (currentValue >= maxValue) return;

    updateQuantity(currentValue + 1);
  };

  const isMinimumAmount = useMemo(() => currentValue === 1, [currentValue]);
  const isMaximumStock = useMemo(() => currentValue >= maxValue, [currentValue]);

  return (
    <Box display='flex' alignItems='center'>
        <IconButton onClick={() => addOrRemove(-1)} disabled={isMinimumAmount}>
            <RemoveCircleOutline />
        </IconButton>
        <Typography sx={{ width: 40, textAlign: 'center' }}>{currentValue}</Typography>
        <IconButton onClick={() => addOrRemove(+1)} disabled={isMaximumStock}>
            <AddCircleOutline />
        </IconButton>
    </Box>
  )
}
