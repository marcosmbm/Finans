import styled from 'styled-components';

export const Background = styled.View`
    background-color: ${props => props.theme.backgroundProfile};
    flex: 1;
`;

export const TitleGrafico = styled.Text`
    color: ${props => props.theme.txtColor};
    font-size: 20px;
    font-weight: bold;
`;

export const Container = styled.View`
    flex: 1;
    justify-content: center;
`;

export const Title = styled.Text`
    color: ${props => props.theme.txtColor};
`;