import styled from 'styled-components';

export const Backgroud = styled.View`
    background-color: ${props => props.theme.backgroundProfile};
    flex: 1;
`;

export const Title = styled.Text`
    margin-left: 5px;
    color: ${props => props.theme.txtColor};
    margin-bottom: 10px;
    font-size: 20px;
`;

export const List = styled.FlatList`
    background-color: ${props => props.theme.View};
    padding-top: 15px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    margin-left: 8px;
    margin-right: 8px;
    margin-top: 20px;
`;
