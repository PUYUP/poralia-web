import * as React from 'react';
import Chip from '@mui/material/Chip';
import { useAppDispatch } from '../../lib/hooks';
import { setTagFiltered, removeTagFiltered } from './Slice';
import { useDispatch } from 'react-redux';

const TagItem = (props: any) => {
	const dispatch = useDispatch()

	const handleClick = () => {
		dispatch(setTagFiltered({
			...props,
			selected: true,
		}))
	}

	const handleDelete = () => {
		dispatch(removeTagFiltered({
			...props
		}))
	}

	return (
		<>
			{!props.selected ? (
				<Chip 
					label={props.name} 
					variant='outlined' 
					onClick={handleClick} 
				/>
			) : (
				<Chip 
				label={props.name} 
					variant='filled' 
					onDelete={handleDelete}
				/>
			)}
			
		</>
	)
}

export default TagItem