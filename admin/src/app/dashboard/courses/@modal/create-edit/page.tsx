'use client';

import { Box, Modal, Paper, Typography } from '@mui/material';

export default function CreateCourseModal() {
  return (
    <Modal open>
      <Box maxWidth={600}>
        <Paper>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Paper>
      </Box>
    </Modal>
  );
}
