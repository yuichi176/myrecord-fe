import { Button, Dialog, DialogActions, DialogContent, TextField, Rating, Typography } from '@mui/material'
import React from 'react'
import { PostPostBody } from '@/types/post'
import { useSession } from 'next-auth/react'

type Props = {
  open: boolean
  onClose: () => void
  clickAdd: (body: PostPostBody) => void
}

const AddDialog = ({ onClose, clickAdd, open }: Props) => {
  const { data: session } = useSession()
  const userEmail = session?.user?.email != null ? session?.user?.email : ''

  const [rating, setRating] = React.useState<number | null>(0)
  const [animeName, setAnimeName] = React.useState<string | null>('')

  const handleClose = () => {
    onClose()
  }

  const handleAdd = () => {
    const body: PostPostBody = {
      user: userEmail,
      animeName: animeName,
      rating: rating,
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
          onChange={(event, newValue: number | null) => {
            setRating(newValue)
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
