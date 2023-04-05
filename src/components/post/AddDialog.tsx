import { Button, Dialog, DialogActions, DialogContent, TextField, Rating, Typography } from '@mui/material'
import React from 'react'
import { PostPostBody } from '@/types/post'

type Props = {
  open: boolean
  onClose: () => void
  clickAdd: (body: PostPostBody) => void
  user: string
  collection_name: string
}

const AddDialog = ({ onClose, clickAdd, open, user, collection_name }: Props) => {
  const [rating, setRating] = React.useState<number>(0)
  const [animeName, setAnimeName] = React.useState<string>('')

  const handleClose = () => {
    onClose()
  }

  const handleAdd = () => {
    const body: PostPostBody = {
      user: user,
      anime_name: animeName,
      rating: rating,
      collection_name: collection_name,
    }
    clickAdd(body)
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
        <Button onClick={handleAdd}>登録</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddDialog
