import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  CardActions, 
  Button,
  IconButton
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon 
} from '@mui/icons-material';
import { List } from '../../types';

interface ListCardProps {
  list: List;
  onEdit: (list: List) => void;
  onDelete: (listId: string) => void;
  onSelect: (list: List) => void;
}

const ListCard: React.FC<ListCardProps> = ({ 
  list, 
  onEdit, 
  onDelete, 
  onSelect 
}) => {
  return (
    <Card>
      <CardContent>
        <Typography 
          variant="h6" 
          sx={{ 
            color: list.color,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {list.title}
          <div>
            <IconButton 
              size="small" 
              onClick={() => onEdit(list)}
              sx={{ mr: 1 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={() => onDelete(list.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          color="primary" 
          onClick={() => onSelect(list)}
        >
          Abrir Lista
        </Button>
      </CardActions>
    </Card>
  );
};

export default ListCard;
