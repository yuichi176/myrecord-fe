import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material'
import { CollectionPostBody } from '@/types/collection/form'

type Props = {
  isOpen: boolean
  onClose: () => void
  clickAdd: (body: CollectionPostBody) => void
  user: string
}

const AddDialog = ({ onClose, clickAdd, isOpen, user }: Props) => {
  const [name, setName] = React.useState<string>('')

  const handleClose = () => {
    onClose()
  }

  const handleAdd = () => {
    const body: CollectionPostBody = {
      name: name,
      user: user,
    }
    clickAdd(body)
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          label='コレクション名'
          variant='standard'
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value)
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>戻る</Button>
        <Button onClick={handleAdd}>登録</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddDialog
