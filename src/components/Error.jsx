import React from 'react';
import { Typography, Button } from '@material-ui/core';

export default function Error() {
  return (
      <>
        <Typography>Something went wrong</Typography>
        <Button
          variant="contained"
          color="primary"
        >
  Retry
        </Button>
      </>
  );
}
