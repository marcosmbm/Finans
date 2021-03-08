
import styled from 'styled-components/native';

export const PickerView = styled.View`
margin-top: 20px;
width: 80%;
border-radius: 7px;
background-color: #f2f2f2;
`;

export const ButtonAdd = styled.TouchableOpacity`
    margin-top: 20px;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.Button};
    margin-left: 10px;
    border-radius: 6px;
    height: 40px;
    width: 30px;
`;

export const ContainerModal = styled.View`
    flex: 1;
    background-color: ${props => props.theme.backgroundProfile};
`;

export const Input = styled.TextInput`
    flex: 1;
    margin-bottom: 10px;
    padding: 10px;
    background-color: #fff;
    border-bottom-width: 1px;
    border-bottom-color: ${props => props.theme.borderInput};
    height: 40px;
    font-size: 17px;
    margin-left: 10px;
    color: ${props => props.theme.colorInput};
`;

export const Add = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    height: 40px;
    background-color: ${props => props.theme.Button};
    padding-left: 14px;
    padding-right: 14px;
    margin-left: 5px;
    margin-right: 10px;
`;

export const ViewList = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    background-color: #f2f2f2;
    align-items: center;
    margin: 10px;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
`;

export const TextList = styled.Text`
    font-size: 15px;
    color: ${props => props.theme.colorInput};
`;