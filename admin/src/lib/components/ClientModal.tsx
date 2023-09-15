'use client';

import { Box, Modal as MuiModal } from '@mui/material';
import { useRouter } from 'next/navigation';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function ClientModal(props: {
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
}) {
  return (
    <MuiModal onClose={props.onClose} open={props.open}>
      <Box sx={style}>{props.children}</Box>
    </MuiModal>
  );
}
