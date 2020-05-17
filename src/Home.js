import React from 'react';
import UserCard from './UserCard'
import { connect } from 'react-redux'
import { getUserList, filterUserList } from './redux/actions'
import MoonLoader from "react-spinners/MoonLoader";
import RadioButton from './RadioButton'

const Home = ({ dispatch, isLoading, userList, errorMessage, filteredUserList }) => {
    React.useEffect(() => {
        dispatch(getUserList())
    }, [dispatch])

    const [ageFilter, setAgeFilter] = React.useState(undefined);
    const [nameFilter, setNameFilter] = React.useState(undefined);

    React.useEffect(() => {
        dispatch(filterUserList(ageFilter, nameFilter, userList))
    }, [ageFilter, nameFilter])

    return (
        <div className="App">
            <header className="App-header">
                {isLoading && <div className="loading">
                    <MoonLoader
                        size={60}
                        loading
                    />
                </div>}
                {userList.length > 0 && <>
                    <label>Filter by Age</label>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                        <RadioButton radioText="None" id="ageGroup0" onChange={() => setAgeFilter('ageGroup0')} checked={ageFilter === 'ageGroup0'} />
                        <RadioButton radioText="0 - 9" id="ageGroup1" onChange={() => setAgeFilter('ageGroup1')} checked={ageFilter === 'ageGroup1'} />
                        <RadioButton radioText="10 - 19" id="ageGroup2" onChange={() => setAgeFilter('ageGroup2')} checked={ageFilter === 'ageGroup2'} />
                        <RadioButton radioText="20 - 29" id="ageGroup3" onChange={() => setAgeFilter('ageGroup3')} checked={ageFilter === 'ageGroup3'} />
                        <RadioButton radioText="30 - 39" id="ageGroup4" onChange={() => setAgeFilter('ageGroup4')} checked={ageFilter === 'ageGroup4'} />
                        <RadioButton radioText="40 - 49" id="ageGroup5" onChange={() => setAgeFilter('ageGroup5')} checked={ageFilter === 'ageGroup5'} />
                    </div>
                    <br />
                    <label>Filter by FullName length</label>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                        <RadioButton radioText="None" onChange={() => setNameFilter('lengthGroup0')} checked={nameFilter === 'lengthGroup0'} />
                        <RadioButton radioText="5" onChange={() => setNameFilter('lengthGroup1')} checked={nameFilter === 'lengthGroup1'} />
                        <RadioButton radioText="10" onChange={() => setNameFilter('lengthGroup2')} checked={nameFilter === 'lengthGroup2'} />
                        <RadioButton radioText="15" onChange={() => setNameFilter('lengthGroup3')} checked={nameFilter === 'lengthGroup3'} />
                    </div>
                    <br />
                </>}
                {filteredUserList && filteredUserList.map((userData, idx) => <UserCard firstName={userData.firstName} lastName={userData.lastName} age={userData.age} key={idx} />)}
            </header>
        </div >
    );
}

const mapStateToProps = state => ({
    isLoading: state.homeReducer.isLoading,
    userList: state.homeReducer.userList,
    filteredUserList: state.homeReducer.filteredUserList,
    errorMessage: state.homeReducer.errorMessage
})

export default connect(mapStateToProps)(Home);
