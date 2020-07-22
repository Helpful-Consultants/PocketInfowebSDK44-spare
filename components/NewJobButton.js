import React from 'react';
import { Platform } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Colors from '../constants/Colors';

// Call as <NewJobButton setIsModalVisible={setIsModalVisible} />
// Needs this function in the props
// const [isModalVisible, setIsModalVisible] = useState(false);

export default NewJobButton = ({ setIsModalVisible }) => (
  <Button
    title='Add new job'
    onPress={() => {
      setIsModalVisible(true);
    }}
    titleStyle={{ fontSize: 10 }}
    buttonStyle={{
      height: 30,
      marginBottom: 2,
      marginTop: 2,
      marginLeft: 15,
      marginRight: 15,
      borderRadius: 20,
      backgroundColor: Colors.vwgDeepBlue,
    }}
    icon={
      <Icon
        name={
          Platform.OS === 'ios' ? 'add-circle-outline' : 'add-circle-outline'
        }
        size={15}
        color='white'
      />
    }
  />
);
