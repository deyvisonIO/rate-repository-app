import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import { Navigate, Route, Routes } from 'react-router-native';
import AppBar from './AppBar.jsx';
import SignIn from './SignIn.jsx';
import SignOut from './SignOut.jsx';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />}/>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/sign-out" element={<SignOut />}/>
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </View>
  );
};


export default Main;
