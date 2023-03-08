import * as React from 'react'
import {
  DataGrid,
  GridRenderCellParams,
  GridColumns,
  GridRowsProp,
  GridActionsCellItem,
  GridRowParams,
} from '@mui/x-data-grid'
import { Post, PostPostBody, PostPutBody } from "@/types/post";
import { Rating, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import AddDialog from '@/components/AddDialog'
import DeleteDialog from '@/components/DeleteDialog'
import { deletePost, getPostById, postPost, putPost } from "@/libs/apiCall/post/postClient";
import { getToday } from '@/utils'
import EditDialog from '@/components/EditDialog'

type Props = {
  initialRows: Post[]
}

const PostTable = ({ initialRows }: Props) => {
  const [rows, setRows] = React.useState<Post[]>(initialRows)
  const [openAddDialog, setOpenAddDialog] = React.useState<boolean>(false)
  const [openEditDialog, setOpenEditDialog] = React.useState<boolean>(false)
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState<boolean>(false)
  const [editTargetParams, setEditTargetParams] = React.useState<GridRowParams>()
  const [deleteTargetParams, setDeleteTargetParams] = React.useState<GridRowParams>()

  const handleAddClick = () => {
    setOpenAddDialog(true)
  }

  const handleEditClick = (params: GridRowParams) => {
    setEditTargetParams(params)
    setOpenEditDialog(true)
  }

  const handleDeleteClick = (params: GridRowParams) => {
    setDeleteTargetParams(params)
    setOpenDeleteDialog(true)
  }

  const handlePostPost = async (body: PostPostBody) => {
    const response = await postPost(body)
    const { id, anime_name, rating } = response
    setRows((oldRows: GridRowsProp) => [
      { id: id, created_at: getToday(), anime_name: anime_name, rating: rating },
      ...oldRows,
    ])
  }

  const handleEditPost = async (params: GridRowParams, body: PostPutBody) => {
    await putPost(params.row.id, body)
    const updated = await getPostById(params.row.id)
    const { anime_name, rating } = updated
    const newRow = rows.map((row) => {
      if (row.id === params.id) {
        return { id: row.id, created_at: row.created_at, anime_name: anime_name, rating: rating }
      } else {
        return row
      }
    })
    setRows(newRow)
  }

  const handleDeletePost = async (params: GridRowParams) => {
    await deletePost(params.row.id)
    setRows(rows.filter((row) => row.id !== params.id))
  }

  const handleDialogClose = () => {
    setOpenAddDialog(false)
    setOpenEditDialog(false)
    setOpenDeleteDialog(false)
  }

  const columns: GridColumns = [
    { field: 'id', type: 'string', hide: true },
    {
      field: 'created_at',
      type: 'string',
      headerName: '登録日',
      width: 130,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'anime_name',
      type: 'string',
      headerName: 'タイトル',
      width: 190,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      flex: 2,
      minWidth: 150,
    },
    {
      field: 'rating',
      type: 'number',
      headerName: '評価',
      renderCell: (params: GridRenderCellParams<number>) => {
        return <Rating readOnly value={params.value} />
      },
      width: 170,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'edit',
      type: 'actions',
      headerName: '編集',
      width: 70,
      flex: 0.5,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={params.id}
          icon={<EditIcon />}
          label='Edit'
          onClick={() => handleEditClick(params)}
        />,
      ],
    },
    {
      field: 'delete',
      type: 'actions',
      headerName: '削除',
      width: 70,
      flex: 0.5,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={params.id}
          icon={<DeleteIcon />}
          label='Delete'
          onClick={() => handleDeleteClick(params)}
        />,
      ],
    },
  ]

  return (
    <div style={{ width: '100%' }}>
      <Button color='primary' startIcon={<AddIcon />} onClick={handleAddClick}>
        新規
      </Button>
      <DataGrid
        sx={{
          border: 'hidden',
          marginBottom: '50px',
        }}
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[10, 50, 100]}
        autoHeight
      />
      {openAddDialog && <AddDialog open={openAddDialog} onClose={handleDialogClose} clickAdd={handlePostPost} />}
      {openDeleteDialog && deleteTargetParams !== undefined && (
        <DeleteDialog
          open={openDeleteDialog}
          onClose={handleDialogClose}
          clickDelete={handleDeletePost}
          deleteTargetParams={deleteTargetParams}
        />
      )}
      {openEditDialog && editTargetParams !== undefined && (
        <EditDialog
          open={openEditDialog}
          onClose={handleDialogClose}
          clickEdit={handleEditPost}
          editTargetParams={editTargetParams}
        />
      )}
    </div>
  )
}

export default PostTable
