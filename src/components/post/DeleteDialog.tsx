import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import { GridRowParams } from '@mui/x-data-grid'
import React from 'react'

type Props = {
  open: boolean
  deleteTargetParams: GridRowParams
  onClose: () => void
  clickDelete: (params: GridRowParams) => void
}

const DeleteDialog = ({ onClose, clickDelete, open, deleteTargetParams }: Props) => {
  const handleClose = () => {
    onClose()
  }

  const handleDelete = () => {
    clickDelete(deleteTargetParams)
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>「{deleteTargetParams.row.anime_name}」を削除しますか？</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>戻る</Button>
        <Button onClick={handleDelete}>削除</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog
