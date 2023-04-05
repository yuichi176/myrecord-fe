import Layout from '@/components/Layout'
import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'
import * as React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Link from 'next/link'
import { deleteCollection, getCollection, postCollection } from '@/libs/apiCall/collection/collectionClient'
import { Collection } from '@/types/collection'
import { CollectionPostBody } from '@/types/collection/form'
import AddDialog from '@/components/collection/AddDialog'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteDialog from '@/components/collection/DeleteDialog'

type Props = {
  initial_collections: Collection[]
  user: string
}

const Collections = ({ initial_collections, user }: Props) => {
  const [collections, setCollections] = React.useState<Collection[]>(initial_collections)
  const [isAddDialog, setIsAddDialog] = React.useState<boolean>(false)
  const [isDeleteDialog, setIsDeleteDialog] = React.useState<boolean>(false)
  const [deleteTarget, setDeleteTarget] = React.useState<Collection>()

  const handleAddClick = () => {
    setIsAddDialog(true)
  }

  const handleDeleteClick = (collection: Collection) => {
    setDeleteTarget(collection)
    setIsDeleteDialog(true)
  }

  const handleCollectionPost = async (body: CollectionPostBody) => {
    const response = await postCollection(body)
    setCollections([...collections, response])
  }

  const handleCollectionDelete = async (id: Collection['id']) => {
    await deleteCollection(id)
    setCollections(collections.filter((collection) => collection.id !== id))
  }

  const handleDialogClose = () => {
    setIsAddDialog(false)
    setIsDeleteDialog(false)
  }

  return (
    <Layout title='myrecord' user={user}>
      <Container maxWidth='md' sx={{ flex: 1 }}>
        <Grid item xs={12} md={6}>
          <Button color='primary' startIcon={<CreateNewFolderIcon />} onClick={handleAddClick}>
            新規コレクション
          </Button>
          {collections?.length === 0 ? (
            <div className='mt-1 bg-[#c3c3c3] text-[#000000] p-[10px] rounded-md'>
              <p className='mb-1'>レコードを追加する前にまずコレクションを作成しましょう。</p>
              <p>例）映画、アニメ...</p>
            </div>
          ) : (
            <List sx={{ mt: 2 }}>
              {collections?.map((collection, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton edge='end' onClick={() => handleDeleteClick(collection)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                  disablePadding
                >
                  <div className='w-full'>
                    <Link href={`/${encodeURIComponent(collection.name)}/posts`}>
                      <ListItemButton>
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={collection.name} />
                      </ListItemButton>
                    </Link>
                  </div>
                </ListItem>
              ))}
            </List>
          )}
        </Grid>
        {isAddDialog && (
          <AddDialog isOpen={isAddDialog} onClose={handleDialogClose} clickAdd={handleCollectionPost} user={user} />
        )}
        {isDeleteDialog && deleteTarget !== undefined && (
          <DeleteDialog
            isOpen={isDeleteDialog}
            onClose={handleDialogClose}
            clickDelete={handleCollectionDelete}
            collection={deleteTarget}
          />
        )}
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const user = session?.user?.email
  const collections: Collection[] = !user ? [] : await getCollection({ user: user })
  return { props: { initial_collections: collections, user: user } }
}
export default Collections
