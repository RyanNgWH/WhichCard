/**
 * Icons for the application
 *
 * @format
 */

import {TextStyle} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import ZocialIcon from 'react-native-vector-icons/Zocial';

type iconProps = {
  name: string;
  size: number;
  color: string;
  style?: TextStyle;
  source:
    | 'AntDesign'
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'Fontisto'
    | 'Foundation'
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'Octicons'
    | 'SimpleLineIcons'
    | 'Zocial';
};

const sources = {
  AntDesign: AntDesignIcon,
  Entypo: EntypoIcon,
  EvilIcons: EvilIconsIcon,
  Feather: FeatherIcon,
  FontAwesome: FontAwesomeIcon,
  FontAwesome5: FontAwesome5Icon,
  Fontisto: FontistoIcon,
  Foundation: FoundationIcon,
  Ionicons: IoniconsIcon,
  MaterialCommunityIcons: MaterialCommunityIconsIcon,
  MaterialIcons: MaterialIconsIcon,
  Octicons: OcticonsIcon,
  SimpleLineIcons: SimpleLineIconsIcon,
  Zocial: ZocialIcon,
};

function Icon(props: iconProps) {
  const IconComponent = sources[props.source];
  return <IconComponent {...props} />;
}

export default Icon;
