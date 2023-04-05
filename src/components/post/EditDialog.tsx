import { Button, Dialog, DialogActions, DialogContent, TextField, Rating, Typography } from '@mui/material'
import { GridRowParams } from '@mui/x-data-grid'
import React from 'react'
import { PostPutBody } from '@/types/post'

type Props = {
  open: boolean
  editTargetParams: GridRowParams
  onClose: () => void
  clickEdit: (params: GridRowParams, body: PostPutBody) => void
  user: string
}

const EditDialog = ({ onClose, clickEdit, open, editTargetParams, user }: Props) => {
  const [rating, setRating] = React.useState<number>(editTargetParams.row.rating)
  const [animeName, setAnimeName] = React.useState<string>(editTargetParams.row.anime_name)

  const handleClose = () => {
    onClose()
  }

  const handleEdit = () => {
    const body: PostPutBody = {
      user: user,
      anime_name: animeName,
      rating: rating,
    }
    clickEdit(editTargetParams, body)
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant='subtitle1' gutterBottom component='p' pt={2}>
          評価
        </Typography>
        <Rating
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue as number)
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          label='タイトル'
          variant='standard'
          value={animeName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAnimeName(event.target.value)
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>戻る</Button>
        <Button onClick={handleEdit}>更新</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditDialog
