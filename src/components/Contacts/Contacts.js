import PropTypes from 'prop-types';
import { Box } from 'components/Box';
import { DeleteContact } from './Contacts.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';
import { deleteContact } from 'redux/contactsSlice';


export const Contacts = ({ title }) => {
    const dispatch = useDispatch();
    const contacts = useSelector(getContacts);
    const filter = useSelector(getFilter);


    const visibleContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))

    const renderContacts = () => {
        
        return  visibleContacts.map(contact => {
                const { id, name, number } = contact
                return (
                    <Box as="li" display="flex" mb={3} p={2} width="250px" borderRadius="16px"
                        justifyContent="space-between" border="1px dashed black"
                        key={id}><div>{name}: {number}</div><DeleteContact onClick={() => dispatch(deleteContact(id))}>X</DeleteContact></Box>
                )
            })
    }


    return (
        <Box px={4} >
            <h2>{title}</h2>

            <Box display="inline-flex"
                flexDirection="column"
                gridGap={3} p={3} mt={3}
                border="1px solid black">
                <label htmlFor='filter'>Find contacts by name</label>
                <input type="text" name="filter" onChange={(e) => dispatch(setFilter(e.target.value))}></input>
            </Box>
            
            <Box as="ul" mt={4}>
                {renderContacts()}
            </Box>
        </Box>
    )
}

Contacts.propType = {
    title: PropTypes.string.isRequired,
}