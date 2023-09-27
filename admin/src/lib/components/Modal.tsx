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

export default function Modal(props: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <MuiModal onClose={() => router.back()} open>
      <Box sx={style}>{props.children}</Box>
    </MuiModal>
  );
}
