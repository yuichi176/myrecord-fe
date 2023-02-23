import { Button, Dialog, DialogActions, DialogContent, TextField, Rating, Typography } from '@mui/material'
import { GridRowParams } from '@mui/x-data-grid'
import React from 'react'
import { PostPatchBody } from '@/types/post'
import { useSession } from 'next-auth/react'

type Props = {
  open: boolean
  editTargetParams: GridRowParams
  onClose: () => void
  clickEdit: (params: GridRowParams, body: PostPatchBody) => void
}

const EditDialog = ({ onClose, clickEdit, open, editTargetParams }: Props) => {
  const { data: session } = useSession()
  const userEmail = session?.user?.email != null ? session?.user?.email : ''

  const [rating, setRating] = React.useState<number | null>(editTargetParams.row.rating)
  const [animeName, setAnimeName] = React.useState<string | null>(editTargetParams.row.animeName)

  const handleClose = () => {
    onClose()
  }

  const handleEdit = () => {
    const body: PostPatchBody = {
      id: editTargetParams.row.id,
      user: userEmail,
      animeName: animeName,
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
        <Button onClick={handleEdit}>更新</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditDialog
