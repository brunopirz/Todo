import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Button,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { firestoreService } from '../../services/FirestoreService';
import { List, DefaultLists } from '../../types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    const fetchLists = async () => {
      if (user) {
        const userLists = await firestoreService.getLists(user.uid);
        setLists(userLists);
      }
    };

    fetchLists();
  }, [user]);

  const handleCreateList = async () => {
    if (user) {
      const newListTitle = prompt('Nome da nova lista:');
      if (newListTitle) {
        const newList: Omit<List, 'id'> = {
          userId: user.uid,
          title: newListTitle,
          color: '#0078D4',
          createdAt: new Date()
        };

        const listId = await firestoreService.createList(newList);
        setLists([...lists, { ...newList, id: listId }]);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3 }}>
        Minhas Listas
      </Typography>

      <Grid container spacing={2}>
        {lists.map(list => (
          <Grid item xs={12} sm={6} md={4} key={list.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ color: list.color }}>
                  {list.title}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Abrir Lista
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} sm={6} md={4}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100%' 
            }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleCreateList}
              >
                Criar Nova Lista
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
