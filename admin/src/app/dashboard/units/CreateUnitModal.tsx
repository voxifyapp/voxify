'use client';

import ClientModal from '@/lib/components/ClientModal';
import { Dispatch, SetStateAction } from 'react';

export default function CreateUnitModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose?: () => void;
}) {
  return (
    <ClientModal open={open} onClose={onClose}>
      <h1>Test</h1>
    </ClientModal>
  );
}
