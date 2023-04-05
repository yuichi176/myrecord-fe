import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import React from 'react'
import { Collection } from '@/types/collection'

type Props = {
  isOpen: boolean
  collection: Collection
  onClose: () => void
  clickDelete: (id: Collection['id']) => void
}

const DeleteDialog = ({ onClose, collection, clickDelete, isOpen }: Props) => {
  const handleClose = () => {
    onClose()
  }

  const handleDelete = () => {
    clickDelete(collection.id)
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogContent>「{collection.name}」を削除しますか？</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>戻る</Button>
        <Button onClick={handleDelete}>削除</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog
